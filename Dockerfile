# build stage
FROM node:17.3.0-alpine as build-stage

LABEL maintainer=peng0556@qq.com

EXPOSE 80

# 创建一个工作目录
WORKDIR /app

COPY . .

RUN npm install --registry=https://registry.npm.taobao.org

RUN npm run build

# production stage
FROM nginx:1.20.2-alpine as production-stage

COPY --from=build-stage /app/dist /home/nginx/home

CMD ["nginx", "-g", "daemon off;"]