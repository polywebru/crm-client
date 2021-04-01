FROM node:12.2.0-alpine as build

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json yarn.lock /app/

RUN yarn global add @vue/cli@4.5.9 && \
    yarn install

COPY . /app

RUN yarn run build

# Production environment
FROM nginx:1.16.0-alpine as prod

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
