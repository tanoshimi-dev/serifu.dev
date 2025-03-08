#FROM node:18.17.1
FROM node:20.11.1

WORKDIR /app

#COPY package*.json ./

COPY project/ /app

# Install the dependencies
RUN npm install
RUN npm install webpack-node-externals run-script-webpack-plugin webpack

EXPOSE 3000

#CMD [ "npm", "start", "dev" ]