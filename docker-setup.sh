#!/bin/bash
set -e

echo "📂 Creando carpetas de servicios..."
mkdir -p backend frontend-web frontend-mobile

echo "📝 Creando Dockerfile para backend..."
cat << 'DOCK' > backend/Dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 5002
CMD ["npm", "run", "start"]
DOCK

echo "📝 Creando Dockerfile para frontend-web..."
cat << 'DOCK' > frontend-web/Dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3000
CMD ["npm", "start"]
DOCK

echo "📝 Creando Dockerfile para frontend-mobile..."
cat << 'DOCK' > frontend-mobile/Dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 19006
CMD ["npm", "start"]
DOCK

echo "📝 Creando docker-compose.yml..."
cat << 'DOCK' > docker-compose.yml
services:
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "5002:5002"
    environment:
      NODE_ENV: development
      DB_HOST: postgres
      DB_USER: postgres
      DB_PASSWORD: postgres
      DB_NAME: comercialx
    depends_on:
      - postgres

  frontend-web:
    build:
      context: ./frontend-web
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    depends_on:
      - backend

  frontend-mobile:
    build:
      context: ./frontend-mobile
      dockerfile: Dockerfile
    ports:
      - "19006:19006"
    depends_on:
      - backend

  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: comercialx
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

  pgadmin:
    image: dpage/pgadmin4
    environment:
      PGADMIN_DEFAULT_EMAIL: innovacioncomercialx@gmail.com
      PGADMIN_DEFAULT_PASSWORD: admin
    ports:
      - "8080:80"
    depends_on:
      - postgres

volumes:
  pgdata:
DOCK

echo "🔧 Asignando permisos de ejecución..."
chmod +x docker-setup.sh

echo "✅ Dockerfiles y docker-compose.yml creados correctamente."
