const { request } = require('graphql-request');
const { serverStart, resetDB } = require('../index');

let server = null;

beforeAll(async () => {
  const reset = await resetDB();
  server = await serverStart();
  host = `http://127.0.0.1:${server.address().port}`;
});

afterAll(async () => {
  server.close();
});

function registerMutation(username, password) {
  return `
  mutation {
    register(username: "${username}", password: "${password}") {
      username
        role
      }
    }
  `;
}

const username = 'red';
const password = 'Paswor!d';

test('Register user', async () => {
  const response = await request(host, registerMutation(username, password));
  expect(response).toEqual({ register: { username: username, role: 'GUEST' } });
});

test('Invalid user register', async () => {
  const response = await request(host, registerMutation('', password)).catch(
    error => {
      expect(error.response.errors).toEqual([
        {
          message: 'Invalid Username',
          locations: [
            {
              line: 3,
              column: 5,
            },
          ],
          path: ['register'],
        },
      ]);
    }
  );
});

test('Invalid password register', async () => {
  const response = await request(host, registerMutation(username, '')).catch(
    error => {
      expect(error.response.errors).toEqual([
        {
          message: 'Invalid Password',
          locations: [
            {
              line: 3,
              column: 5,
            },
          ],
          path: ['register'],
        },
      ]);
    }
  );
});
