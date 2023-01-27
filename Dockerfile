FROM node:18-alpine
# install dependencies
RUN apk add --no-cache git
# install npm
RUN npm install -g npm@latest
# copy application code
COPY . /app
WORKDIR /app

# install app dependencies
RUN yarn install 
