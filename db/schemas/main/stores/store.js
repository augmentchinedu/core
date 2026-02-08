import mongoose from "mongoose";

const Owner = new mongoose.Schema({
  id: { type: String, required: true },
});

const storeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  handle: [{ type: String }],
  owner: [{ type: Owner }],
  createdAt: { type: Date, default: Date.now },
});

export default storeSchema;
