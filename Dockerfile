# Build stage
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Run stage
FROM tomcat:10.1-jdk21-temurin-noble
# Remove default Tomcat apps
RUN rm -rf /usr/local/tomcat/webapps/*
# Copy the built WAR file to Tomcat webapps
COPY --from=build /app/target/igishyitsi.war /usr/local/tomcat/webapps/ROOT.war

EXPOSE 8080
CMD ["catalina.sh", "run"]
