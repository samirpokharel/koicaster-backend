FROM node:20.11.0-bullseye
WORKDIR /app
COPY package.json yarn.lock ./
RUN apt-get update -y && apt-get install -y openssl
RUN yarn install
COPY . .
EXPOSE 5000
RUN yarn prisma generate &&  yarn build
CMD ["yarn", "start"]
