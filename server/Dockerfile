FROM node:20

WORKDIR /app
COPY package*.json ./
RUN npm install
RUN ls -la
VOLUME /app
COPY . .
CMD ["sh", "-c", "npm run dev"]
