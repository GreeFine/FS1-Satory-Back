module.exports = {
  me(root, args, context) {
    return context.prisma.user({ id: context.jwt.uid });
  },
  events(root, args, context) {
    return context.prisma.events();
  },
  myEvents(root, args, context) {
    return context.prisma.events({ where: { author: { id: context.jwt.uid } } });
  },
  users(root, args, context) {
    return context.prisma.users();
  },
};
