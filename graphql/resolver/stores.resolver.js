// /graphql/resolvers/stores.resolver.js

export const storesResolver = {
  Query: {},
  Mutation: {
    createStore: async (_, { token, input, data }, { db }) => {
      console.log(input);
      const modelName = input.type.toLowerCase();

      // Find model where the lowercase key matches
      const model = Object.entries(db.main.models).find(
        ([name, _]) => name.toLowerCase() === modelName,
      )?.[1];

      if (!model) throw new Error(`Model "${input.type}" not found`);

      const store = await model.create({ name: input.name });

      return {
        id: store._id,
        name: store.name,
      };
    },
  },
};
