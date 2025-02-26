FROM maven:3.9.6-eclipse-temurin-21 AS build

WORKDIR /app

# Copiar el código fuente
COPY . .

# Construir el proyecto sin ejecutar pruebas
RUN mvn clean package 

# Crear la imagen base para la ejecución
FROM openjdk:21-jdk-slim

WORKDIR /app

# Copiar el archivo JAR del contenedor anterior
COPY --from=build /app/target/medium-weekly-0.0.1.jar app.jar

# Exponer el puerto en el que corre la app
EXPOSE 8080

# Ejecutar el JAR
ENTRYPOINT ["java", "-jar", "app.jar"]
