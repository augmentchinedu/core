export const gameResolver = {
  Query: {
    async game(_, { name }, { db }) {
      return db.sports.models.Game.findOne({ name });
    },
  },
  Game: {
    __resolveType(obj) {
      if (obj.board) return "Chess";
      if (obj.positions) return "Ludo";
      if (obj.boardState) return "Monopoly";
      return null;
    },
  },
};
