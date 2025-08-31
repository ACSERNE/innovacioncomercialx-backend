# ==========================
# Etapa de desarrollo (Dev)
# ==========================
FROM node:20-alpine AS dev
WORKDIR /app

# Instala dependencias
COPY package*.json ./
RUN npm install

# Copia código fuente
COPY . .

# Comando por defecto para desarrollo Expo
CMD ["npm", "start"]

# ==========================
# Etapa de producción (Build Web - Prod)
# ==========================
FROM node:20-alpine AS prod
WORKDIR /app

# Instala dependencias
COPY package*.json ./
RUN npm install --production

# Copia código fuente
COPY . .

# Genera build web (si tu proyecto usa expo build:web)
RUN npm run build

# Servir build con Nginx
FROM nginx:alpine
COPY --from=prod /app/web-build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
