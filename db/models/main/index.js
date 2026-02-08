import mongoose from "mongoose";
import {
  drinkSchema,
  fashionSchema,
  furnitureSchema,
  gadgetSchema,
  hairSchema,
  jewelrySchema,
  skincareSchema,
  storeSchema,
} from "../../schemas/main/index.js";

// Stores
const Store = mongoose.model("Store", storeSchema);

const Drink = Store.discriminator("Drink", drinkSchema);
const Fashion = Store.discriminator("Fashion", fashionSchema);
const Furniture = Store.discriminator("Furniture", furnitureSchema);
const Gadget = Store.discriminator("Gadget", gadgetSchema);
const Hair = Store.discriminator("Hair", hairSchema);
const Jewelry = Store.discriminator("Jewelry", jewelrySchema);
const Skincare = Store.discriminator("Skincare", skincareSchema);

export default {
  Drink,
  Fashion,
  Furniture,
  Gadget,
  Hair,
  Jewelry,
  Skincare,
};
