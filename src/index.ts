import 'reflect-metadata'; // required to make the type reflection work
import express from 'express';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { PostResolver } from './resolvers/post';
require('dotenv').config();

const main = async () => {
  // createConnection method will automatically read connection options
  // from your ormconfig file or environment variables
  const conn = await createConnection();

  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({ resolvers: [PostResolver], validate: false }),
  });
  apolloServer.applyMiddleware({ app }); // Creates a graphql endpoint on express

  app.listen(4000, () => {
    console.log('server astarted on localhost:4000');
  });

  app.get('/', (_req, res) => {
    res.send('Hi');
  });
};

main().catch((err) => {
  console.log(err);
});
