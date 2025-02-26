# Etapa 1: Construcción de la aplicación
FROM node:18-alpine AS build

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias
COPY package.json package-lock.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Construye la aplicación
RUN npm run build

# Etapa 2: Servir los archivos estáticos con Nginx
FROM nginx:alpine

# Copia los archivos de construcción desde la etapa anterior
COPY --from=build /app/dist /usr/share/nginx/html

# Expone el puerto 80 (puerto predeterminado de Nginx)
EXPOSE 80

# Inicia Nginx
CMD ["nginx", "-g", "daemon off;"]