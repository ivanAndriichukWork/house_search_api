FROM node:20-alpine as build

WORKDIR /root/app

COPY . /root/app/

RUN npm install
RUN npm run build

CMD /bin/sh /root/app/start.sh