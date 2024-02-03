FROM node:alpine

WORKDIR /app

ENV NODE_ENV="production"

ENV PORT=3001

COPY --link package.json ./

COPY --link tsconfig.json ./

RUN npm i

COPY --link . .

RUN npm run build

RUN npm install --production=true

EXPOSE 3001

RUN node dist/server.js
