# FSB-Satory-Back

Backend for an paint-ball organisation using Prisma & Graphql

## Getting Started

We usePrisma linked with postgres and use Graphql as the API</br>
The server is containered and deployed with Docker

### Prerequisites

Node, Docker, docker-compose and Prisma are the only mandatory dependance you need to start the project localy

Official install page for:

- Docker: https://docs.docker.com/install/
- docker-compose: https://docs.docker.com/compose/install/
- Node: https://nodejs.org/en/download/package-manager/
- Prisma Client: https://www.prisma.io/docs/prisma-client/

### Starting the application

Edit the .env to change the secrets and config to your needs

Use the [docker-compose.yml](./docker-compose.yml) file to start the project

Using `docker-compose up -d`

> You can remove the `-d` to be attached to the output

> **Important** this start the a local server if you want to deploy your serveur as production you can look at the ***"Deployement"*** part of the document

### Admin and Playground pages

Prisma and graphql-yoga have some pages for us to use to debug and administrate the application:
The [Playground]('http://localhost:4000/) exposed by default on the port 4000 of your machine
And the [Admin panel]('http://localhost:4466/_admin) expose on port 4466 and the route `_admin`

This page will ask you for a token you can get it with `prisma token`

#### Some Command that can be used

Prisma Client is used to manage the server

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
- [Docker](https://www.docker.com/)

## Deployement

You will need to install and setup [traefik](https://docs.traefik.io/providers/docker/) and [docker swarm](https://docs.docker.com/engine/swarm/swarm-tutorial/)


>The deploy use *greefine/fs1-satory-back* as image you can build it your self from the [Dockerfile](./Dockerfile):
`docker build -t greefine/fs1-satory-back  .`

Once done you can deploy the app with
```
docker stack deploy -c docker-compose.yml -c docker-compose.prod.yml <name for your stack>
```

## Authors

- **Raphael CHRIQUI** - [GreeFine](https://github.com/GreeFine)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
