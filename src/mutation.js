module.exports = {
  createDraft(root, args, context) {
    return context.prisma.createPost({
      title: args.title,
      author: {
        connect: { id: args.userId },
      },
    });
  },
  publish(root, args, context) {
    return context.prisma.updatePost({
      where: { id: args.postId },
      data: { published: true },
    });
  },
  createUser(root, args, context) {
    return context.prisma.createUser({ name: args.name });
  },
  // login(root, args, context) {
  //   context.prisma.user({
  //     name: args.name,
  //   });
  //   return context.prisma.createUser({ name: args.name });
  // },
};