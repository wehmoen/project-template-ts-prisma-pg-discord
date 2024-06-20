FROM node:alpine3.20

WORKDIR /bot

COPY package.json .
COPY pnpm-lock.yaml .

RUN npm install -g pnpm prisma

RUN pnpm install

COPY . .

RUN pnpm db::generate

CMD ["pnpm", "container::start"]