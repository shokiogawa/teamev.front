FROM node:16-alpine AS base
WORKDIR /src
COPY package.json package-lock.json ./
RUN apk update && yarn
COPY . .

FROM node:16-alpine AS build
WORKDIR /build
COPY --from=base /src ./
CMD [ "yarn", "start" ]