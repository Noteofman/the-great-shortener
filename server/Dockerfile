FROM node:lts-alpine3.13

WORKDIR /server

RUN apk --no-cache add --virtual builds-deps build-base python3

COPY package.json package-lock.json /server/

RUN npm ci

COPY . .

CMD [ "npm", "run", "start:dev" ]
