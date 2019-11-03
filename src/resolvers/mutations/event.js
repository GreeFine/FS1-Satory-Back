module.exports = {
  createEvent(root, { title, content, date }, context) {
    return context.prisma.createEvent({
      title,
      content,
      date,
      author: {
        connect: { id: context.jwt.uid },
      },
      participants: {
        connect: { id: context.jwt.uid },
      },
    });
  },
  updateEvent: async (root, args, context) => {
    const { id } = args;
    const eventArgs = args;
    delete eventArgs.id;
    if (context.jwt.role === 'ADMIN') {
      return context.prisma.updateEvent({
        where: { id },
        data: eventArgs,
      });
    }
    const eventAuthor = await context.prisma.event({ id }).author();
    if (eventAuthor.id !== context.jwt.uid) return Error(`You are not the author of event:${id}`);
    return context.prisma.updateEvent({
      where: { id },
      data: eventArgs,
    });
  },
  deleteEvent(root, { id }, context) {
    return context.prisma.deleteEvent({ id });
  },
  addParticipant(root, { eventId, userId }, context) {
    return context.prisma.updateEvent({
      data: {
        participants: {
          connect: {
            id: userId,
          },
        },
      },
      where: {
        id: eventId,
      },
    });
  },
  removeParticipant(root, { eventId, userId }, context) {
    return context.prisma.updateEvent({
      data: {
        participants: {
          disconnect: {
            id: userId,
          },
        },
      },
      where: {
        id: eventId,
      },
    });
  },
};
