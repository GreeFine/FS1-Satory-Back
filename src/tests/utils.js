const JWT = require('jsonwebtoken')
const { serverStart } = require('../index')
const { GraphQLClient } = require('graphql-request')

const registerMutation = `
  mutation register($username: String!, $password: String!) {
    register(username: $username, password: $password) {
      uid: id
      refresh_token
      username
      role
    }
  }
`

function randString () {
  return Math.random()
    .toString(36)
    .substr(2)
}

module.exports = (async () => {
  const server = await serverStart()
  const gqlClient = new GraphQLClient(
    `http://127.0.0.1:${server.address().port}`,
    {
      credentials: 'include',
      mode: 'cors'
    }
  )
  const response = await gqlClient.request(registerMutation, {
    username: randString(),
    password: randString()
  })
  const token = response.register
  return {
    server,
    gqlClient,
    token: token,
    myTokenToAdmin: function (secret = process.env.JWT_SECRET) {
      token.role = 'ADMIN'
      delete token.exp
      return JWT.sign(token, secret, { expiresIn: '4s' })
    },
    myTokenToCookie: function (secret = process.env.JWT_SECRET) {
      delete token.exp
      return `Authorization=${JWT.sign(token, secret, { expiresIn: '4s' })}`
    },
    errorMessage: function (message, path) {
      return [
        {
          message: message,
          locations: [
            {
              line: 3,
              column: 5
            }
          ],
          path: [path]
        }
      ]
    }
  }
})()
