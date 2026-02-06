import mongoose from "mongoose";
import {
  chessSchema,
  monopolySchema,
  ludoSchema,
  gameSchema,
} from "../../schemas/sports/index.js";

const Game = mongoose.model("Game", gameSchema);

const Chess = Game.discriminator("Chess", chessSchema);
const MonoPoly = Game.discriminator("MonoPoly", monopolySchema);
const Ludo = Game.discriminator("Ludo", ludoSchema);

export default { Chess, MonoPoly, Ludo };
