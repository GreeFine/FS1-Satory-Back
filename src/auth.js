const jwt = require('jsonwebtoken');
const { rule, shield, and, or, not } = require('graphql-shield');

// Auth

function getRole(req) {
  let token;
  try {
    token = jwt.verify(
      req.request.get('Authorization'),
      process.env['JWT_SECRET']
    );
  } catch (e) {
    return null;
  }
  return token.role;
}

// Rules

const isNotAuthenticated = rule()(async (parent, args, ctx, info) => {
  if (ctx.role !== null) {
    return new Error('Already connected.');
  }
  return true;
});

const isAuthenticated = rule()(async (parent, args, ctx, info) => {
  return ctx.role !== null;
});

const isAdmin = rule()(async (parent, args, ctx, info) => {
  return ctx.role === 'ADMIN';
});

const canReadposts = rule()(async (parent, args, ctx, info) => {
  return ctx.role !== 'GUEST';
});

// Permissions

const permissions = shield({
  Query: {
    publishedPosts: and(isAuthenticated, canReadposts),
  },
  Mutation: {
    login: isNotAuthenticated,
    register: isNotAuthenticated,
    createDraft: isAuthenticated,
    publish: isAdmin,
    updateRole: isAdmin,
  },
});

module.exports = {
  permissions,
  getRole,
};
