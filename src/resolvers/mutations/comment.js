module.exports = {
  createComment(root, { event_id, content }, context) {
    return context.prisma.createComment({
      content: content,
      author: {
        connect: { id: context.jwt.uid },
      },
      event: {
        connect: { id: event_id },
      },
    });
  },
  deleteComment(root, { id }, context) {
    return context.prisma.deleteComment(id);
  },
};
