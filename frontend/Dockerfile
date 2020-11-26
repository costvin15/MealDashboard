FROM node:latest as build-stage

COPY . /app
WORKDIR /app

RUN npm install
RUN npm run build

FROM nginx:alpine as production-stage

COPY --from=build-stage /app/build /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]