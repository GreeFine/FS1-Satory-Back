const Auth = require('./mutations/auth')
const Event = require('./mutations/event')
const Comment = require('./mutations/comment')

module.exports = {
  ...Auth,
  ...Event,
  ...Comment
}
