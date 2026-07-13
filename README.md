# Appendix: Manual Deployment Runbook

Working notes for running and deploying the project manually from VS Code / EC2, kept here for reference during setup and troubleshooting.

## Table of Contents

- [Appendix: Manual Deployment Runbook](#appendix-manual-deployment-runbook)
  - [Table of Contents](#table-of-contents)
  - [Backend Deployment](#backend-deployment)
  - [Frontend Deployment](#frontend-deployment)

---

## Backend Deployment

```
GitHub → EC2 → PM2 → Nginx → Internal ALB
```

The backend EC2 instance remains private and only receives traffic from the Internal ALB, exactly as in the architecture above.

<details>
<summary><strong>Phase 1 — Install Required Software</strong></summary>

```bash
cd ~/path_for_you/node

# Update packages
dnf update -y

# Install Node.js 22
curl -fsSL https://rpm.nodesource.com/setup_22.x | bash -
dnf install -y nodejs

# Verify
node -v
npm -v

# Install PM2
npm install -g pm2
pm2 -v
```

</details>

<details>
<summary><strong>Phase 2 — Install Project Dependencies</strong></summary>

```bash
cd ~/path_for_you/node
npm install

# If new packages were added:
npm install helmet compression morgan cors dotenv
```

</details>

<details>
<summary><strong>Phase 3 — Configure Environment Variables</strong></summary>

```bash
vi .env
```

Example contents:

```env
PORT=5000
DBHOST=<RDS Endpoint>
DBUSER=admin
DBPASS=<database password>
DBNAME=path4you
FRONTEND_URL=https://your-domain.com
JWT_SECRET=<jwt secret>
JWT_EXPIRES=7d
```

Save with: `Ctrl+O` → `Enter` → `Ctrl+X`

> ⚠️ Never commit a populated `.env` file. Keep real credentials out of version control and rotate any secret that has ever been exposed.

</details>

<details>
<summary><strong>Phase 4 — Test Database Connection</strong></summary>

```bash
dnf install mariadb105 -y
mysql --version

#move to path_for_you
cd ..

# Connect and load schema (use your own RDS endpoint & credentials)
mysql -h <rds-endpoint> -u admin -p<database-password> < path_for_you.sql

# Start the server
node server.js
```

Expected output:

```
Database Connected
Server running on port 5000
```

Test locally:

```bash
curl http://localhost:5000/health
```

Expected response:

```json
{
  "status": "UP"
}
```

**Freeing port 5000 if it's already in use**

```bash
# Find what's using the port
sudo lsof -i :5000
# or
sudo ss -tulpn | grep 5000

# Kill the process
kill -9 <PID>
# or kill all Node processes:
pkill node
```

</details>

<details>
<summary><strong>Phase 5 — Run with PM2</strong></summary>

```bash
# Stop any running node process first, then:
pm2 start server.js --name path4you-api

pm2 status
pm2 logs path4you-api
pm2 restart path4you-api
pm2 stop path4you-api
```

</details>

<details>
<summary><strong>Phase 6 — Enable PM2 on Reboot</strong></summary>

```bash
pm2 startup
# copy & run the printed command, e.g.:
sudo env PATH=... pm2 startup systemd ...

pm2 save
pm2 start server.js --name path4you-api
```

The application now starts automatically after an EC2 reboot.

</details>

<details>
<summary><strong>Phase 8 — Configure Nginx Reverse Proxy (Backend)</strong></summary>

```bash
sudo dnf install nginx -y
sudo systemctl enable nginx
sudo systemctl start nginx
```

Open the config file:

```bash
sudo vi /etc/nginx/nginx.conf
```

Replace the default server block with:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name _;

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
nginx -t
systemctl reload nginx
```

</details>

<details>
<summary><strong>Phase 9 — Test Nginx</strong></summary>

Instead of `localhost:5000`, use:

```bash
curl http://localhost/health
```

```json
{
  "status": "UP"
}
```

At this point: `Nginx → localhost:5000 → Node.js`

</details>

**Progress checklist**

- [x] VPC
- [x] Public & Private Subnets
- [x] NAT Gateway
- [x] Bastion Host
- [x] Backend EC2
- [x] RDS
- [x] Backend Deployment
- [x] PM2
- [x] Nginx Reverse Proxy
- [x] Backend running

## Frontend Deployment

**Final frontend architecture**

```
Internet
  ↓
Public ALB
  ↓
Frontend EC2
  ↓
Nginx
  ↓
React Build
  ↓
Internal Backend ALB
  ↓
Backend EC2
  ↓
RDS
```

<details>
<summary><strong>Step 1 — Launch Frontend EC2</strong></summary>

Configuration:

- Amazon Linux 2023
- t2.micro
- Private Subnet
- IAM Role
- Security Group (below)

| Port | Source        |
|------|----------------|
| 22   | Bastion SG     |
| 80   | Public ALB SG  |

> Do not allow direct internet access to this instance.

</details>

<details>
<summary><strong>Step 2 — Connect from Bastion</strong></summary>

```bash
ssh -i key.pem ec2-user@PRIVATE_IP
# or use EC2 Instance Connect if enabled
```

</details>

<details>
<summary><strong>Step 3 — Clone Repository</strong></summary>

```bash
sudo dnf install git -y
git clone https://github.com/your-repo.git
cd path_for_you/react
```

</details>

<details>
<summary><strong>Step 4 — Install Node.js</strong></summary>

```bash
curl -fsSL https://rpm.nodesource.com/setup_22.x | bash -
sudo dnf install nodejs -y
node -v
npm -v
```

</details>

<details>
<summary><strong>Step 5 — Install Packages</strong></summary>

```bash
npm install
```

</details>

<details>
<summary><strong>Step 6 — Configure React Environment</strong></summary>

```bash
vi .env
```

Example:

```env
VITE_API_URL=/api
```

</details>

<details>
<summary><strong>Step 7 — Build React</strong></summary>

```bash
npm run build
# produces dist/
```

</details>

<details>
<summary><strong>Step 8 — Install Nginx</strong></summary>

```bash
sudo dnf install nginx -y
sudo systemctl enable nginx
sudo systemctl start nginx
```

</details>

<details>
<summary><strong>Step 9 — Copy Build Files</strong></summary>

```bash
sudo rm -rf /usr/share/nginx/html/*
sudo cp -r dist/* /usr/share/nginx/html/
```

</details>

<details>
<summary><strong>Phase 8 — Configure Nginx Reverse Proxy (Frontend)</strong></summary>

Open the config file:

```bash
sudo vi /etc/nginx/nginx.conf
```

Replace the default server block with:

```nginx
server {
    listen 80;
    server_name _;

    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri /index.html;
    }

    location /api/ {
        proxy_pass http://internal-backendlb-1276012106.us-east-1.elb.amazonaws.com;

        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
sudo nginx -t
sudo systemctl reload nginx
```

</details>

<details>
<summary><strong>Step 11 — Verify</strong></summary>

```bash
curl localhost
# should return <!DOCTYPE html>
```

</details>

<details>
<summary><strong>Step 12 — Public ALB</strong></summary>

- Internet-facing
- Listener: 80
- Target Group: Frontend EC2
- Health Check: `/`

Register the Frontend EC2 instance to the target group.

</details>

<details>
<summary><strong>Step 13 — Test</strong></summary>

Open the public ALB DNS name in a browser:

```
http://PUBLIC-ALB-DNS
```

The React application should load.

</details>
