module.exports = {
  createEvent(root, { title, content, date }, context) {
    return context.prisma.createEvent({
      title: title,
      content: content,
      date: date,
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
  async addParticipants(root, { event_id, user_id }, context) {
    return await context.prisma.updateEvent({
      data: {
        participants: {
          connect: {
            id: user_id,
          },
        },
      },
      where: {
        id: event_id,
      },
    });
  },
};
