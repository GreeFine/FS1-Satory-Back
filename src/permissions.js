const { rule, shield, and, or, not } = require('graphql-shield');
const { tokenCheck } = require('./jwt');
// Auth

function getJWT(req, prisma) {
  if (req.request.cookies) {
    const authorization = req.request.cookies.Authorization;
    return tokenCheck(req, authorization, prisma);
  }
  return null;
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
});

module.exports = {
  permissions,
  getJWT,
};
