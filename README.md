# DevOps 05 – Cloud Server Deployment (Linux + Java + React‑style app)

This repository documents the hands‑on work for **Module 05 – Cloud deployment**, in which a Java + React‑style Spring Boot application is built locally, deployed to a Linux cloud server, and made accessible on a public URL.

## 1. Install required packages

On the cloud server (Ubuntu):

```bash
sudo apt update
sudo apt install openjdk-17-jdk gradle -y
```

Verify Java and Gradle:

```bash
java --version
gradle --version
```

Expected output includes:
- OpenJDK 17 (e.g., `openjdk 17.0.18 ...`)
- Gradle 4.4.1 (or similar, depending on your APT repo)


## 2. Build the application locally

1. Clone the student example project:

```bash
git clone https://gitlab.com/twn-devops-bootcamp/latest/05-cloud/java-react-example
cd java-react-example
```

2. Build the JAR:

```bash
./gradlew build
```

This produces a Spring Boot JAR (e.g., `build/libs/java-react-example.jar`).


## 3. Copy the JAR to the cloud server

From your local machine, copy the JAR file to the cloud Linux server:

```bash
scp -i linuxe00_key.pem build/libs/java-react-example.jar azuser@20.102.80.25:/home/azuser
```

Replace `20.102.80.25` with your actual public IP, and adjust the path if needed.


## 4. Run the application on the cloud server

1. SSH into the server as `azuser`:

```bash
ssh -i linuxe00_key.pem azuser@20.102.80.25
```

2. Start the Spring Boot app:

```bash
java -jar java-react-example.jar
```

Expected output from Spring Boot:
- `Tomcat started on port 7071 (http)`
- `Started Application in ...`


## 5. Open the app endpoint

1. Ensure port `7071` is open in your cloud provider’s firewall/security group (if using Azure, AWS, or DigitalOcean‑style provider).

2. Access the app in your browser:


