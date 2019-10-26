const { exec } = require('child_process');
const dotenv = require('dotenv');
dotenv.config();
console.log(`Prisma endpoint: ${process.env['PRISMA_HOST']}`);

const { GraphQLServer } = require('graphql-yoga');
const { Prisma: PrismaBinding } = require('prisma-binding');
const cookieParser = require('cookie-parser');

const Query = require('./resolvers/query');
const Mutation = require('./resolvers/mutation');
const Subscription = require('./resolvers/subscription');
const Types = require('./resolvers/types');

const { permissions, getJWT } = require('./permissions');
const { prisma } = require('./generated/prisma-client');

const resolvers = {
  Query,
  Mutation,
  Subscription,
  ...Types,
};

const db = new PrismaBinding({
  typeDefs: './src/generated/prisma.graphql',
  endpoint: `http://${process.env.PRISMA_HOST}:4466`,
  secret: 'fs1-admin-pass!',
  debug: true,
});

const server = new GraphQLServer({
  typeDefs: './src/schema/schema.graphql',
  resolvers,
  middlewares: [permissions],
  context: async req => ({
    ...req,
    prisma,
    jwt: await getJWT(req, prisma),
    db: db,
  }),
});

const options = {
  port: process.env.NODE_ENV === 'test' ? 0 : 4000,
  cors: {
    credentials: true,
    origin: [
      'http://localhost:3000',
      'http://greefine.ovh',
      'http://greefine.fr',
    ],
  },
  subscriptions: {
    onConnect: async (connectionParams, webSocket) => {
      try {
        return await webSocket.upgradeReq.headers;
      } catch (error) {
        console.error('error', error);
      }
    },
  },
};

server.express.use(cookieParser());

module.exports.serverStart = async function() {
  const live_server = await server.start(options, ({ port }) =>
    console.log(`Server is running on http://localhost:${port}/`)
  );
  return live_server;
};

module.exports.resetDB = function() {
  return new Promise((resolve, reject) => {
    exec('prisma reset --force', (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        reject();
        return;
      }
      if (stdout) console.log(`stdout: ${stdout}`);
      else if (stderr) console.log(`stderr: ${stderr}`);
      resolve();
    });
  });
};

if (process.env.NODE_ENV !== 'test') module.exports.serverStart();
