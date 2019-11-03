const { formatError } = require('graphql');

const { exec } = require('child_process');
const dotenv = require('dotenv');

dotenv.config();

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
  debug: process.env.NODE_ENV !== 'production',
});

const server = new GraphQLServer({
  typeDefs: './src/schema/schema.graphql',
  resolvers,
  middlewares: [permissions],
  context: async (req) => ({
    ...req,
    prisma,
    jwt: await getJWT(req, prisma),
    db,
  }),
});
const options = {
  port: process.env.NODE_ENV === 'test' ? 0 : 4000,
  cors: {
    credentials: true,
    origin: [
      'http://localhost:3000',
      'https://greefine.fr',
    ],
  },
  subscriptions: {
    onConnect: async (connectionParams, webSocket) => {
      try {
        return await webSocket.upgradeReq.headers;
      } catch (error) {
        console.error('error', error);
      }
      return null;
    },
  },
  formatError: (err) => {
    if (err.originalError) return { ...formatError(err), code: err.originalError.code };
    return formatError(err);
  },
};

server.express.use(cookieParser());

module.exports = async function serverStart() {
  const liveServer = await server.start(options, ({ port }) => console.log(`Server is running on http://localhost:${port}/`));
  return liveServer;
};

module.exports = function resetDB() {
  return new Promise((resolve, reject) => {
    exec('prisma reset --force', (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return reject(err);
      }
      if (stdout) console.log(`stdout: ${stdout}`);
      else if (stderr) console.error(`stderr: ${stderr}`);
      return resolve();
    });
  });
};

if (process.env.NODE_ENV !== 'test') module.exports.serverStart();
