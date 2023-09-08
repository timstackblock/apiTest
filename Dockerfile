FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
RUN npm install  @stacks/cli@3.5.0
COPY . .


