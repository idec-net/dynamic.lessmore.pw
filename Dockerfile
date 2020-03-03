FROM node:10.13-slim as builder

COPY . /build

WORKDIR /build

RUN npm i -g @angular/cli && npm i && ng build --prod --output-path /dist --build-optimizer

FROM nginx:alpine as final

COPY --from=builder /dist /var/www/public
