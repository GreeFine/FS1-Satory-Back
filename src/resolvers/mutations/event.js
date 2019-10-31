module.exports = {
  createEvent (root, { title, content, date }, context) {
    return context.prisma.createEvent({
      title: title,
      content: content,
      date: date,
      author: {
        connect: { id: context.jwt.uid }
      },
      participants: {
        connect: { id: context.jwt.uid }
      }
    })
  },
  deleteEvent (root, { id }, context) {
    return context.prisma.deleteEvent(id)
  },
  addParticipants (root, { eventId, userId }, context) {
    return context.prisma.updateEvent({
      data: {
        participants: {
          connect: {
            id: userId
          }
        }
      },
      where: {
        id: eventId
      }
    })
  },
  removeParticipants (root, { eventId, userId }, context) {
    return context.prisma.updateEvent({
      data: {
        participants: {
          disconnect: {
            id: userId
          }
        }
      },
      where: {
        id: eventId
      }
    })
  }
}
