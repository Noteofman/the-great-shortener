FROM node:lts-alpine3.13

WORKDIR /webapp
COPY package.json package-lock.json /webapp/
RUN npm ci
COPY . .

CMD [ "npm", "run", "serve"]
