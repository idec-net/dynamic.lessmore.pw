FROM node:12.0-slim as builder

COPY . /build

WORKDIR /build

RUN npm i -g @angular/cli && npm i && ng build --prod --output-path /dist --build-optimizer

FROM nginx:alpine

COPY --from=builder /dist /var/www/public
