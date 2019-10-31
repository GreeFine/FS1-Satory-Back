module.exports = {
  createComment (root, { eventId, content }, context) {
    return context.prisma.createComment({
      content: content,
      author: {
        connect: { id: context.jwt.uid }
      },
      event: {
        connect: { id: eventId }
      }
    })
  },
  deleteComment (root, { id }, context) {
    return context.prisma.deleteComment(id)
  }
}
