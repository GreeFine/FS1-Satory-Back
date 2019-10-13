const dotenv = require('dotenv');
dotenv.config();
console.log(`Prisma endpoint: ${process.env['PRISMA_HOST']}`);

const { prisma } = require('./generated/prisma-client');
const { GraphQLServer } = require('graphql-yoga');

const Query = require('./resolvers/query');
const Mutation = require('./resolvers/mutation');
const { permissions, getJWT } = require('./permissions');
const cookieParser = require('cookie-parser');

const resolvers = {
  Query,
  Mutation,
};

const server = new GraphQLServer({
  typeDefs: './src/schema/schema.graphql',
  resolvers,
  middlewares: [permissions],
  context: req => ({
    ...req,
    prisma,
    jwt: getJWT(req, prisma),
  }),
});

const options = {
  port: process.env.NODE_ENV === 'test' ? 0 : 4000,
  cors: {
    credentials: true,
    origin: ['http://localhost:3000', 'http://greefine.ovh'],
  },
};

server.express.use(cookieParser());

module.exports = async function serverStart() {
  const live_server = await server.start(options, ({ port }) =>
    console.log(`Server is running on http://localhost:${port}/`)
  );
  return live_server;
};

if (process.env.NODE_ENV !== 'test') serverStart();
