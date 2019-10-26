const { rule, shield, and, or, not } = require('graphql-shield');
const { tokenCheck } = require('./jwt');
const cookie = require('cookie');

async function getJWT(req, prisma) {
  let authorization = undefined;
  let isSocket = false;
  if (req.connection && req.connection.context.cookie) {
    authorization = cookie.parse(req.connection.context.cookie).Authorization;
    isSocket = true;
  } else if (req.request.cookies)
    authorization = req.request.cookies.Authorization;

  return await tokenCheck(req, prisma, authorization, isSocket);
}

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

// Permissions

const permissions = shield({
  Query: {
    events: and(isAuthenticated, canReadEvents),
    users: and(isAuthenticated, isAdmin),
    me: isAuthenticated,
  },
  Mutation: {
    login: isNotAuthenticated,
    logout: isAuthenticated,
    register: isNotAuthenticated,
    createEvent: and(isAuthenticated, isAdmin),
    updateRole: and(isAuthenticated, isAdmin),
    addParticipants: and(isAuthenticated, isAdmin),
  },
  Subscription: {
    event: and(isAuthenticated, canReadEvents),
  },
});

module.exports = {
  permissions,
  getJWT,
};
