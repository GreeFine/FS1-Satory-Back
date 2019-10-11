module.exports = {
  createEvent(root, { title, userId, content }, context) {
    return context.prisma.createEvent({
      title: title,
      content: content,
      author: {
        connect: { id: userId },
      },
      participants: {
        connect: { id: userId },
      },
    });
  },
  deleteEvent(root, { id }, context) {
    return context.prisma.deleteEvent(id);
  },
  // publish(root, args, context) {
  //   return context.prisma.updatePost({
  //     where: { id: args.postId },
  //     data: { published: true },
  //   });
  // },
};
