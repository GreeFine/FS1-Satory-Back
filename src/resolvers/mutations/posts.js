module.exports = {
  createDraft(root, { title, userId }, context) {
    return context.prisma.createPost({
      title: title,
      author: {
        connect: { id: userId },
      },
    });
  },
  publish(root, args, context) {
    return context.prisma.updatePost({
      where: { id: args.postId },
      data: { published: true },
    });
  },
  updateRole(root, args, context) {
    return context.prisma.updateUser({
      where: { username: args.username },
      data: { role: args.role },
    });
  },
};
