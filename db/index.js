// db/index.js
import { DB } from "../class/index.js";
import {
  accounts,
  sports,
  institutions,
  products,
  stores,
} from "./models/index.js";

const { MONGODB_USERNAME, MONGODB_PASSWORD, MONGODB_HOST } = process.env;

if (!MONGODB_USERNAME || !MONGODB_PASSWORD || !MONGODB_HOST) {
  throw new Error("MongoDB credentials missing in environment variables");
}

let accountsDB;
let sportsDB;
let institutionsDB;
let productsDB;
let storesDB;

export async function connectDatabases() {
  const createDB = async (dbName, models) => {
    const uri = `mongodb+srv://${encodeURIComponent(
      MONGODB_USERNAME
    )}:${encodeURIComponent(MONGODB_PASSWORD)}@${MONGODB_HOST}`;

    const entity = new DB({ name: dbName });
    await entity.connect(uri);

    for (const model of Object.values(models)) {
      entity.useModel(model); // ✅ compiled model cloning
    }

    return entity;
  };

  // Instantiate databases
  accountsDB = await createDB("accounts", accounts);
  sportsDB = await createDB("sports", sports);
  institutionsDB = await createDB("institutions", institutions);
  productsDB = await createDB("products", products);
  storesDB = await createDB("stores", stores);

  /**
   * Create an Entity (database) and attach models
   */

  console.info("✔ Databases Instantiated");
  console.info("Accounts models:", Object.keys(accountsDB.models));
  console.info("Sport models:", Object.keys(sportsDB.models));
  console.info("Institutions models:", Object.keys(institutionsDB.models));
  console.info("Products models:", Object.keys(productsDB.models));
  console.info("Stores models:", Object.keys(storesDB.models));
}

// Export directly as named exports
export {
  accountsDB as accounts,
  sportsDB as sports,
  institutionsDB as institutions,
  productsDB as products,
  storesDB as stores,
};
