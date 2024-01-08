FROM node:18-alpine AS build
WORKDIR /usr/src/app
#install app dependicies
COPY package.json package-lock.json ./
RUN npm install
COPY . .
COPY .env .env.example
EXPOSE 3000
CMD [ "npm","start" ]