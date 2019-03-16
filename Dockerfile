FROM node:8.15.1-onbuild
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
EXPOSE 8888