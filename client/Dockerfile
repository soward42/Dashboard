FROM node:8
RUN npm install -g http-server
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
VOLUME shared
EXPOSE 8081
CMD ["http-server", "dist", "-p 8081"]
