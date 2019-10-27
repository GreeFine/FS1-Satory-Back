require('fetch-cookie/node-fetch')(require('node-fetch'));
const utils_promise = require('./utils');

let ready_utils;
beforeAll(async () => {
  ready_utils = await utils_promise;
});

function randString() {
  return Math.random()
    .toString(36)
    .substr(2);
}

const registerMutation = `
  mutation register($username: String!, $password: String!) {
    register(username: $username, password: $password) {
      username
      role
    }
  }
`;

const loginMutation = `
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      username
      role
    }
  }
`;

const updateUserMutation = `
  mutation updateUsern($id: ID, $role: Role, $username: String, $password: String) {
    updateUser(id: $id, role: $role, username: $username, password: $password) {
      username
      role
    }
  }
`;

const logout = `
  mutation {
    logout
  }
`;

const username = randString();
const password = randString();
const newUsername = randString();
const newPassword = randString();

test('Register user', async () => {
  const response = await ready_utils.gqlClient.request(registerMutation, {
    username,
    password,
  });
  expect(response).toEqual({ register: { username: username, role: 'GUEST' } });
});

test('Invalid user register', async () => {
  const response = await ready_utils.gqlClient
    .request(registerMutation, { username: '', password })
    .catch(error => {
      expect(error.response.errors).toEqual(
        ready_utils.errorMessage('Invalid Username', 'register')
      );
    });
});

test('Invalid password register', async () => {
  const response = await ready_utils.gqlClient
    .request(registerMutation, { username, password: '' })
    .catch(error => {
      expect(error.response.errors).toEqual(
        ready_utils.errorMessage('Invalid Password', 'register')
      );
    });
});

test('Login', async () => {
  const response = await ready_utils.gqlClient.rawRequest(loginMutation, {
    username,
    password,
  });
  expect(response.data).toEqual({
    login: { username: username, role: 'GUEST' },
  });
  expect(response.headers).toBeDefined();
  const set_cookie = await response.headers.get('set-cookie');
  expect(set_cookie).toContain('Authorization');
});

test('Login Invalid Username', async () => {
  let errored = false;
  const response = await ready_utils.gqlClient
    .request(loginMutation, { username: '', password: 'watever' })
    .catch(error => {
      errored = true;
      expect(error.response.errors).toEqual(
        ready_utils.errorMessage('Invalid username', 'login')
      );
    });
  expect(errored).toBe(true);
});

test('Login Invalid password', async () => {
  let errored = false;
  const response = await ready_utils.gqlClient
    .request(loginMutation, { username, password: '' })
    .catch(error => {
      errored = true;
      expect(error.response.errors).toEqual(
        ready_utils.errorMessage('Invalid password', 'login')
      );
    });
  expect(errored).toBe(true);
});

test('Logout', async () => {
  ready_utils.gqlClient.options.headers = {
    Cookie: ready_utils.myTokenToCookie(),
  };

  const response = await ready_utils.gqlClient.rawRequest(logout);
  expect(response.data).toEqual({ logout: 'Success' });
});

test('Logout error removing token', async () => {
  ready_utils.gqlClient.options.headers = {};

  let errored = false;
  const result = await ready_utils.gqlClient.rawRequest(logout).catch(error => {
    errored = true;
    expect(error.response.errors).toEqual(
      ready_utils.errorMessage('Not connected.', 'logout')
    );
  });
  expect(errored).toBe(true);
});

test('Update user', async () => {
  ready_utils.gqlClient.options.headers = {
    Cookie: ready_utils.myTokenToCookie(),
  };

  const response = await ready_utils.gqlClient.rawRequest(updateUserMutation, {
    username: newUsername,
    password: newPassword,
  });
  expect(response.data).toEqual({
    updateUser: {
      username: newUsername,
      role: 'GUEST',
    },
  });
});

test('Update user with invalid data', async () => {
  ready_utils.gqlClient.options.headers = {
    Cookie: ready_utils.myTokenToCookie(),
  };

  let errored = false;
  await ready_utils.gqlClient
    .rawRequest(updateUserMutation, {
      username: 'w',
    })
    .catch(error => {
      errored = true;
      expect(error.response.errors).toEqual(
        ready_utils.errorMessage('Invalid Username', 'updateUser')
      );
    });

  await ready_utils.gqlClient
    .rawRequest(updateUserMutation, {
      role: 'ADMIN',
    })
    .catch(error => {
      errored = true;
      expect(error.response.errors).toEqual(
        ready_utils.errorMessage('Only an admin can update roles', 'updateUser')
      );
    });

  await ready_utils.gqlClient
    .rawRequest(updateUserMutation, {
      id: 'somet21312OtherId',
    })
    .catch(error => {
      errored = true;
      expect(error.response.errors).toEqual(
        ready_utils.errorMessage(
          'Only an admin can update another user',
          'updateUser'
        )
      );
    });

  expect(errored).toBe(true);
});

test('Admin stuff', async () => {
  const validToken = await ready_utils.myTokenToAdmin();
  ready_utils.gqlClient.options.headers = {
    Cookie: `Authorization=${validToken}`,
  };

  const response = await ready_utils.gqlClient.rawRequest(updateUserMutation, {
    role: 'USER',
    username: newUsername,
  });
  expect(response.data).toEqual({
    updateUser: {
      username: newUsername,
      role: 'USER',
    },
  });
});
