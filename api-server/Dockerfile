FROM node:16.10.0-alpine3.13 AS builder

WORKDIR /usr/src/app

COPY . .

RUN npm ci
RUN npm run build

FROM node:16.10.0-alpine3.13

WORKDIR /usr/src/app

# Install dumb-init
RUN wget -O /usr/local/bin/dumb-init https://github.com/Yelp/dumb-init/releases/download/v1.2.5/dumb-init_1.2.5_x86_64
RUN chmod +x /usr/local/bin/dumb-init

ENV NODE_ENV=production
ENV PORT=9001

EXPOSE 9001

COPY .npmrc ./
COPY ormconfig.js ./
COPY package*.json ./
COPY --from=builder /usr/src/app/dist ./dist

RUN npm ci --only=production

CMD ["dumb-init", "node", "dist/main"]
