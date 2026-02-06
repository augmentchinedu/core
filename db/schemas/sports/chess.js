import mongoose from "mongoose";

const chessSchema = new mongoose.Schema({
  board: { type: [[String]], default: Array(8).fill(Array(8).fill(null)) },
});

export default chessSchema;
