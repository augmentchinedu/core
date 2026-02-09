// /graphql/resolvers/client.resolver.js

const { VITE_DEVELOPMENT_KEY } = process.env;

export const clientResolver = {
  Query: {
    client: async (_, { username, key }, { host, db }) => {
      let client;

      if (username && key === VITE_DEVELOPMENT_KEY) {
        console.log("DEV MODE Client", username);
        client = await db.main.models.Client.findOne({ username });
      } else {
        console.log("PROD MODE Host", host);
        client = await db.main.models.Client.findOne({ hosts: host });
      }

      if (!client) {
        throw new Error("Client not found");
      }

      console.log("Client found:", client.username, client.package);

      // ✅ Ensure content exists
      if (!client.content) client.content = {};

      switch (client.package) {
        case "stores": {
          client.content.stores = {};

          const Store = db.main.models.Store;
          const discriminators = Store.discriminators || {};

          console.log(discriminators);
          // If you have discriminators
          for (const [modelName, Model] of Object.entries(discriminators)) {
            client.content.stores[modelName.toLowerCase()] = await Model.find(
              {},
            )
              .limit(40)
              .lean();
          }

          break;
        }
      }

      return {
        id: client._id,
        name: client.name,
        username: client.username,
        type: client.type,
        package: client.package,
        content: client.content,
      };
    },
  },
};
