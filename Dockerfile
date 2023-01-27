FROM node:18-alpine
# install dependencies
RUN apk add --no-cache git

# copy application code
COPY . .

# install app dependencies
RUN yarn install 
