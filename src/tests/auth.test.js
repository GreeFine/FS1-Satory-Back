require('fetch-cookie/node-fetch')(require('node-fetch'));
const { request, GraphQLClient } = require('graphql-request');
const { serverStart, resetDB } = require('../index');
const cookie = require('cookie');
const JWT = require('jsonwebtoken');

let server = null;
let gqlClient = null;
let myToken = null;

beforeAll(async () => {
  const reset = await resetDB();
  server = await serverStart();
  host = `http://127.0.0.1:${server.address().port}`;
  gqlClient = new GraphQLClient(host, { credentials: 'include', mode: 'cors' });
});

afterAll(async () => {
  server.close();
});

function myTokenToAdmin(secret) {
  const actualToken = cookie.parse(myToken).Authorization;
  const decoded_token = JWT.decode(actualToken);
  decoded_token.role = 'ADMIN';
  delete decoded_token.exp;
  return JWT.sign(decoded_token, secret, { expiresIn: '4s' });
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

const queryMe = `
  query {
    me {
      username
      role
    }
  }
`;

const username = 'Red2';
const password = 'Paswor!d';
const newUsername = 'testoos';
const newPassword = 'pasWooed!';

function errorMessage(message, path) {
  return [
    {
      message: message,
      locations: [
        {
          line: 3,
          column: 5,
        },
      ],
      path: [path],
    },
  ];
}

test('Register user', async () => {
  const response = await gqlClient.request(registerMutation, {
    username,
    password,
  });
  expect(response).toEqual({ register: { username: username, role: 'GUEST' } });
});

test('Invalid user register', async () => {
  const response = await gqlClient
    .request(registerMutation, { username: '', password })
    .catch(error => {
      expect(error.response.errors).toEqual(
        errorMessage('Invalid Username', 'register')
      );
    });
});

test('Invalid password register', async () => {
  const response = await gqlClient
    .request(registerMutation, { username, password: '' })
    .catch(error => {
      expect(error.response.errors).toEqual(
        errorMessage('Invalid Password', 'register')
      );
    });
});

test('Login', async () => {
  const response = await gqlClient.rawRequest(loginMutation, {
    username,
    password,
  });
  expect(response.data).toEqual({
    login: { username: username, role: 'GUEST' },
  });
  expect(response.headers).toBeDefined();
  const set_cookie = await response.headers.get('set-cookie');
  expect(set_cookie).toContain('Authorization');
  myToken = set_cookie;
});

test('Login Invalid Username', async () => {
  let errored = false;
  const response = await gqlClient
    .request(loginMutation, { username: '', password: 'watever' })
    .catch(error => {
      errored = true;
      expect(error.response.errors).toEqual(
        errorMessage('Invalid username', 'login')
      );
    });
  expect(errored).toBe(true);
});

test('Login Invalid password', async () => {
  let errored = false;
  const response = await gqlClient
    .request(loginMutation, { username, password: '' })
    .catch(error => {
      errored = true;
      expect(error.response.errors).toEqual(
        errorMessage('Invalid password', 'login')
      );
    });
  expect(errored).toBe(true);
});

test('Logout', async () => {
  gqlClient.options.headers = {
    Cookie: myToken,
  };

  const response = await gqlClient.rawRequest(logout);
  expect(response.data).toEqual({ logout: 'Success' });
});

test('Logout error removing token', async () => {
  gqlClient.options.headers = {};

  let errored = false;
  const result = await gqlClient.rawRequest(logout).catch(error => {
    errored = true;
    expect(error.response.errors).toEqual(
      errorMessage('Not connected.', 'logout')
    );
  });
  expect(errored).toBe(true);
});

test('Update user', async () => {
  gqlClient.options.headers = {
    Cookie: myToken,
  };

  const response = await gqlClient.rawRequest(updateUserMutation, {
    username: newUsername,
    password: newPassword,
  });
  expect(response.data).toEqual({
    updateUser: { username: newUsername, role: 'GUEST' },
  });
});

test('Update user with invalid data', async () => {
  gqlClient.options.headers = {
    Cookie: myToken,
  };

  let errored = false;
  await gqlClient
    .rawRequest(updateUserMutation, {
      username: 'w',
    })
    .catch(error => {
      errored = true;
      expect(error.response.errors).toEqual(
        errorMessage('Not Authorised!', 'updateUser')
      );
    });

  await gqlClient
    .rawRequest(updateUserMutation, {
      role: 'ADMIN',
    })
    .catch(error => {
      errored = true;
      expect(error.response.errors).toEqual(
        errorMessage('Only an admin can update roles', 'updateUser')
      );
    });

  await gqlClient
    .rawRequest(updateUserMutation, {
      id: 'somet21312OtherId',
    })
    .catch(error => {
      errored = true;
      expect(error.response.errors).toEqual(
        errorMessage('Only an admin can update another user', 'updateUser')
      );
    });

  expect(errored).toBe(true);
});

test('Mess JWT data', async () => {
  let errored = false;

  const maliciousToken = myTokenToAdmin('invalidsecret');
  gqlClient.options.headers = {
    Cookie: `Authorization=${maliciousToken}`,
  };

  await gqlClient
    .rawRequest(updateUserMutation, {
      id: 'somet21312OtherId',
    })
    .catch(error => {
      errored = true;
      expect(error.response.errors).toEqual(
        errorMessage('Not connected.', 'updateUser')
      );
    });

  expect(errored).toBe(true);
});

test('JWT refresh', async () => {
  let errored = false;

  const validToken = myTokenToAdmin(process.env.JWT_SECRET);
  gqlClient.options.headers = {
    Cookie: `Authorization=${validToken}`,
  };

  const respons_no_refresh = await gqlClient.rawRequest(queryMe);
  const no_cookie = await respons_no_refresh.headers.get('set-cookie');
  expect(no_cookie).toBe(null);

  await new Promise(resolve => setTimeout(resolve, 2000));
  const respons_with_refresh = await gqlClient.rawRequest(queryMe);
  const got_cookie = await respons_with_refresh.headers.get('set-cookie');
  expect(got_cookie).toBeDefined();
});

test('Admin stuff', async () => {
  const validToken = myTokenToAdmin(process.env.JWT_SECRET);
  gqlClient.options.headers = {
    Cookie: `Authorization=${validToken}`,
  };

  const response = await gqlClient.rawRequest(updateUserMutation, {
    role: 'USER',
  });
  expect(response.data).toEqual({
    updateUser: { username: newUsername, role: 'USER' },
  });
});
