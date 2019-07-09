FROM node:alpine as builder
COPY . /app
WORKDIR /app
RUN npm i
RUN npm run build
WORKDIR /app/dist
ENV NODE_ENV=production
CMD ["node", "main.js"]