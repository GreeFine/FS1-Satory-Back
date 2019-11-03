module.exports = {
  events: {
    subscribe: (parent, args, ctx, info) => ctx.db.subscription.event(
      {
        where: {
          mutation_in: ['CREATED', 'UPDATED'],
        },
      },
      info,
    ),
  },
  eventsDeleted: {
    subscribe: (parent, args, ctx) => {
      const selectionSet = '{ previousValues { id title } }';
      return ctx.db.subscription.event(
        {
          where: {
            mutation_in: ['DELETED'],
          },
        },
        selectionSet,
      );
    },
    resolve: (payload) => (payload ? payload.event.previousValues : payload),
  },
  eventComments: {
    subscribe: (parent, { eventId }, ctx, info) => {
      console.log(eventId);
      return ctx.db.subscription.comment(
        {
          where: {
            mutation_in: ['CREATED', 'UPDATED'],
            node: {
              event: {
                id: eventId,
              },
            },
          },
        },
        info,
      );
    },
  },
  myEventsComments: {
    subscribe: (parent, args, ctx, info) => ctx.db.subscription.comment(
      {
        where: {
          mutation_in: ['CREATED', 'UPDATED'],
          node: {
            event: {
              author: {
                id: ctx.jwt.uid,
              },
            },
          },
        },
      },
      info,
    ),
  },
  commentsDeleted: {
    subscribe: (parent, args, ctx) => {
      const selectionSet = '{ previousValues { id title } }';
      return ctx.db.subscription.comment(
        {
          where: {
            mutation_in: ['DELETED'],
          },
        },
        selectionSet,
      );
    },
    resolve: (payload) => (payload ? payload.comment.previousValues : payload), // sanity check

  },
};
