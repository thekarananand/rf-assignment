FROM node:alpine3.20
COPY . /opt/frontend
WORKDIR /opt/frontend
RUN npm install
RUN npm run build
EXPOSE 3000
ENTRYPOINT [ "npm", "run", "start" ]