module.exports = {
  events (root, args, context) {
    return context.prisma.events()
  },
  users (root, args, context) {
    return context.prisma.users()
  },
  me (root, args, context) {
    return context.prisma.user({ id: context.jwt.uid })
  }
}
