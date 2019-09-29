const dotenv = require('dotenv');
dotenv.config();
console.log(`Prisma endpoint: ${process.env['PRISMA_HOST']}`);

const { prisma } = require('./generated/prisma-client');
const { GraphQLServer } = require('graphql-yoga');
const cors = require('cors');

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

var corsOptions = {
  origin: 'http://localhost:4000/',
  credentials: true,
};

server.express.use(cookieParser());
server.express.use(cors(corsOptions));

server.start(({ port }) =>
  console.log(`Server is running on http://localhost:${port}/`)
);
