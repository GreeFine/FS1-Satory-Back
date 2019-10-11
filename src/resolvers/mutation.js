const Auth = require('./mutations/auth');
const Events = require('./mutations/events');

module.exports = {
  ...Auth,
  ...Events,
};
