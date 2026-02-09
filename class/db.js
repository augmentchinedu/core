// class/entity.js
import mongoose from "mongoose";

class DB {
  constructor({ name }) {
    if (!name) throw new Error("Entity name is required");

    this.name = name;
    this.db = null;
    this.models = Object.create(null);
    this.connected = false;
  }

  /**
   * Connect this entity to MongoDB
   */
  async connect(uri) {
    if (this.connected) return this.db;
    if (!uri) throw new Error("MongoDB URI is required");

    this.db = mongoose.createConnection(uri, {
      dbName: this.name,
    });

    await this.db.asPromise();

    this.connected = true;
    console.info(`✔ DB "${this.name}" connected`);

    return this.db;
  }

  /**
   * Register a model on this entity
   */
  useModel(modelDef) {
    if (!this.db) throw new Error("DB not connected");

    const { name, schema, collection, discriminators } = modelDef;

    // Base model
    let Model = this.db.models[name];
    if (!Model) {
      Model = this.db.model(name, schema, collection);
    }

    // ✅ Register discriminators ON THIS CONNECTION
    if (discriminators) {
      for (const [discName, discSchema] of Object.entries(discriminators)) {
        if (!Model.discriminators?.[discName]) {
          Model.discriminator(discName, discSchema);
        }
      }
    }

    this.models[name] = Model;
    return Model;
  }

  async close() {
    if (this.db) {
      await this.db.close();
      this.connected = false;
    }
  }

  toJSON() {
    return {
      name: this.name,
      connected: this.connected,
      models: Object.keys(this.models),
    };
  }
}

export default DB;
