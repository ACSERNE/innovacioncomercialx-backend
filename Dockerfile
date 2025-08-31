# Stage 1: Instala dependencias y genera build web
FROM node:20-alpine AS builder

WORKDIR /app

# Copia archivos del proyecto
COPY package*.json ./
COPY . .

# Instala todas las dependencias (incluye devDependencies)
RUN npm install

# Genera el build web con Expo
RUN npm run build || npm run export:web

# Stage 2: Servir con Nginx
FROM nginx:alpine

# Copia el build generado al directorio público de Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copia configuración personalizada de Nginx si existe
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
