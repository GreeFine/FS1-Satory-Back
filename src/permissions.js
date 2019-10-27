const { rule, shield, or, not, chain } = require('graphql-shield');
const { getJWT } = require('./jwt');

const isNotAuthenticated = rule({ cache: 'contextual' })(
  async (parent, args, ctx, info) => {
    return ctx.jwt !== null ? new Error('Already connected.') : true;
  }
);

const isAuthenticated = rule({ cache: 'contextual' })(
  async (parent, args, ctx, info) => {
    return ctx.jwt === null ? new Error('Not connected.') : true;
  }
);

const isAdmin = rule({ cache: 'contextual' })(
  async (parent, args, ctx, info) => {
    return ctx.jwt.role !== 'ADMIN'
      ? new Error('Only an admin can do that.')
      : true;
  }
);

const canReadEvents = rule({ cache: 'contextual' })(
  async (parent, args, ctx, info) => {
    console.log('????why');
    return ctx.jwt.role !== 'GUEST';
  }
);

const canComment = rule({ cache: 'contextual' })(
  async (parent, args, ctx, info) => {
    return ctx.jwt.role !== 'GUEST';
  }
);

// Permissions

const permissions = shield(
  {
    Query: {
      me: isAuthenticated,
      events: chain(isAuthenticated, canReadEvents),
      users: chain(isAuthenticated, isAdmin),
    },
    Mutation: {
      register: isNotAuthenticated,
      login: isNotAuthenticated,
      logout: isAuthenticated,
      updateUser: isAuthenticated,
      createEvent: chain(isAuthenticated, isAdmin),
      deleteEvent: chain(isAuthenticated, isAdmin),
      addParticipants: chain(isAuthenticated, isAdmin),
      createComment: chain(isAuthenticated, canComment),
      deleteComment: chain(isAuthenticated, canComment),
    },
    Subscription: {
      event: chain(isAuthenticated, canReadEvents),
      eventDeleted: chain(isAuthenticated, canReadEvents),
      comment: chain(isAuthenticated, canReadEvents),
      commentDeleted: chain(isAuthenticated, canReadEvents),
    },
  },
  { allowExternalErrors: true, debug: true }
);

module.exports = {
  permissions,
  getJWT,
};
