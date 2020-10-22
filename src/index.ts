import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import 'reflect-metadata'; // required to make the type reflection work
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { PostResolver } from './resolvers/post';
import { UserResolver } from './resolvers/user';
import redis from 'redis';
import connectRedis from 'connect-redis';
import session from 'express-session';
import { COOKIE_NAME, __prod__ } from './utils/constants';

const main = async () => {
  // createConnection method will automatically read connection options
  // from ormconfig file or environment variables
  await createConnection(); // Database config

  const app = express();
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  );

  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient();

  app.use(
    session({
      name: COOKIE_NAME, //name of cookie
      store: new RedisStore({
        client: redisClient,
        disableTouch: true, //Disables resetting TTL when using touch. Touch signals redis that user active but modified data
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true, // you cannot access the cookie in frontend
        sameSite: 'lax', // protecting csrf
        secure: __prod__, // cookie only works in https
      },
      saveUninitialized: false, // True forces a session that is "uninitialized" to be saved to the store.
      secret: process.env.REDIS_SECRET as string,
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
      redis,
      //userLoader();
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
