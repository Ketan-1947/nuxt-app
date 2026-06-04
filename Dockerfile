FROM node:22-alpine

WORKDIR /project

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY app/ ./app/
COPY public/ ./public/
COPY server/ ./server/
COPY nuxt.config.ts .

RUN npm run build

EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]