const { rule, shield, and, or, not } = require('graphql-shield');
const { tokenCheck } = require('./jwt');
// Auth

function getRole(req, prisma) {
  if (req.request.cookies) {
    const authorization = req.request.cookies.Authorization;
    return tokenCheck(req, authorization, prisma);
  }
  return null;
}

// Rules

const isNotAuthenticated = rule()(async (parent, args, ctx, info) => {
  if (ctx.role !== null) {
    return new Error('Already connected.');
  }
  return true;
});

const isAuthenticated = rule()(async (parent, args, ctx, info) => {
  return ctx.role === null ? new Error('Not connected.') : true;
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
