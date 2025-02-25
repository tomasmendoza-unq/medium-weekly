FROM openjdk:22-jdk-slim
ARG JAR_FILE=target/medium-weekly-0.0.1.jar
COPY ${JAR_FILE} app_medium.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app_medium"]