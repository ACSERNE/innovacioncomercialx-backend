#!/bin/bash
set -e

echo "🚀 Creando estructura de proyecto Innovación Comercial X..."

# Crear carpetas
mkdir -p backend frontend-web frontend-mobile

# -----------------------------
# Backend
# -----------------------------
cat << 'BACKEND_COMAND' > backend/comand.json
{
  "name": "backend",
  "private": true,
  "author": "innovacioncomercialx@gmail.com",
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "pg": "^8.11.0",
    "sequelize": "^6.37.7",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "compression": "^1.7.4"
  },
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  }
}
BACKEND_COMAND

cat << 'BACKEND_DOCKER' > backend/Dockerfile
FROM node:20-alpine
WORKDIR /app
COPY comand.json ./
RUN npm install
COPY . .
EXPOSE 5002
CMD ["npm", "run", "start"]
BACKEND_DOCKER

cat << 'BACKEND_IGNORE' > backend/.dockerignore
node_modules
npm-debug.log
.env
.DS_Store
BACKEND_IGNORE

# -----------------------------
# Frontend Web
# -----------------------------
cat << 'FEWEB_COMAND' > frontend-web/comand.json
{
  "name": "frontend-web",
  "private": true,
  "author": "innovacioncomercialx@gmail.com",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
FEWEB_COMAND

cat << 'FEWEB_DOCKER' > frontend-web/Dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY comand.json ./
RUN npm install
COPY . .
RUN npm run build
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
FEWEB_DOCKER

cat << 'FEWEB_IGNORE' > frontend-web/.dockerignore
node_modules
build
npm-debug.log
.DS_Store
FEWEB_IGNORE

# -----------------------------
# Frontend Móvil
# -----------------------------
cat << 'FEMOB_COMAND' > frontend-mobile/comand.json
{
  "name": "frontend-mobile",
  "private": true,
  "author": "innovacioncomercialx@gmail.com",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "expo": "^48.0.0",
    "react-native": "^0.72.0",
    "react-native-web": "^0.19.0"
  },
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "build": "expo build"
  }
}
FEMOB_COMAND

cat << 'FEMOB_DOCKER' > frontend-mobile/Dockerfile
FROM node:20-alpine
WORKDIR /app
COPY comand.json ./
RUN npm install
COPY . .
EXPOSE 19006
CMD ["npx", "expo", "start", "--tunnel"]
FEMOB_DOCKER

cat << 'FEMOB_IGNORE' > frontend-mobile/.dockerignore
node_modules
npm-debug.log
.DS_Store
.expo
FEMOB_IGNORE

# -----------------------------
# docker-compose.yml
# -----------------------------
cat << 'DCOMPOSE' > docker-compose.yml
services:
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: icx-backend
    ports:
      - "5002:5002"
    environment:
      - NODE_ENV=development
      - DB_HOST=postgres
      - DB_USER=postgres
      - DB_PASSWORD=postgres
      - DB_NAME=icx_db
      - DB_PORT=5432
    depends_on:
      - postgres

  frontend-web:
    build:
      context: ./frontend-web
      dockerfile: Dockerfile
    container_name: icx-frontend-web
    ports:
      - "3000:80"
    depends_on:
      - backend

  frontend-mobile:
    build:
      context: ./frontend-mobile
      dockerfile: Dockerfile
    container_name: icx-frontend-mobile
    ports:
      - "19006:19006"
    stdin_open: true
    tty: true
    depends_on:
      - backend

  postgres:
    image: postgres:15-alpine
    container_name: icx-postgres
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: icx_db
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

  pgadmin:
    image: dpage/pgadmin4
    container_name: icx-pgadmin
    restart: always
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@icx.com
      PGADMIN_DEFAULT_PASSWORD: admin
    ports:
      - "8080:80"
    depends_on:
      - postgres

volumes:
  pgdata:
DCOMPOSE

# -----------------------------
# docker-up.sh
# -----------------------------
cat << 'DUP' > docker-up.sh
#!/bin/bash
set -e
echo "🛑 Deteniendo y eliminando contenedores antiguos..."
docker-compose down --volumes --remove-orphans
echo "🔨 Limpiando caché de Docker..."
docker builder prune -af
echo "🔨 Construyendo imágenes y levantando servicios..."
docker-compose up --build -d
echo "🚀 Todos los servicios deberían estar levantados:"
echo "🔹 Backend: http://localhost:5002"
echo "🔹 Frontend Web: http://localhost:3000"
echo "🔹 Frontend Móvil (Expo): http://localhost:19006"
echo "🔹 PostgreSQL: puerto 5432"
echo "🔹 pgAdmin: http://localhost:8080 (usuario: admin@icx.com / pass: admin)"
DUP

chmod +x docker-up.sh

echo "✅ Proyecto creado exitosamente. Ejecuta ./docker-up.sh para levantar todos los contenedores."
