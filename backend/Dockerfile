FROM node:latest as build-stage

COPY . /app
WORKDIR /app

RUN npm install
RUN npm run build

EXPOSE $PORT

CMD ["node", "dist/main.js"]