import 'reflect-metadata'; // required to make the type reflection work
import express from 'express';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { PostResolver } from './resolvers/post';
import cors from 'cors';
import { UserResolver } from './resolvers/user';
require('dotenv').config();

const main = async () => {
  // createConnection method will automatically read connection options
  // from your ormconfig file or environment variables
  const conn = await createConnection();

  const app = express();
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostResolver, UserResolver],
      validate: false,
    }),
  });

  // Creates a graphql endpoint on express
  // CORS set to false because we already have a cors middleware on express
  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log('server astarted on localhost:4000');
  });

  // Test endpoint
  app.get('/', (_req, res) => {
    res.send('Hi');
  });
};

main().catch((err) => {
  console.log(err);
});
