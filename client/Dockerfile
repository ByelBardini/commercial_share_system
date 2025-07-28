FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm install -g http-server

EXPOSE 4173

CMD ["http-server", "/app", "-p", "4173"]
