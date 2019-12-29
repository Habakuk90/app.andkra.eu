### STAGE 1: Build ###

# We label our stage as ‘builder’
FROM node:13.5.0-alpine as builder

ADD package.json /tmp/package.json
ADD package-lock.json /tmp/package-lock.json

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN cd /tmp && npm install
RUN mkdir -p /ng-app && cp -a /tmp/node_modules /ng-app

WORKDIR /ng-app

ADD . /ng-app

# setting TravisCI environment variable via docker build --build-args key=${GHOST_API_KEY}
ARG key
ENV GHOST_API_KEY=$key

## Build the angular app in production mode and store the artifacts in dist folder
RUN $(npm bin)/ng build --prod --no-progress

### STAGE 2: Setup ###

FROM nginx:latest

## Copy our default nginx config
COPY /nginx/default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From ‘builder’ stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /ng-app/dist/app-andkra-eu /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
