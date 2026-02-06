import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  name: { type: String, required: true },
  players: [{ type: String }], // could be user IDs
  createdAt: { type: Date, default: Date.now },
});

export default gameSchema;
