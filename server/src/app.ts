import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helemt from 'helmet';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import { config } from './config';

import { initSocket, getSocketIO } from './connection/socket';

import chatRoomRouter from './router/chatRoom';
import postRouter from './router/post';
import chatRouter from './router/chat';
import marketRouter from './router/market';
import fileRouter from './router/file';
import artistRouter from './router/artist';

const app = express();

const swaggerYaml = YAML.load(
  path.join(__dirname, '../src/middleware/swagger/swagger.yaml')
);

app.use(express.json());
app.use(morgan('dev'));
app.use(helemt());

// TODO - cors 다 열어놓으면 안됨 나중에 수정필요!
app.use(cors());

app.use('/api-yaml', swaggerUi.serve, swaggerUi.setup(swaggerYaml));
app.use('/chatRoom', chatRoomRouter);
app.use('/chat', chatRouter);
app.use('/post', postRouter);
app.use('/market', marketRouter);
app.use('/file', fileRouter);
app.use('/artist', artistRouter);

const server = app.listen(+config.host.port, () => {
  console.log(`listening on port ${+config.host.port}`);
});

initSocket(server);
