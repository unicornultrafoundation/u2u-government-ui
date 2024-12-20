FROM node:20.17-alpine3.20
RUN apk add git
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn
COPY . .
RUN yarn global add env-cmd serve
ENV NODE_OPTIONS=--max_old_space_size=3072
RUN env-cmd -f .env yarn build
CMD ["serve", "-s", "build"]