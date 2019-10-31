module.exports = {
  event: {
    subscribe: (parent, args, ctx, info) => {
      return ctx.db.subscription.event(
        {
          where: {
            mutation_in: ['CREATED', 'UPDATED']
          }
        },
        info
      )
    }
  },
  eventDeleted: {
    subscribe: (parent, args, ctx, info) => {
      const selectionSet = '{ previousValues { id title } }'
      return ctx.db.subscription.event(
        {
          where: {
            mutation_in: ['DELETED']
          }
        },
        selectionSet
      )
    },
    resolve: (payload, args, ctx, info) => {
      return payload ? payload.event.previousValues : payload
    }
  },
  comment: {
    subscribe: (parent, args, ctx, info) => {
      return ctx.db.subscription.comment(
        {
          where: {
            mutation_in: ['CREATED', 'UPDATED'],
            node: {
              event: {
                author: {
                  id: ctx.jwt.uid
                }
              }
            }
          }
        },
        info
      )
    }
  },
  commentDeleted: {
    subscribe: (parent, args, ctx, info) => {
      const selectionSet = '{ previousValues { id title } }'
      return ctx.db.subscription.comment(
        {
          where: {
            mutation_in: ['DELETED']
          }
        },
        selectionSet
      )
    },
    resolve: (payload, args, ctx, info) => {
      return payload ? payload.comment.previousValues : payload // sanity check
    }
  }
}
