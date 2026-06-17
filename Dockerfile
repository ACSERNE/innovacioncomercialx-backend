# Imagen base
FROM node:22

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar package.json e instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar todo el proyecto
COPY . .

# Exponer puerto del backend
EXPOSE 5002

# Comando de inicio: tu backend REAL
CMD ["node", "app.js"]
