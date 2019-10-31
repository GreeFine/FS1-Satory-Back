/* eslint-disable no-undef */
require('fetch-cookie/node-fetch')(require('node-fetch'))
const utilsPromise = require('./utils')

let readyUtils
beforeAll(async () => {
  readyUtils = await utilsPromise
})

function randString () {
  return Math.random()
    .toString(36)
    .substr(2)
}

const registerMutation = `
  mutation register($username: String!, $password: String!) {
    register(username: $username, password: $password) {
      username
      role
    }
  }
`

const loginMutation = `
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      username
      role
    }
  }
`

const updateUserMutation = `
  mutation updateUsern($id: ID, $role: Role, $username: String, $password: String) {
    updateUser(id: $id, role: $role, username: $username, password: $password) {
      username
      role
    }
  }
`

const logout = `
  mutation {
    logout
  }
`

const username = randString()
const password = randString()
const newUsername = randString()
const newPassword = randString()

test('Register user', async () => {
  const response = await readyUtils.gqlClient.request(registerMutation, {
    username,
    password
  })
  expect(response).toEqual({ register: { username: username, role: 'GUEST' } })
})

test('Invalid user register', async () => {
  let errored = false
  await readyUtils.gqlClient
    .request(registerMutation, { username: '', password })
    .catch(error => {
      errored = true
      expect(error.response.errors).toEqual(
        readyUtils.errorMessage('Invalid Username', 'register')
      )
    })
  expect(errored).toBe(true)
})

test('Invalid password register', async () => {
  let errored = false

  await readyUtils.gqlClient
    .request(registerMutation, { username, password: '' })
    .catch(error => {
      errored = true
      expect(error.response.errors).toEqual(
        readyUtils.errorMessage('Invalid Password', 'register')
      )
    })
  expect(errored).toBe(true)
})

test('Login', async () => {
  const response = await readyUtils.gqlClient.rawRequest(loginMutation, {
    username,
    password
  })
  expect(response.data).toEqual({
    login: { username: username, role: 'GUEST' }
  })
  expect(response.headers).toBeDefined()
  const setCookie = await response.headers.get('set-cookie')
  expect(setCookie).toContain('Authorization')
})

test('Login Invalid Username', async () => {
  let errored = false
  await readyUtils.gqlClient
    .request(loginMutation, { username: '', password: 'watever' })
    .catch(error => {
      errored = true
      expect(error.response.errors).toEqual(
        readyUtils.errorMessage('Invalid username', 'login')
      )
    })
  expect(errored).toBe(true)
})

test('Login Invalid password', async () => {
  let errored = false
  await readyUtils.gqlClient
    .request(loginMutation, { username, password: '' })
    .catch(error => {
      errored = true
      expect(error.response.errors).toEqual(
        readyUtils.errorMessage('Invalid password', 'login')
      )
    })
  expect(errored).toBe(true)
})

test('Logout', async () => {
  readyUtils.gqlClient.options.headers = {
    Cookie: readyUtils.myTokenToCookie()
  }

  const response = await readyUtils.gqlClient.rawRequest(logout)
  expect(response.data).toEqual({ logout: 'Success' })
})

test('Logout error removing token', async () => {
  readyUtils.gqlClient.options.headers = {}

  let errored = false
  await readyUtils.gqlClient.rawRequest(logout).catch(error => {
    errored = true
    expect(error.response.errors).toEqual(
      readyUtils.errorMessage('Not connected.', 'logout')
    )
  })
  expect(errored).toBe(true)
})

test('Update user', async () => {
  readyUtils.gqlClient.options.headers = {
    Cookie: readyUtils.myTokenToCookie()
  }

  const response = await readyUtils.gqlClient.rawRequest(updateUserMutation, {
    username: newUsername,
    password: newPassword
  })
  expect(response.data).toEqual({
    updateUser: {
      username: newUsername,
      role: 'GUEST'
    }
  })
})

test('Update user with invalid data', async () => {
  readyUtils.gqlClient.options.headers = {
    Cookie: readyUtils.myTokenToCookie()
  }

  let errored = false
  await readyUtils.gqlClient
    .rawRequest(updateUserMutation, {
      username: 'w'
    })
    .catch(error => {
      errored = true
      expect(error.response.errors).toEqual(
        readyUtils.errorMessage('Invalid Username', 'updateUser')
      )
    })

  await readyUtils.gqlClient
    .rawRequest(updateUserMutation, {
      role: 'ADMIN'
    })
    .catch(error => {
      errored = true
      expect(error.response.errors).toEqual(
        readyUtils.errorMessage('Only an admin can update roles', 'updateUser')
      )
    })

  await readyUtils.gqlClient
    .rawRequest(updateUserMutation, {
      id: 'somet21312OtherId'
    })
    .catch(error => {
      errored = true
      expect(error.response.errors).toEqual(
        readyUtils.errorMessage(
          'Only an admin can update another user',
          'updateUser'
        )
      )
    })

  expect(errored).toBe(true)
})

test('Admin stuff', async () => {
  const validToken = await readyUtils.myTokenToAdmin()
  readyUtils.gqlClient.options.headers = {
    Cookie: `Authorization=${validToken}`
  }

  const response = await readyUtils.gqlClient.rawRequest(updateUserMutation, {
    role: 'USER',
    username: newUsername
  })
  expect(response.data).toEqual({
    updateUser: {
      username: newUsername,
      role: 'USER'
    }
  })
})
