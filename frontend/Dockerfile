FROM node:18-alpine as build

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --registry=https://registry.yarnpkg.com/

COPY . .

RUN yarn build

FROM nginx:1.25-alpine

COPY --from=build /usr/src/app/nginx /etc/nginx/conf.d
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]