import { config } from '../config';

const swaggerDefinition = {
  openapi: '3.0.0',
  // API informations (required)
  info: {
    title: 'POCAZ REST API 관리 페이지', // Title (required)
    version: '1.0.0', // Version (required)
    description: `POCAZ 내 client가 server에 요청하는 방법을 기술한 페이지입니다.
    서버 관리자는 본인이 담당한 API를 개발 후 현재 페이지에 기술해주시길 바랍니다. 감사합니다.`, // Description (optional)
  },
  // host: `localhost:${+config.host.port}`, // Host (optional)
  basePath: '/', // Base path (optional)
  servers: [
    {
      url: 'https://pocaz.ystoy.shop/',
    },
    {
      url: 'http://localhost:8000/',
    },
    {
      url: 'http://localhost:8080/',
    },
  ],
};

// Options for the swagger docs
export const options = {
  // Import swaggerDefinitions
  swaggerDefinition,
  // Path to the API docs
  apis: ['./src/router/*.ts'],
};
