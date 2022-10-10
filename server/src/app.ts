import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helemt from 'helmet';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import { config } from './config';
import { options } from './middleware/swagger';

import { initSocket, getSocketIO } from './connection/socket';

import chatRoomRouter from './router/chatRoom';
import postRouter from './router/post';
import chatRouter from './router/chat';
import marketRouter from './router/market';
import fileRouter from './router/file';
import artistRouter from './router/artist';

const API = '/api';

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(helemt());

// TODO - cors 다 열어놓으면 안됨 나중에 수정필요!
app.use(cors());

app.use('/api-yaml', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(options)));

app.use(`${API}/chatRoom`, chatRoomRouter);
app.use(`${API}/chat`, chatRouter);
app.use(`${API}/post`, postRouter);
app.use(`${API}/market`, marketRouter);
app.use(`${API}/file`, fileRouter);
app.use(`${API}/artist`, artistRouter);

const server = app.listen(+config.host.port, () => {
  console.log(`listening on port ${+config.host.port}`);
  initSocket(server);
});
