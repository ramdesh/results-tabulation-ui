FROM node:10.13-alpine
ENV NODE_ENV production

ADD ./src /app/src
COPY package*.json /app/
COPY ./public /app/public
WORKDIR /app
RUN npm install
RUN npm run build

EXPOSE 3000
CMD npm start