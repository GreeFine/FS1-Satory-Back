module.exports = {
  event: {
    subscribe: (parent, args, ctx, info) => {
      return ctx.db.subscription.event(
        {
          where: {
            mutation_in: ['CREATED', 'UPDATED'],
          },
        },
        info
      );
    },
  },
  eventDeleted: {
    subscribe: (parent, args, ctx, info) => {
      const selectionSet = `{ previousValues { id title } }`;
      return ctx.db.subscription.event(
        {
          where: {
            mutation_in: ['DELETED'],
          },
        },
        selectionSet
      );
    },
    resolve: (payload, args, context, info) => {
      return payload ? payload.event.previousValues : payload; // sanity check
    },
  },
};
