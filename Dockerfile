FROM alpine:latest

WORKDIR /home/docker/test-node
# 安装最新版 Chromium(89) 的包
RUN apk add --no-cache \
      chromium \
      nss \
      nodejs \
      npm

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
COPY package*.json ./

COPY . /home/docker/test-node


RUN npm install

# RUN npm install --registry=https://registry.npmmirror.com/

EXPOSE 8081

CMD [ "node", "src/index.js" ]