FROM node:8.15.1-onbuild
WORKDIR /app
COPY package.json /app
EXPOSE 9999
RUN npm install
COPY . /app