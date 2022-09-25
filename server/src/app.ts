import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helemt from 'helmet';
import { config } from './config';

import { initSocket, getSocketIO } from './connection/socket';

import chatRoomRouter from './router/chatRoom';
import postRouter from './router/post';
import marketRouter from './router/market';

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(helemt());

// TODO -  cors 다 열어놓으면 안됨 나중에 수정필요!
app.use(cors());

app.use('/chatRoom', chatRoomRouter);
app.use('/post', postRouter);
app.use('/market', marketRouter);

const server = app.listen(+config.host.port, () => {
  console.log(`listening on port ${+config.host.port}`);
});

initSocket(server);