# DevOps 05 – Cloud Server Deployment on DigitalOcean

This repository documents the hands-on work for **Module 05 – Cloud & Infrastructure as a Service (IaaS)** using **DigitalOcean**. In this project, a Java + React-style application is built locally, transferred to a **DigitalOcean Droplet**, and run on an Ubuntu Linux server so it can be accessed through a public IP address.

## Project Overview

The goal of this module is to understand the full deployment flow of an application on a cloud server. That includes provisioning a Linux virtual machine, connecting to it securely with SSH, installing runtime dependencies, copying the application artifact, starting the app, and allowing inbound traffic to the application port through a DigitalOcean firewall rule.

## Prerequisites

Before deploying the application, make sure the following are ready:

- A **DigitalOcean account**.

## Steps to complete

- Run an **Ubuntu Droplet** with a public IPv4 address.
- Add an **SSH key** to the Droplet for login access.
- Package the application project available locally.
- Copy the project to the **Ububtu Droplet**.
- Run the project and access it in browser.

## Provision the Droplet

Create a new Ubuntu Droplet in DigitalOcean:

1. Sign in to the **DigitalOcean Control Panel**.
2. Click **Create** and select **Droplets**.
3. Choose an Ubuntu **image**.
4. Select a **region** close to your location or target users.
5. Choose a Droplet **size** that fits the project needs.
6. Add your **SSH key** during setup for secure authentication.  
To create a SSH Key  
These steps can be used to create your SSH Key for Linux, Windows or add to our **Ubuntu Droplet** server.
```bash
# On windows

# This is to start the ssh-agent so it can remember our private key & also remember the passphrase if we set any.
Start-Service ssh-agent

# This is to set the ssh-agent to start in the background everytime we log into our computer.
Set-Service -Name ssh-agent -StartupType 'Automatic'

# You will be prompted a passphrase. Enter twice or skip entirely.
ssh-keygen -C "shahtaj@windows"

#run this to read/display file (public key) in the cmd terminal to be able to copy it.
cat ~/.ssh/id_ed25519.pub
```  
  For linux and mac
```bash
# You will be prompted a passphrase. Enter twice or skip entirely.
ssh-keygen -C "shahtaj@linux"

#run this to read/display file (public key) in the terminal to be able to copy it.
cat ~/.ssh/id_ed25519.pub

```
7. Copy this ssh key and paste it in the ssh key box promt. (this will save the public key on Digital ocean permanently.)
8. Finish creation and wait until the Droplet receives a public IP address.
9. Create a firewall by going in the network tab with only port 22 (default port for ssh) open for ssh.
10. The firewall will be created for the whole system, we will need to add our droplet to it.

## SSH into our droplet

Now that the droplet is ready we will ssh into the droplet from our local system.  

1. Copy the Droplets Public IPV4 address from it's details/home page.
2. On the local system run
```bash
ssh root@YOUR_DROPLET_PUBLIC_IP
```


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

