import jwt from "jsonwebtoken";
import {
  accounts,
  sports,
  products,
  institutions,
  stores,
} from "../../db/index.js";

export const context = async ({ req, connectionParams }) => {
  try {
    let token;
    if (req) {
      // HTTP request
      token = req.headers.authorization?.split(" ")[1];
    } else if (connectionParams) {
      // WS subscription
      token = connectionParams.token;
    }

    let identity = null;
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        identity = decoded.id;
      } catch (err) {
        console.warn("Invalid token:", err.message);
      }
    }

    return {
      identity,
      host: req?.hostname || null,
      db: { accounts, sports, institutions, products, stores },
    };
  } catch (err) {
    console.error("🚨 GraphQL CONTEXT ERROR:", err);
    throw err;
  }
};
