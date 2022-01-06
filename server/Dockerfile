FROM node:latest

WORKDIR /app

COPY package*.json /app/
COPY ./src /app/src

RUN npm install

EXPOSE 8000

CMD ["npm", "start"]