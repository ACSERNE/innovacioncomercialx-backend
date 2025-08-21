# 🔐 Dockerfile cockpitizado para ComercialX API
FROM node:20-alpine

# Crear usuario no root
RUN addgroup -S comercialx && adduser -S comercialx -G comercialx

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
USER comercialx

EXPOSE 3000
CMD ["node", "server.js"]
