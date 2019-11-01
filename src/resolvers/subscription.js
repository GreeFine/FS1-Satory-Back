module.exports = {
  events: {
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
  eventsDeleted: {
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
  eventComments: {
    subscribe: (parent, { eventId }, ctx, info) => {
      console.log(eventId)
      return ctx.db.subscription.comment(
        {
          where: {
            mutation_in: ['CREATED', 'UPDATED'],
            node: {
              event: {
                id: eventId
              }
            }
          }
        },
        info
      )
    }
  },
  myEventsComments: {
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
  commentsDeleted: {
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
