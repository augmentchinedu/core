import { accounts } from "../db/index.js";
import { clients } from "../data/index.js";

export function filterUserByHost(host, user) {
  return user;
}

export async function seedClients() {
  const { Client } = accounts.models;

  for (const client of clients) {
    await Client.findOneAndUpdate(
      { username: client.username },
      { $set: client },
      {
        upsert: true,
        new: true,
        runValidators: true,
      },
    );
  }

  console.log("✅ Clients synced");
}
