// db/index.js
import { DB } from "../class/index.js";
import {
  sports,
  main,
  institutions,
  products,
} from "./models/index.js";

const { MONGODB_USERNAME, MONGODB_PASSWORD, MONGODB_HOST } = process.env;

if (!MONGODB_USERNAME || !MONGODB_PASSWORD || !MONGODB_HOST) {
  throw new Error("MongoDB credentials missing in environment variables");
}

let mainDB;
let sportsDB;
let institutionsDB;
let productsDB;

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
  mainDB = await createDB("main", main);
  sportsDB = await createDB("sports", sports);
  institutionsDB = await createDB("institutions", institutions);
  productsDB = await createDB("products", products);

  /**
   * Create an Entity (database) and attach models
   */

  console.info("✔ Databases Instantiated");
  console.info("Main models:", Object.keys(mainDB.models));
  console.info("Sport models:", Object.keys(sportsDB.models));
  console.info("Institutions models:", Object.keys(institutionsDB.models));
  console.info("Products models:", Object.keys(productsDB.models));
}

// Export directly as named exports
export {
  sportsDB as sports,
  institutionsDB as institutions,
  productsDB as products,
  mainDB as main,
};
