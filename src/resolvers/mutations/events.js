module.exports = {
  createEvent(root, { title, content }, context) {
    return context.prisma.createEvent({
      title: title,
      content: content,
      author: {
        connect: { id: context.jwt.uid },
      },
      participants: {
        connect: { id: context.jwt.uid },
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
