/* eslint-disable no-undef */
const utilsPromise = require('./utils');

let readyUtils;
beforeAll(async () => {
  readyUtils = await utilsPromise;
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

  const maliciousToken = await readyUtils.myTokenToAdmin('invalidsecret');
  readyUtils.gqlClient.options.headers = {
    Cookie: `Authorization=${maliciousToken}`,
  };

  await readyUtils.gqlClient
    .rawRequest(updateUserMutation, {
      id: 'somet21312OtherId',
    })
    .catch((error) => {
      errored = true;
      expect(error.response.errors).toEqual(
        [
          {
            message: 'Not connected',
            locations: [
              {
                line: 3,
                column: 5,
              },
            ],
            path: ['updateUser'],
            code: 401,
          },
        ],
      );
    });

  expect(errored).toBe(true);
});

test('JWT refresh', async () => {
  const validToken = await readyUtils.myTokenToAdmin();
  readyUtils.gqlClient.options.headers = {
    Cookie: `Authorization=${validToken}`,
  };

  const responsNoRefresh = await readyUtils.gqlClient.rawRequest(queryMe);
  const noCookie = await responsNoRefresh.headers.get('set-cookie');
  expect(noCookie).toBe(null);

  await new Promise((resolve) => setTimeout(resolve, 2000));
  const responsWithRefresh = await readyUtils.gqlClient.rawRequest(queryMe);
  const gotCookie = await responsWithRefresh.headers.get('set-cookie');
  expect(gotCookie).toBeDefined();
});
