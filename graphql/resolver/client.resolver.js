// /graphql/resolvers/account.resolver.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v7 as uuidv7 } from "uuid";

import { filterUserByHost } from "../../utility/index.js";

const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET, VITE_DEVELOPMENT_KEY } =
  process.env;

async function generateTokens(userId) {
  const accessToken = jwt.sign({ id: userId }, JWT_ACCESS_SECRET, {
    expiresIn: "30d",
  });
  const refreshToken = jwt.sign({ id: userId }, JWT_REFRESH_SECRET, {
    expiresIn: "30d",
  });
  return { accessToken, refreshToken };
}

function generateUsername() {
  return `user_${uuidv7().slice(0, 8)}`;
}

function parseFullname(fullname = "") {
  if (!fullname || typeof fullname !== "string") {
    return { first: "", middle: "", last: "" };
  }

  const parts = fullname.trim().replace(/\s+/g, " ").split(" ");

  return {
    first: parts[0] || "",
    middle: parts.length > 2 ? parts.slice(1, -1).join(" ") : "",
    last: parts.length > 1 ? parts[parts.length - 1] : "",
  };
}

export const clientResolver = {
  Query: {
    client: async (_, { username, key }, { host, db }) => {
      let client;

      if (username && key === VITE_DEVELOPMENT_KEY) {
        console.log("DEV MODE Client", username);
        client = await db.main.models.Client.findOne({ username });
      } else {
        console.log("PROD MODE Host", host);
        client = await db.main.models.Client.findOne({ hosts: host });
      }

      if (!client) {
        throw new Error("Client not found");
      }

      console.log("Client found:", client.username, client.package);

      // ✅ Ensure content exists
      if (!client.content) client.content = {};

      switch (client.package) {
        case "stores": {
          client.content.stores = {};

          const Store = db.main.models.Store;
          const discriminators = Store.discriminators || {};

          console.log(discriminators);
          // If you have discriminators
          for (const [modelName, Model] of Object.entries(discriminators)) {
            client.content.stores[modelName.toLowerCase()] = await Model.find(
              {},
            )
              .limit(40)
              .lean();
          }

          break;
        }
      }

      return {
        id: client._id,
        name: client.name,
        username: client.username,
        type: client.type,
        package: client.package,
        content: client.content,
      };
    },
  },
};
