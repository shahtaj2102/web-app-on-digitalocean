# DevOps 05 – Cloud Server Deployment on DigitalOcean

This repository documents the hands-on work for **Module 05 – Cloud & Infrastructure as a Service (IaaS)** using **DigitalOcean**. In this project, a Java + React-style Spring Boot application is built locally, transferred to a **DigitalOcean Droplet**, and run on an Ubuntu Linux server so it can be accessed through a public IP address.[1][2][3]

## Project Overview

The goal of this module is to understand the full deployment flow of an application on a cloud server. That includes provisioning a Linux virtual machine, connecting to it securely with SSH, installing runtime dependencies, copying the application artifact, starting the app, and allowing inbound traffic to the application port through a DigitalOcean firewall rule.[2][4][5]

This README uses **DigitalOcean terminology** throughout. Instead of AWS terms like EC2 instance or Azure VM, the correct DigitalOcean terms are **Droplet**, **region**, **image**, **size**, **Control Panel**, and **Cloud Firewall**.[2][4]


## Prerequisites

Before deploying the application, make sure the following are ready:

- A **DigitalOcean account**.
- A running **Ubuntu Droplet** with a public IPv4 address.[2]
- An **SSH key** added to the Droplet for login access.[5]
- The application project available locally.
- Access to the bootcamp sample application repository.[3]

## Provision the Droplet

Create a new Ubuntu Droplet in the DigitalOcean Control Panel:

1. Sign in to the **DigitalOcean Control Panel**.[2]
2. Click **Create** and select **Droplets**.[2]
3. Choose an Ubuntu **image**.[2]
4. Select a **region** close to your location or target users.[2]
5. Choose a Droplet **size** that fits the project needs.[2]
6. Add your **SSH key** during setup for secure authentication.[5]
7. Finish creation and wait until the Droplet receives a public IP address.[2]

## Install Required Packages

SSH into the Droplet and install Java and Gradle on Ubuntu:

```bash
sudo apt update
sudo apt install openjdk-17-jdk gradle -y
```

Verify the installation:

```bash
java --version
gradle --version
```

Expected output should show **OpenJDK 17** and a working Gradle installation. The exact Gradle version can vary depending on the Ubuntu package repository configured on the server, so it is better not to hardcode one version in advance.

## Build the Application Locally

Clone the bootcamp example project on your local machine:

```bash
git clone https://gitlab.com/twn-devops-bootcamp/latest/05-cloud/java-react-example.git
cd java-react-example
```

Build the application JAR:

```bash
./gradlew build
```

After a successful build, the packaged JAR file is typically created in:

```bash
build/libs/
```

The bootcamp example repository is a Java React example used in the Module 05 cloud section.[3]

## Copy the JAR to the Droplet

From your local machine, copy the JAR file to the DigitalOcean Droplet with `scp`:

```bash
scp -i ~/.ssh/your_private_key build/libs/java-react-example.jar root@your_droplet_ip:/root
```

Replace `your_droplet_ip` with your Droplet's public IP address and replace `~/.ssh/your_private_key` with the path to your private SSH key.

If you use a non-root user instead, adjust the username and destination path accordingly:

```bash
scp -i ~/.ssh/your_private_key build/libs/java-react-example.jar your_username@your_droplet_ip:/home/your_username
```

## Connect to the Droplet

Use SSH to log in:

```bash
ssh -i ~/.ssh/your_private_key root@your_droplet_ip
```

If you are using a regular user account instead of `root`, use:

```bash
ssh -i ~/.ssh/your_private_key your_username@your_droplet_ip
```

DigitalOcean supports SSH-key-based authentication for Droplets, which is the recommended access method.[5]

## Run the Application

After logging in to the Droplet, start the Spring Boot application:

```bash
java -jar java-react-example.jar
```

If the file is in another directory, change into that directory first or provide the full path. When the application starts successfully, Spring Boot should log that Tomcat has started and show the application port.

## Open the Application Port

To make the application reachable from the browser, create an inbound **Cloud Firewall** rule in DigitalOcean for TCP port `7071`. DigitalOcean firewalls let you configure inbound and outbound traffic rules for Droplets.[4][6]

In the DigitalOcean Control Panel, attach a firewall to the Droplet and allow:

- **Protocol:** TCP
- **Port Range:** `7071`
- **Sources:** your preferred source range, such as all IPv4/IPv6 addresses if public access is required.[4][6]

It is also common to allow SSH on port `22` so the server remains accessible for administration.[4][6]

## Access the Application

Once the application is running and the firewall rule is open, access it in your browser using the Droplet's public IP address and application port:

```text
http://your_droplet_ip:7071
```

If the app exposes a specific endpoint, append that path to the URL.

## Deployment Flow Summary

1. Create an Ubuntu **Droplet** on DigitalOcean.[2]
2. Add an **SSH key** and connect securely.[5]
3. Install Java and Gradle on the server.
4. Build the Spring Boot application locally.
5. Copy the JAR file to the Droplet with `scp`.
6. Run the application with `java -jar`.
7. Open port `7071` in a DigitalOcean **Cloud Firewall**.[4][6]
8. Access the app from the browser using the Droplet IP and port.

## Learning Outcomes

This project helps reinforce several core DevOps and cloud concepts:

- provisioning infrastructure on a cloud provider as a service model.[1][2]
- working with Linux servers remotely over SSH.[5]
- building and packaging a Java application with Gradle.
- transferring deployment artifacts securely to a server.
- exposing an application through a firewall-controlled network port on DigitalOcean.[4][6]

## Notes

- This README intentionally uses **DigitalOcean-specific terminology** instead of Azure or AWS wording.[2]
- Replace placeholder values such as `your_droplet_ip`, `your_username`, and `~/.ssh/your_private_key` with your real deployment details.
- If your app runs on a different port, update the firewall rule and browser URL to match that port.[4]

