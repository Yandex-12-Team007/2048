FROM node:16.13.1-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE $PORT
CMD npm run start --bind 0.0.0.0:$PORT
