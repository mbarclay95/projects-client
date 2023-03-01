# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY . .
RUN npm install --legacy-peer-deps
RUN ls -la ./
RUN ls -la ./node_modules
RUN ls -la ./node_modules/gzipper
RUN ls -la ./node_modules/gzipper/bin
RUN npm run build-compress:prod
COPY . .

# production stage
FROM webdevops/nginx:alpine as production-stage
ENV WEB_DOCUMENT_ROOT /var/www/html
ENV WEB_DOCUMENT_INDEX index.html
ENV ACCEPT_EULA y
RUN echo "gzip_types text/plain application/xm application/json application/javascript;" >> /opt/docker/etc/nginx/conf.d/gzip.conf

# Set workdir
WORKDIR /var/www/html
COPY ./docker/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist-compressed/projects-client /var/www/html
