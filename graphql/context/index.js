import jwt from "jsonwebtoken";
import {
  main,
  accounts,
  sports,
  products,
  institutions,
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

    let id = null;
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        id = decoded.id;
      } catch (err) {
        console.warn("Invalid token:", err.message);
      }
    }

    return {
      id,
      host: req?.hostname || null,
      db: { main, accounts, sports, institutions, products },
    };
  } catch (err) {
    console.error("🚨 GraphQL CONTEXT ERROR:", err);
    throw err;
  }
};
