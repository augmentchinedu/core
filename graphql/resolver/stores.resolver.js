// /graphql/resolvers/stores.resolver.js

export const storesResolver = {
  Query: {
    stores: async (_, __, { db }) => {
      return {
        fashion: [],
        furniture: [],
        gadget: [],
      };
    },
  },
  Mutation: {
    createStore: async (_, { input }, { db, id }) => {
      const modelName = input.type.toLowerCase();

      const model = Object.entries(db.main.models.Store.discriminators).find(
        ([name]) => name.toLowerCase() === modelName,
      )?.[1];

      if (!model) throw new Error(`Model "${input.type}" not found`);

      const store = await model.create({
        name: input.name,
        handle: input.handle,
        bio: input.bio,
        owner: [{ id }],
      });

      store.type = input.type; // add type for frontend

      return store;
    },
  },
};
