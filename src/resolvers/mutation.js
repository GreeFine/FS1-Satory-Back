const Auth = require('./mutations/auth');
const Posts = require('./mutations/posts');

module.exports = {
  ...Auth,
  ...Posts,
};
