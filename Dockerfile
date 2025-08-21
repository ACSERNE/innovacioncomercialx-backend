# Imagen base Node.js (última disponible)
FROM node:latest

# Establece directorio de trabajo
WORKDIR /app

# Copia package.json y package-lock.json primero (para cache de dependencias)
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia todo el proyecto
COPY . .

# Descarga wait-for-it.sh y le da permisos
RUN curl -o wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh && \
    chmod +x wait-for-it.sh

# Crea script start.sh
RUN echo '#!/bin/bash\n./wait-for-it.sh postgres-innovacion:5432 --timeout=30 --strict -- echo "✅ Postgres está disponible, arrancando backend..."\nnode server.cjs' > start.sh && \
    chmod +x start.sh

# Expone el puerto del backend
EXPOSE 5002

# Comando por defecto
CMD ["./start.sh"]
