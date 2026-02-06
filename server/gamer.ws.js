// server/gamer.ws.js
import { WebSocketServer } from "ws";

export default function createGamerWSS() {
  const wss = new WebSocketServer({ noServer: true });

  // Keep track of clients per game
  const clients = {};

  wss.on("connection", (ws, req, gameId) => {
    console.log(`🎮 New client for game: ${gameId}`);

    // Initialize array for the game
    if (!clients[gameId]) clients[gameId] = new Set();
    clients[gameId].add(ws);

    ws.on("message", (msg) => {
      let data;
      try {
        data = JSON.parse(msg);
      } catch {
        return ws.send(JSON.stringify({ error: "Invalid JSON" }));
      }

      // Broadcast to everyone in the same game
      if (data.type === "GAME_UPDATE") {
        clients[gameId].forEach((client) => {
          if (client !== ws && client.readyState === ws.OPEN) {
            client.send(JSON.stringify({ type: "GAME_UPDATE", payload: data.payload }));
          }
        });
      }
    });

    ws.on("close", () => {
      clients[gameId].delete(ws);
      if (clients[gameId].size === 0) delete clients[gameId];
      console.log(`🛑 Client disconnected from game: ${gameId}`);
    });
  });

  return wss;
}
