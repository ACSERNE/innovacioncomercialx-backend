FROM node:20-slim

WORKDIR /app

# Copiar solo dependencias del backend
COPY package*.json ./

RUN npm install --omit=dev

# Copiar SOLO el backend real
COPY app.js .
COPY server.js .
COPY controllers ./controllers
COPY routes ./routes
COPY models ./models
COPY middleware ./middleware
COPY services ./services
COPY utils ./utils
COPY cron ./cron
COPY config ./config
COPY migrations ./migrations
COPY seeders ./seeders

EXPOSE 5002

CMD ["npm", "start"]
