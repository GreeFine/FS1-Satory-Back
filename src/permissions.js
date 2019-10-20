const { rule, shield, and, or, not } = require('graphql-shield');
const { tokenCheck } = require('./jwt');
const cookie = require('cookie');

function getJWT(req, prisma) {
  let authorization = undefined;
  if (req.connection)
    authorization = cookie.parse(req.connection.context.cookie).Authorization;
  else if (req.request.cookies)
    authorization = req.request.cookies.Authorization;
  return tokenCheck(req, authorization, prisma);
}

// Rules

const isNotAuthenticated = rule({ cache: 'contextual' })(
  async (parent, args, ctx, info) => {
    if (ctx.jwt !== null) {
      return new Error('Already connected.');
    }
    return true;
  }
);

const isAuthenticated = rule({ cache: 'contextual' })(
  async (parent, args, ctx, info) => {
    return ctx.jwt.role === null ? new Error('Not connected.') : true;
  }
);

const isAdmin = rule({ cache: 'contextual' })(
  async (parent, args, ctx, info) => {
    return ctx.jwt.role === 'ADMIN';
  }
);

const canReadEvents = rule({ cache: 'contextual' })(
  async (parent, args, ctx, info) => {
    return ctx.jwt.role !== 'GUEST';
  }
);

// Permissions

const permissions = shield({
  Query: {
    events: and(isAuthenticated, canReadEvents),
    users: isAdmin,
    me: isAuthenticated,
  },
  Mutation: {
    login: isNotAuthenticated,
    register: isNotAuthenticated,
    createEvent: isAdmin,
    updateRole: isAdmin,
  },
  Subscription: {
    event: and(isAuthenticated, canReadEvents),
  },
});

module.exports = {
  permissions,
  getJWT,
};
