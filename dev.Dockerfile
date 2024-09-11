FROM node:20-alpine as build
WORKDIR '/root/app'

CMD rm -rf dist && npm run migration:run && npm run start:dev