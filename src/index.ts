import 'reflect-metadata'; // required to make the type reflection work
import express from 'express';
import { createConnection } from 'typeorm';
require('dotenv').config();

const main = async () => {
  // createConnection method will automatically read connection options
  // from your ormconfig file or environment variables
  const conn = await createConnection();

  const app = express();

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
