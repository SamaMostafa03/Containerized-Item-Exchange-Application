# Containerized Item Exchange Application – Full DevOps Deployment:

- This project implements a complete, production-grade DevOps pipeline for deploying a full-stack Item Exchange Application using AWS, Docker, Kubernetes (K3s), Traefik, Jenkins CI/CD, and AWS RDS.

- It demonstrates the full DevOps lifecycle including containerization, orchestration, cluster deployment, automation, CI/CD, and cloud infrastructure provisioning.

## Architecture Design
![Arch](https://github.com/SamaMostafa03/Containerized-Item-Exchange-Application/blob/main/Images/Arch.png?raw=true)

## **Architecture Overview** 

This Repo explains how the **Item Exchange App** is deployed using: 
- **Docker (containerizing backend + frontend)**
- **Container Registry (AWS ECR)**
- **Infrastructure (AWS EC2 + RDS)**
- **Orchestration (K3s Kubernetes cluster)**
- **Ingress (Traefik)**
- **CI/CD (Jenkins Pipeline)**
- **Automated Deployments to K3s**


## **1. Containerization** 
Both the frontend and backend services were containerized using:
- Dockerfile.frontend → Builds React app, Serves using Nginx
- Dockerfile.backend → Installs Node.js dependencies, Runs Express + Socket.io server

Each image is built and pushed to AWS ECR

## **2. AWS ECR** 
Two public ECR repositories were created:
- jack-frontend
- jack-backend

Jenkins automatically pushes new images on every build.
## **3. EC2 Infrastructure** 
Three EC2 instances were created:
| Purpose | Description |
|-------|-------------|
| **K3s Cluster Node** | Runs K3s Kubernetes and hosts the entire application. |
| **Jenkins Controller** | Orchestrates CI/CD pipeline execution. |
| **Jenkins Worker Node** | Runs Docker builds and kubectl deployments. |

All EC2 instances run Ubuntu 22.04.

## **4. RDS Setup** 
An AWS RDS PostgreSQL instance was created.
- Private subnet
- Security group allows traffic only from backend pod
- The backend connects using the DATABASE_URL environment variable injected in Kubernetes
## **5. Kubernetes Deployment (K3s)** 
A lightweight production-grade K3s cluster was installed

Kubernetes components used:
- Deployments (frontend + backend)
- Services (ClusterIP)
- Namespace
- ConfigMap
- Traefik Ingress

The application becomes available at: http://16.170.173.4

## **6. Jenkins CI/CD Pipeline** 

Architecture: 
- Jenkins Controller → Manages jobs
- Jenkins Worker → Builds Docker, pushes images, deploys to K3s

Pipeline stages:

- Checkout GitHub repo
- Log in to ECR Public
- Build frontend image
- Build backend image
- Push both images
- Deploy to K3s using

## **Team Members Infrastructure Automation & DevOps Enhancements**
  - [Ahmed Elshewemy](https://github.com/AhmedElshewemy)
  - [Sama Mostafa](https://github.com/SamaMostafa03/)


## **Team Members backend & frontend**
- [Muhammad Abdulhadi](https://github.com/Mu7ammadAbed)
- [Sara Dahman](https://github.com/SaraDahman)
- [Mohammed Balousha](https://github.com/MohammedOmar123)
- [Abdalhakim Abumusameh](https://github.com/hkmusameh01)
