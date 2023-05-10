FROM alpine:latest as build

ARG GIT_REPO

RUN apk update && apk upgrade --no-cache
RUN apk add --no-cache git curl nodejs npm

RUN git clone ${GIT_REPO} /app
WORKDIR /app
RUN npm install
RUN npm run build

FROM nginx:latest
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]