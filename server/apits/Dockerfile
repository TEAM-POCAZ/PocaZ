FROM node:16-alpine

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

ENV PATH=$PATH:/home/node/.npm-global/bin

RUN mkdir -p /app

RUN chown --changes --silent --no-dereference --recursive \
    1000:1000 /app

USER node

RUN npm install -g nodemon

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

CMD ["npm", "run", "start"]