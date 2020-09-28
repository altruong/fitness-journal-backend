import express from 'express';

const main = async () => {
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
