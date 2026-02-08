import crypto from "node:crypto";
import mongoose from "mongoose";

import { main } from "../../../index.js";

const Owner = new mongoose.Schema({
  id: { type: String, required: true },
});

const storeSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => crypto.randomUUID().replace(/-/g, ""),
  },
  name: { type: String, required: true },
  handle: { type: String, unique: true, required: true },
  owner: [Owner], // <-- Fixed here
  createdAt: { type: Date, default: Date.now },
});

storeSchema.pre("save", async function (next) {
  const exists = await main.models.Store.findOne({ handle: this.handle });
  if (exists) {
    throw new Error("Handle already exists!");
  }
  next();
});

export default storeSchema;
