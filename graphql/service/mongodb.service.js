import GamePlay from "../models/GamePlay.js";
import { pubsub, GAME_PLAY_ADDED } from "../graphql/pubsub.js";

export function watchGamePlays() {
  GamePlay.watch().on("change", (change) => {
    if (change.operationType !== "insert") return;

    const doc = change.fullDocument;

    pubsub.publish(`${GAME_PLAY_ADDED}:${doc.gameId}`, {
      gamePlayAdded: doc,
    });
  });
}
