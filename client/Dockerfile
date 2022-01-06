FROM node:latest

WORKDIR /app

COPY package.json /

ENV REACT_APP_API_URL="http://127.0.0.1:8000"

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
