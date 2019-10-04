const dotenv = require('dotenv');
dotenv.config();
console.log(`Prisma endpoint: ${process.env['PRISMA_HOST']}`);

const { prisma } = require('./generated/prisma-client');
const { GraphQLServer } = require('graphql-yoga');

const Query = require('./resolvers/query');
const Mutation = require('./resolvers/mutation');
const { permissions, getRole } = require('./auth');
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
    role: getRole(req),
  }),
});

const options = {
  port: 4000,
  cors: {
    credentials: true,
    origin: ['http://localhost:3000', 'http://greefine.ovh'],
  },
};

server.express.use(cookieParser());
server.start(options, ({ port }) =>
  console.log(`Server is running on http://localhost:${port}/`)
);
