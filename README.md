# FSB-Satory-Back

Backend for an paint-ball organisation using Prisma & Graphql

## Getting Started

We usePrisma linked with postgres and use Graphql as the API</br>
The server is containered and deployed with Docker

### Prerequisites

Docker and docker-compose are the only mandatory dependance you need to start the project localy

Official install page for:

- Docker: https://docs.docker.com/install/
- docker-compose: https://docs.docker.com/compose/install/

### Starting the application

You can use the [docker-compose.yml](./docker-compose.yml) file to start the project

Using `docker-compose up -d`

> You can remove the `-d` to be attached to the output

Prisma provide a client that can be used to manage the server, to use it you need to install [Node](https://nodejs.org/en/download/package-manager/), and [Prisma Client](https://www.prisma.io/docs/prisma-client/)

#### Some Command that can be used

```bash
Usage: prisma COMMAND

Service:
          deploy  Deploy service changes (or new service)
      introspect  Introspect database schema(s) of service
            info  Display service information (endpoints, cluster, ...)
           token  Create a new service token

Data workflows:
           admin  Open service endpoints in Prisma Admin
        generate  Generate a schema or Prisma Bindings
           reset  Reset the stage data
```

> All the command can be found executing `prisma --help`

### Running the tests

We use [Jest](https://jestjs.io/) for our test

You need to first start the server, use ***Starting the application*** section to do that

When the server is started simply use `yarn test` to test the application

> You can provide the aditional parameter: `--collect-coverage` to get coverage

### Coding style tests

We use elsint with the ***standard*** configuration module and you can use the `yarn lint` to test it.

## Project Architecture

The data schema description is inside the [datamodel.graphql](./datamodel.graphql) this file will be parsed by Prisma and will automaticaly do the migrations and relations for our data

We describe the routes and parameters inside the GraphQL [schemas](./src/schema)

All the logic for serving the routes is handled by the [resolvers](./src/resolvers), they are the link between Prisma and GraphQL

The security and permissions are handled with [JWT](./src/jwt.js) and [graphql-shield](./src/permissions.js)

### Major Frameworks used

- [Prisma](https://www.Prisma.io/)
- [Prisma-bindings](https://github.com/prisma-labs/prisma-binding)
- [graphql-yoga](https://github.com/prisma-labs/graphql-yoga)
- [graphql-shield](https://github.com/maticzav/graphql-shield)
- [Jest](https://jestjs.io/)

## Authors

- **Raphael CHRIQUI** - [GreeFine](https://github.com/GreeFine)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details