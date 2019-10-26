module.exports = {
  User: {
    myevents(root, args, context) {
      return context.prisma
        .user({
          id: root.id,
        })
        .myevents();
    },
    events(root, args, context) {
      return context.prisma
        .user({
          id: root.id,
        })
        .events();
    },
  },
  Event: {
    author(root, args, context) {
      return context.prisma
        .event({
          id: root.id,
        })
        .author();
    },
    participants(root, args, context) {
      return context.prisma
        .event({
          id: root.id,
        })
        .participants();
    },
  },
};
