const { rule, shield, chain, allow } = require('graphql-shield')
const { getJWT } = require('./jwt')

function ErrorWithCode (message, code) {
  const error = new Error(message)
  error.code = code
  return error
}

const isAuthenticated = rule({ cache: 'contextual' })(
  async (parent, args, ctx, info) => {
    return ctx.jwt === null ? ErrorWithCode('Not connected', 401) : true
  }
)

const isNotAuthenticated = rule({ cache: 'contextual' })(
  async (parent, args, ctx, info) => {
    return ctx.jwt !== null ? new Error('Already connected.') : true
  }
)

const isAdmin = rule({ cache: 'contextual' })(
  async (parent, args, ctx, info) => {
    return ctx.jwt.role !== 'ADMIN'
      ? new Error('Only an admin can do that.')
      : true
  }
)

const canReadEvents = rule({ cache: 'contextual' })(
  async (parent, args, ctx, info) => {
    return ctx.jwt.role === 'GUEST'
      ? new Error(`${ctx.jwt.role} do not have access to events`)
      : true
  }
)

const canComment = rule({ cache: 'contextual' })(
  async (parent, args, ctx, info) => {
    return ctx.jwt.role === 'GUEST'
      ? new Error(`${ctx.jwt.role} do not have access to comments`)
      : true
  }
)

const fallbackRule = rule({ cache: 'contextual' })(
  async (parent, args, ctx, info) => {
    if (info.operation.operation === 'subscription') return true
    return new Error("Ooops: this route isn't shielded, we are not gonna let you in. Report this to your maintainer")
  }
)

// Permissions

const permissions = shield(
  {
    Query: {
      me: isAuthenticated,
      events: chain(isAuthenticated, canReadEvents),
      myEvents: chain(isAuthenticated, canReadEvents),
      users: chain(isAuthenticated, isAdmin)
    },
    Mutation: {
      register: isNotAuthenticated,
      login: isNotAuthenticated,
      logout: isAuthenticated,
      updateUser: isAuthenticated,
      createEvent: chain(isAuthenticated, isAdmin),
      updateEvent: chain(isAuthenticated, canReadEvents),
      deleteEvent: chain(isAuthenticated, isAdmin),
      addParticipant: chain(isAuthenticated, isAdmin),
      removeParticipant: chain(isAuthenticated, isAdmin),
      createComment: chain(isAuthenticated, canComment),
      deleteComment: chain(isAuthenticated, canComment)
    },
    Subscription: {
      events: allow,
      eventsDeleted: chain(isAuthenticated, canReadEvents),
      myEventsComments: chain(isAuthenticated, canReadEvents),
      eventComments: chain(isAuthenticated, canReadEvents),
      commentsDeleted: chain(isAuthenticated, canReadEvents)
    },
    User: allow,
    Event: allow,
    Comment: allow
  },
  { allowExternalErrors: true, debug: process.env.NODE_ENV !== 'production', fallbackRule: fallbackRule }
)

module.exports = {
  permissions,
  getJWT
}
