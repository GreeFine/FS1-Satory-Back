const utils_promise = require('./utils');

let ready_utils;
beforeAll(async () => {
  ready_utils = await utils_promise;
});

const updateUserMutation = `
  mutation updateUsern($id: ID, $role: Role, $username: String, $password: String) {
    updateUser(id: $id, role: $role, username: $username, password: $password) {
      username
      role
    }
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

test('Mess JWT data', async () => {
  let errored = false;

  const maliciousToken = await ready_utils.myTokenToAdmin('invalidsecret');
  ready_utils.gqlClient.options.headers = {
    Cookie: `Authorization=${maliciousToken}`,
  };

  await ready_utils.gqlClient
    .rawRequest(updateUserMutation, {
      id: 'somet21312OtherId',
    })
    .catch(error => {
      errored = true;
      expect(error.response.errors).toEqual(
        ready_utils.errorMessage('Not connected.', 'updateUser')
      );
    });

  expect(errored).toBe(true);
});

test('JWT refresh', async () => {
  let errored = false;
  const validToken = await ready_utils.myTokenToAdmin();
  ready_utils.gqlClient.options.headers = {
    Cookie: `Authorization=${validToken}`,
  };

  const respons_no_refresh = await ready_utils.gqlClient.rawRequest(queryMe);
  const no_cookie = await respons_no_refresh.headers.get('set-cookie');
  expect(no_cookie).toBe(null);

  await new Promise(resolve => setTimeout(resolve, 2000));
  const respons_with_refresh = await ready_utils.gqlClient.rawRequest(queryMe);
  const got_cookie = await respons_with_refresh.headers.get('set-cookie');
  expect(got_cookie).toBeDefined();
});
