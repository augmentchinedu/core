// models/main/index.js
import { userSchema, clientSchema } from "../../schemas/accounts/index.js";
import {
  storeSchema,
  drinkSchema,
  fashionSchema,
  furnitureSchema,
  gadgetSchema,
  hairSchema,
  jewelrySchema,
  skincareSchema,
} from "../../schemas/main/index.js";

const User = {
  name: "User",
  schema: userSchema,
  collection: "users",
};

const Client = {
  name: "Client",
  schema: clientSchema,
  collection: "clients",
};

const Store = {
  name: "Store",
  schema: storeSchema,
  collection: "stores",
  discriminators: {
    Drink: drinkSchema,
    Fashion: fashionSchema,
    Furniture: furnitureSchema,
    Gadget: gadgetSchema,
    Hair: hairSchema,
    Jewelry: jewelrySchema,
    Skincare: skincareSchema,
  },
};

export default { User, Client, Store };
