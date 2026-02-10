// controller/home.js
import path from "path";
import mime from "mime-types";

import * as fn from "../functions/index.js";
import { getDomains } from "../data/index.js";

function getClientByDomain(domain) {
  const domains = getDomains();
  for (const [type, names] of Object.entries(domains)) {
    if (names.includes(domain)) {
      if (type === "stores") return "store";
      if (type === "clients") return domain.split(".")[0];
    }
  }
  return null;
}

const home = async (req, res, next) => {
  async function sendFile(client, filePath) {
    try {
      const file = await fn.getFile(client.package, filePath);
      const contentType = mime.lookup(file.name) || "application/octet-stream";
      const [buffer] = await file.download();

      // 🔥 Send package info via headers
      if (client?.package) {
        res.setHeader("X-App-Package", client.package);
        res.setHeader("X-App-Client", client.username);
      }

      if (contentType === "text/html" || /\.html$/i.test(filePath)) {
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        res.setHeader("Pragma", "no-cache");
        res.setHeader("Expires", "0");
      } else {
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      }

      return res.type(contentType).send(buffer);
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  try {
    const host = req.headers.host.split(":")[0];

    const client = getClientByDomain(host);
    console.log(
      "Requested domain:",
      host,
      "-> Client:",
      client?.username || "None",
    );

    if (!client) {
      return res.status(404).send("Unknown domain");
    }

    const reqPath = req.path || "/";
    const hasExt = path.extname(reqPath) !== "";

    if (hasExt) {
      const sent = await sendFile(client, reqPath);
      if (sent) return;
    }

    await sendFile(client, "/index.html");
  } catch (err) {
    console.error("home error:", err);
    if (!res.headersSent) {
      res.status(500).send("Server error");
    } else {
      next(err);
    }
  }
};

export { home };
