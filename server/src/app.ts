import express from 'express';
const app = express();
const port = 8000;

app.get('/', (req, res) => {
  res.send('Hello Pocaz');
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
