import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helemt from 'helmet';

const app = express();
const port = 8000;

app.use(express.json());
app.use(morgan('dev'));
app.use(helemt());

// TODO -  cors 다 열어놓으면 안됨 나중에 수정필요!
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello Pocaz');
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
