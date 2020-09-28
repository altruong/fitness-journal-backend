import express from 'express';

const main = async () => {
  const app = express();

  app.get('/', (req, res) => {
    res.send('Hi');
  });
};

main().catch((err) => {
  console.log(err);
});
