# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY . .
RUN npm install --legacy-peer-deps
RUN npm run build:prod
COPY . .

# production stage
FROM webdevops/nginx:alpine as production-stage
ENV WEB_DOCUMENT_ROOT /var/www/html
ENV WEB_DOCUMENT_INDEX index.html
ENV ACCEPT_EULA y
RUN echo "gzip on;" >> /opt/docker/etc/nginx/conf.d/gzip.conf
RUN echo "gzip_types text/plain application/xm application/json application/javascript;" >> /opt/docker/etc/nginx/conf.d/gzip.conf
RUN echo "gzip_proxied no-cache no-store private expired auth;" >> /opt/docker/etc/nginx/conf.d/gzip.conf
RUN echo "gzip_min_length 1000;" >> /opt/docker/etc/nginx/conf.d/gzip.conf

# Set workdir
WORKDIR /var/www/html
COPY --from=build-stage /app/dist/projects-client /var/www/html
