const { request } = require('graphql-request');
const serverStart = require('../index');

let server = null;

beforeAll(async () => {
  server = await serverStart();
  host = `http://127.0.0.1:${server.address().port}`;
});

afterAll(async () => {
  server.close();
});

const username = 'Red';
const password = 'jalksdf';

const mutation = `
  mutation {
    register(username: "${username}", password: "${password}") {
      username
      role
    }
  }
`;

test('Register user', async () => {
  const response = await request(host, mutation);
  expect(response).toEqual({ register: { username: username, role: 'GUEST' } });
});

test('Invalid user register', async () => {
  const response = await request(host, mutation);
  expect(response).toEqual({ register: { username: username, role: 'GUEST' } });
});
