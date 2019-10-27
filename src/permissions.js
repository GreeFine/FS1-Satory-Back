const { rule, shield, and, or, not } = require('graphql-shield');
const { getJWT } = require('./jwt');

// Rules

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
    return ctx.jwt.role !== 'GUEST';
  }
);

const canComment = rule({ cache: 'contextual' })(
  async (parent, args, ctx, info) => {
    return ctx.jwt.role !== 'GUEST';
  }
);

// Permissions

const permissions = shield({
  Query: {
    me: isAuthenticated,
    events: and(isAuthenticated, canReadEvents),
    users: and(isAuthenticated, isAdmin),
  },
  Mutation: {
    register: isNotAuthenticated,
    login: isNotAuthenticated,
    logout: isAuthenticated,
    updateUser: isAuthenticated,
    createEvent: and(isAuthenticated, isAdmin),
    deleteEvent: and(isAuthenticated, isAdmin),
    addParticipants: and(isAuthenticated, isAdmin),
    createComment: and(isAuthenticated, canComment),
    deleteComment: and(isAuthenticated, canComment),
  },
  Subscription: {
    event: and(isAuthenticated, canReadEvents),
  },
});

module.exports = {
  permissions,
  getJWT,
};
