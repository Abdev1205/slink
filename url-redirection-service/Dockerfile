FROM node:18-alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN npm install -g nodemon && npm install

COPY . .

EXPOSE 5001
CMD ["node", "index.js"]
