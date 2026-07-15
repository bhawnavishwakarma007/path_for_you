# Path4You — Production-Ready Three-Tier App on Amazon EKS

> A React + Node.js + MySQL application deployed on Amazon EKS with a full GitOps, monitoring, and security stack.

![AWS](https://img.shields.io/badge/AWS-EKS-orange?logo=amazonaws)
![Kubernetes](https://img.shields.io/badge/Kubernetes-1.31-blue?logo=kubernetes)
![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?logo=docker)
![ArgoCD](https://img.shields.io/badge/GitOps-ArgoCD-EF7B4D?logo=argo)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

---

## Table of Contents

- [Path4You — Production-Ready Three-Tier App on Amazon EKS](#path4you--production-ready-three-tier-app-on-amazon-eks)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Architecture](#architecture)
  - [Tech Stack](#tech-stack)
  - [Project Structure](#project-structure)
  - [Prerequisites](#prerequisites)
  - [Getting Started](#getting-started)
    - [1. Prepare the Repository](#1-prepare-the-repository)
    - [2. Run Locally with Docker Compose](#2-run-locally-with-docker-compose)
    - [3. Push Images to Amazon ECR](#3-push-images-to-amazon-ecr)
    - [4. Provision the EKS Cluster](#4-provision-the-eks-cluster)
    - [5. Configure IRSA (OIDC)](#5-configure-irsa-oidc)
    - [6. Deploy Kubernetes Manifests](#6-deploy-kubernetes-manifests)
    - [7. Install the AWS Load Balancer Controller](#7-install-the-aws-load-balancer-controller)
    - [8. Connect to Amazon RDS](#8-connect-to-amazon-rds)
    - [9. Set Up CI/CD](#9-set-up-cicd)
    - [10. Enable Monitoring \& Autoscaling](#10-enable-monitoring--autoscaling)
  - [Security](#security)
  - [AWS Services Used](#aws-services-used)
  - [Recommended Learning Path](#recommended-learning-path)
  - [Roadmap](#roadmap)

---

## Overview

**Path4You** is a three-tier web application (React frontend, Node.js backend, MySQL database) packaged for a full production-style deployment on **Amazon EKS**. The project demonstrates an end-to-end cloud-native workflow: containerization, image scanning, GitOps-driven delivery, autoscaling, observability, and AWS-native secrets management.

## Architecture

```
                                    GitHub
                                       │
                               GitHub Actions
                                       │
                    Build Docker Images + Run Tests
                                       │
                               Trivy Image Scan
                                       │
                                       ▼
                                  Amazon ECR
                                       │
                                       ▼
                               ArgoCD (GitOps)
                                       │
                                       ▼
┌──────────────────────────────────────────────────────────────────────┐
│                          Amazon EKS Cluster                          │
│                                                                       │
│   AWS Load Balancer Controller → Internet-facing ALB                │
│                        │                                             │
│                 Kubernetes Ingress                                   │
│                        │                                             │
│           Frontend Service (ClusterIP)                              │
│                        │                                             │
│           Frontend Deployment (React)                               │
│                        │                                             │
│                        ▼                                             │
│           Backend Service (ClusterIP)                                │
│                        │                                             │
│           Backend Deployment (Node.js)                               │
│                        │                                             │
└────────────────────────┼──────────────────────────────────────────┘
                          ▼
                Amazon RDS MySQL (Private)
```

**Cross-cutting concerns:**

| Concern | Tooling |
|---|---|
| Monitoring | CloudWatch Container Insights, Prometheus, Grafana |
| Logging | Fluent Bit → CloudWatch Logs |
| Security | IRSA, AWS Secrets Manager / SSM Parameter Store, ACM, Route 53, AWS WAF |

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, served via Nginx |
| Backend | Node.js |
| Database | Amazon RDS (MySQL) |
| Container Registry | Amazon ECR |
| Orchestration | Amazon EKS (Kubernetes 1.31) |
| GitOps / CD | ArgoCD |
| CI | GitHub Actions + Trivy |
| Ingress | AWS Load Balancer Controller |
| Observability | Prometheus, Grafana, CloudWatch, Fluent Bit |

## Project Structure

```
path4you-devops/
├── backend/               # Node.js API + Dockerfile
├── frontend/              # React app + Nginx + Dockerfile
├── docker-compose.yml     # Local dev environment
├── k8s/
│   ├── namespace/
│   ├── configmap/
│   ├── secret/
│   ├── backend/
│   ├── frontend/
│   ├── ingress/
│   └── hpa/
├── docs/
└── .github/
    └── workflows/         # CI/CD pipeline
```

## Prerequisites

- An AWS account with sufficient permissions (EKS, EC2, ECR, IAM, VPC, RDS)
- **An EC2 instance to use as a management/bastion host** — all `aws`, `kubectl`, `eksctl`, and `helm` commands below are run from here rather than your laptop, so the cluster tooling and IAM role stay in one controlled place
- `aws` CLI, configured (`aws sts get-caller-identity` should succeed)
- `kubectl`, `eksctl`, `helm` installed
- Docker installed locally
- An existing Amazon RDS MySQL instance (or create one before Phase 8)
- A GitHub repository for source + a GitOps repository for manifests

> **Note:** Steps 3–7 below assume you're logged into that EC2 management instance via SSH. Docker builds in Step 2 can be done either on the EC2 instance or on your local machine — just make sure whichever host you build on can also authenticate to ECR.

---

## Getting Started

### 1. Prepare the Repository

Reorganize the existing project into the deployment-ready layout shown above:

```
path_for_you/          →      path4you-devops/
  node/                          backend/
  react/                         frontend/
```

### 2. Run Locally with Docker Compose

**Backend — `backend/Dockerfile`:**

```dockerfile
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 5000
CMD ["node","server.js"]
```

**Backend — `backend/.dockerignore`:**

```
node_modules
.git
.env
npm-debug.log
```

**Frontend — `frontend/Dockerfile`:**

```dockerfile
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
```

**Frontend — `frontend/nginx.conf`:**

```nginx
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri /index.html;
    }

    location /api {
        proxy_pass http://backend-service:5000;
    }
}
```

**`docker-compose.yml`:**

```yaml
version: "3.9"

services:
  backend:
    build: ./backend
    container_name: backend
    env_file:
      - ./backend/.env
    ports:
      - "5000:5000"

  frontend:
    build: ./frontend
    container_name: frontend
    ports:
      - "80:80"
    depends_on:
      - backend
```

Run and verify:

```bash
docker compose up -d
curl localhost:5000/health
```

### 3. Push Images to Amazon ECR

Create two repositories: `path4you-backend` and `path4you-frontend`.

```bash
# Authenticate
aws ecr get-login-password \
  | docker login --username AWS --password-stdin ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com

# Tag
docker tag path4you-backend  ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/path4you-backend:v1
docker tag path4you-frontend ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/path4you-frontend:v1

# Push
docker push ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/path4you-backend:v1
docker push ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/path4you-frontend:v1
```

### 4. Provision the EKS Cluster

<details>
<summary><strong>Step-by-step setup (click to expand)</strong></summary>

**a. Attach an IAM role to your management EC2 instance**

Console → **EC2** → select instance → **Actions → Security → Modify IAM role**. Attach:

- `AmazonEKSClusterPolicy`
- `AmazonEKSWorkerNodePolicy`
- `AmazonEC2ContainerRegistryFullAccess`
- `AmazonVPCFullAccess`
- `IAMFullAccess`
- `AmazonEC2FullAccess`

> For a learning project, some people temporarily use `AdministratorAccess` and scope it down later.

Verify:

```bash
aws sts get-caller-identity
```

**b. Install kubectl**

```bash
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
chmod +x kubectl
sudo mv kubectl /usr/local/bin/
kubectl version --client
```

**c. Install eksctl**

```bash
curl --silent --location \
  "https://github.com/weaveworks/eksctl/releases/latest/download/eksctl_$(uname -s)_amd64.tar.gz" \
  | tar xz -C /tmp
sudo mv /tmp/eksctl /usr/local/bin
eksctl version
```

**d. Install Helm**

```bash
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
helm version
```

**e. Create the cluster**

```bash
eksctl create cluster \
  --name path4you-cluster \
  --region us-east-1 \
  --version 1.31 \
  --nodegroup-name workers \
  --node-type t3.medium \
  --nodes 2 \
  --nodes-min 2 \
  --nodes-max 4 \
  --managed
```

This provisions the control plane, VPC (if needed), public/private subnets, security groups, managed node group, IAM roles, and CloudFormation stacks. Expect **15–25 minutes**.

**f. Configure kubectl and verify**

```bash
aws eks update-kubeconfig --region us-east-1 --name path4you-cluster

kubectl get nodes
kubectl get pods -A
```

</details>

### 5. Configure IRSA (OIDC)

IRSA (**IAM Roles for Service Accounts**) lets individual pods assume scoped IAM roles instead of inheriting the node's full permissions — a least-privilege pattern.

```
Without IRSA:  Pod → EC2 node IAM role → every pod shares the same permissions
With IRSA:     Pod → Kubernetes Service Account → dedicated IAM Role → AWS Services
```

**Option A — CLI:**

```bash
eksctl utils associate-iam-oidc-provider \
  --cluster path4you-cluster \
  --region us-east-1 \
  --approve
```

**Option B — Console:**

1. **EKS → path4you-cluster → Overview → Details** — copy the OpenID Connect provider URL.
2. **IAM → Identity providers → Add provider**
   - Provider type: `OpenID Connect`
   - Provider URL: *(paste the URL)*
   - Audience: `sts.amazonaws.com`

**Verify either method:**

```bash
aws eks describe-cluster \
  --name path4you-cluster \
  --query "cluster.identity.oidc.issuer"
```

Compare the returned issuer URL against the entry under **IAM → Identity providers**.

### 6. Deploy Kubernetes Manifests

**Namespace** (`k8s/namespace/namespace.yaml`):

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: path4you
```

**ConfigMap** (`k8s/configmap/`):

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: backend-config
  namespace: path4you
data:
  PORT: "5000"
  DBHOST: database-xxxxxxxx.us-east-1.rds.amazonaws.com
  DBUSER: admin
  DBNAME: path4you
```

**Secret** (`k8s/secret/`) — replace with AWS Secrets Manager / SSM later:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: backend-secret
  namespace: path4you
type: Opaque
stringData:
  DBPASS: yourpassword
  JWT_SECRET: your-secret
```

**Backend Deployment** (`k8s/backend/`):
- 2 replicas · image from ECR · port `5000`
- Env vars sourced from the ConfigMap and Secret
- Readiness/liveness probes on `/health`
- ClusterIP service: `backend-service`

**Frontend Deployment** (`k8s/frontend/`):
- 2 replicas · image from ECR · port `80`
- ClusterIP service: `frontend-service`
- Nginx proxies `/api` → `backend-service:5000`

Apply everything:

```bash
kubectl apply -f k8s/namespace/
kubectl apply -f k8s/configmap/
kubectl apply -f k8s/secret/
kubectl apply -f k8s/backend/
kubectl apply -f k8s/frontend/
```

### 7. Install the AWS Load Balancer Controller

1. Create an IRSA role bound to the required IAM policy.
2. Install the controller via Helm into the cluster.
3. Create an **Ingress** (`k8s/ingress/`) using the ALB ingress class that routes `/` to `frontend-service` — the frontend forwards `/api` traffic to the backend.

```bash
kubectl apply -f k8s/ingress/
```

### 8. Connect to Amazon RDS

No MySQL pod runs in-cluster — backend pods connect directly to an existing RDS instance.

```
EKS Node Security Group  ──TCP 3306──▶  RDS Security Group
```

The backend reads `DBHOST`, `DBUSER`, `DBPASS`, and `DBNAME` from the ConfigMap/Secret (or later, AWS Secrets Manager).

### 9. Set Up CI/CD

**GitHub Actions pipeline:**

1. Checkout code
2. Install dependencies
3. Run tests
4. Build backend & frontend images
5. Scan images with Trivy
6. Push images to Amazon ECR
7. Update image tags in the GitOps repository
8. ArgoCD syncs the change to the cluster

**ArgoCD** watches the GitOps repo and reconciles the cluster automatically — no manual `kubectl apply` needed after initial setup:

```
GitHub → ArgoCD → Amazon EKS
```

### 10. Enable Monitoring & Autoscaling

**Observability:**

```bash
# Install via Helm — Prometheus, Grafana, Fluent Bit
# Enable CloudWatch Container Insights on the cluster
```

**Autoscaling:**

- Horizontal Pod Autoscaler (HPA) for frontend and backend
- Cluster Autoscaler or Karpenter for worker-node scaling

---

## Security

| Control | Purpose |
|---|---|
| IRSA | Least-privilege IAM access per pod |
| AWS Secrets Manager / SSM | Centralized, rotatable secrets |
| AWS WAF | Layer-7 protection on the ALB |
| ACM | TLS certificates |
| Route 53 | DNS management |
| Network Policies *(optional)* | Pod-to-pod traffic restrictions |
| Pod Security Standards | Baseline pod hardening |

## AWS Services Used

<details>
<summary>Full service list</summary>

**Networking:** VPC, Public/Private Subnets, Internet Gateway, NAT Gateway, Route Tables, Security Groups

**Compute & Containers:** EC2 (optional bastion), Amazon ECR, Amazon EKS, Managed Node Groups

**Database:** Amazon RDS (MySQL)

**Identity & Security:** IAM, IRSA, AWS Secrets Manager / SSM Parameter Store, AWS KMS *(optional)*, AWS WAF, ACM

**Load Balancing & DNS:** Application Load Balancer, AWS Load Balancer Controller, Route 53

**CI/CD:** GitHub Actions, ArgoCD

**Monitoring & Logging:** CloudWatch, CloudWatch Container Insights, Fluent Bit, Prometheus, Grafana

**Optional Enhancements:** Amazon EFS, Karpenter, ExternalDNS, Velero, AWS X-Ray / OpenTelemetry

</details>

## Recommended Learning Path

Build this incrementally rather than all at once:

1. **Dockerize** the app and verify it locally with Docker Compose.
2. **Push images** to Amazon ECR.
3. **Create the EKS cluster** and deploy via Kubernetes manifests, connecting to your existing RDS database.
4. **Add** the AWS Load Balancer Controller and Ingress.
5. **Layer in** GitHub Actions, ArgoCD, monitoring, autoscaling, and AWS-native secrets management.

## Roadmap

- [ ] Migrate secrets to AWS Secrets Manager / SSM
- [ ] Add Network Policies
- [ ] Add Karpenter for node autoscaling
- [ ] Add ExternalDNS + Velero backups
- [ ] Add OpenTelemetry tracing
