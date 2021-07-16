FROM node:16-alpine
WORKDIR /usr/src/app
RUN npm install -g npm@7.11.2
COPY ["package.json", "yarn.lock", "./"]
RUN yarn install
COPY . .
