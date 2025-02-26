FROM openjdk:21-jdk-slim
RUN mvn clean package -DskipTests 
ARG JAR_FILE=target/medium-weekly-0.0.1.jar
COPY ${JAR_FILE} app_medium-weekly
EXPOSE 8080
ENTRYPOINT ["java","-jar","app_medium-weekly.jar"]