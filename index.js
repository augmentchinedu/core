// index.js
import http from "http";
import path from "path";
import express from "express";
import { fileURLToPath } from "url";

import middlewares from "./graphql/middlewares/index.js";
import { home } from "./controller/index.js";

// WS servers
import createGamerWSS from "./server/gamer.ws.js";

import jwt from "jsonwebtoken";

// GraphQL
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs } from "./graphql/schema/index.js";
import { resolvers } from "./graphql/resolver/index.js";
import { context } from "./graphql/context/index.js"; // ✅ your existing context

import { connectDatabases } from "./db/index.js";
import { seedClients } from "./utility/index.js";

// -----------------------------
// Express setup
// -----------------------------
const app = express();
app.set("trust proxy", true);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(middlewares);

// -----------------------------
// Apollo GraphQL Server with error logging
// -----------------------------
const apollo = new ApolloServer({
  typeDefs,
  resolvers,
});
await apollo.start();

// Pass context correctly
app.use("/graphql", express.json(), expressMiddleware(apollo, { context }));

// -----------------------------
// Express error logging middleware (catch-all)
// -----------------------------
app.use((err, req, res, next) => {
  console.error("💥 Express ERROR:", err.stack || err);
  res.status(500).json({ message: "Internal Server Error" });
});

// -----------------------------
// Default route
// -----------------------------
app.use((req, res, next) => home(req, res, next));

// -----------------------------
// Start HTTP + WS Servers
// -----------------------------
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

const gamerWss = createGamerWSS();

server.on("upgrade", (req, socket, head) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const token = url.searchParams.get("token");
  let user;

  if (token) {
    try {
      user = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      req.user = user;
    } catch {
      console.warn("⚠️ Invalid WS token provided");
    }
  }

  // 🎮 Unified gamer WS
  if (url.pathname === "/gamer") {
    gamerWss.handleUpgrade(req, socket, head, (ws) => {
      // Expect gameId in query params
      const game = url.searchParams.get("type");
      if (!game) return socket.destroy();

      gamerWss.emit("connection", ws, req, game);
    });
  } else {
    socket.destroy();
  }
});

await connectDatabases();
await seedClients();

server.listen(PORT, () => {
  console.log("✅ Unknown Server Running on port", PORT);
});
