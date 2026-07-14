# TROUBLESHOOTING.md

# Path4You -- Deployment Troubleshooting Guide

This document records the complete deployment issues encountered while
deploying the production-style three-tier application on AWS and how
each issue was diagnosed and resolved.

## Architecture

Browser → Frontend ALB → Frontend EC2 (Nginx + React) → Internal Backend
ALB → Backend EC2 (Node.js + PM2 + Nginx) → Amazon RDS MySQL

------------------------------------------------------------------------

## Error 1 -- Unable to Import MySQL Database

**Symptoms** - SQL import failed. - Tables were missing.
        
The error:

    ERROR 1146 (42S02): Table 'path_for_you.Jobs' doesn't exist

means MySQL successfully connected to your RDS instance, but when it reached line 121 of path_for_you.sql, it tried to insert into a table named Jobs, and that table does not exist in the path_for_you database.

**Root Cause** - Wrong import syntax.
``` sql
-- Create the Jobs Table
CREATE TABLE Jobs (
    job_id INT PRIMARY KEY AUTO_INCREMENT,
    jobtitle VARCHAR(100) NOT NULL,
    description TEXT,
    ...
);

drop table Jobs;    --Table was Droping after creating
```

**Fix**

Removed the `drop table Jobs;` line from the SQL file.

``` sql
-- Create the Jobs Table
CREATE TABLE Jobs (
    job_id INT PRIMARY KEY AUTO_INCREMENT,
    jobtitle VARCHAR(100) NOT NULL,
    description TEXT,
    ...
);

mysql -h <RDS-ENDPOINT> -u admin -ppath4you < path_for_you.sql
```

**Verification**

``` sql
SHOW TABLES;
```

------------------------------------------------------------------------

## Error 2 -- Node Module Not Found

**Symptoms**

The error:

    Error: Cannot find module './routes/p&r/AuthRoutes'

means Node.js cannot find the file you're trying to import. This is usually one of these issues:

- The folder name is wrong.
- The file name is wrong (case-sensitive on Linux).
- The file doesn't exist.
- The require() path is incorrect.


**Root Cause** - Linux file system is case-sensitive.

local Windows project has:
``` bash
routes/
└── p&r/
    ├── authRoutes.js
    ├── JobApplyRoutes.js
    └── jobRoutes.js
```
    In app.js	        Actual file
    jobApplyRoutes	    JobApplyRoutes.js
    AuthRoutes.js	    authRoutes.js


The file name is wrong (case-sensitive on Linux).
``` js
const authRoutes = require("./routes/p&r/AuthRoutes");
const jobRoutes = require("./routes/p&r/jobRoutes");
const jobApplyRoutes = require("./routes/p&r/jobApplyRoutes");
```

**Fix** - Corrected filenames and import paths. - Ensured Git preserved
filename case.
``` bash
routes/
└── p&r/
    ├── authRoutes.js
    ├── JobApplyRoutes.js
    └── jobRoutes.js
``` 
### Step 1: Check your app.js

Open it:
``` bash
vi app.js
```
Look around line 11. You'll probably have something like:
```js
const authRoutes = require('./routes/p&r/AuthRoutes');
```
### Step 2: Verify the actual folder name

Run:

``` bash
ls -R routes
```
Example outputs:

Case 1
``` bash
routes/
   p&r/
      AuthRoutes.js
```
Then your import is correct.

Case 2
``` bash
routes/
   pnr/
      AuthRoutes.js
```
Then change:
```js
require('./routes/p&r/AuthRoutes')
```
to
```js
require('./routes/pnr/AuthRoutes')
```
Case 3
``` bash
routes/
   P&R/
      AuthRoutes.js
```
Linux is case-sensitive.
```js
require('./routes/P&R/AuthRoutes')
```
must match exactly.

Case 4
``` bash
routes/
   p&r/
      authRoutes.js
```
Then use 
```js
require('./routes/p&r/authRoutes')
```
------------------------------------------------------------------------

## Error 3 -- Controller Module Not Found

**Symptoms**

    Cannot find module '../../controllers/module1Controller/jobApplyController'

**Root Cause** - Incorrect folder/file name capitalization.

**Fix** - Corrected require() statements. - Matched controller filenames
exactly.

------------------------------------------------------------------------

## Error 4 -- Port 5000 Already in Use

**Symptoms**

    EADDRINUSE

**Root Cause** - Previous Node process still running.

**Fix**

``` bash
pkill node
pm2 restart path4you-api
```

------------------------------------------------------------------------

## Error 5 -- PM2 Not Running

**Symptoms** - Backend unavailable.

**Fix**

``` bash
pm2 start server.js --name path4you-api
pm2 save
pm2 startup
```

------------------------------------------------------------------------

## Error 6 -- Backend Health Check Failed

**Root Cause** - Incorrect Health Check path.

**Fix** - Configured `/health`. - Verified:

``` bash
curl localhost:5000/health
```

------------------------------------------------------------------------

## Error 7 -- Nginx Reverse Proxy Not Working

**Symptoms** - `curl http://localhost/health` returned 404.

**Root Cause** - Default Nginx server block overrode proxy
configuration.

**Fix** - Replaced default server block. - Reloaded Nginx.

------------------------------------------------------------------------

## Error 8 -- Vite Build Folder Missing

**Symptoms**

    cp: cannot stat 'build/*'

**Root Cause** - Vite outputs to `dist/`.

**Fix**

``` bash
npm run build
cp -r dist/* /usr/share/nginx/html/
```

------------------------------------------------------------------------

## Error 9 -- CORS / localhost API Calls

**Symptoms** - Browser attempted `http://localhost:5000`.

**Root Cause** - Hardcoded localhost URLs.

**Fix** - Replaced with environment variable. - Later switched to
`/api`.

------------------------------------------------------------------------

## Error 10 -- JWT expiresIn Error

**Symptoms**

    "expiresIn" should be a number of seconds...

**Root Cause** - Invalid JWT expiration value.

**Fix** - Corrected `JWT_EXPIRES_IN`. - Restarted backend.

------------------------------------------------------------------------

## Error 11 -- Browser Could Not Reach Internal ALB

**Symptoms**

    ERR_CONNECTION_TIMED_OUT

**Root Cause** - Browser cannot access Internal ALB.

**Fix** - Configured frontend Nginx reverse proxy. - Used `/api` instead
of Internal ALB URL.

------------------------------------------------------------------------

## Error 12 -- HTML Returned Instead of JSON

**Symptoms** - API response contained `<!DOCTYPE html>`.

**Root Cause** - SPA routing handled API requests.

**Fix**

``` nginx
location /api/ {
    proxy_pass http://internal-backend-alb;
}
```

------------------------------------------------------------------------

## Error 13 -- React Crash

**Symptoms**

    map is not a function

**Root Cause** - HTML received instead of JSON.

**Fix** - Fixed API endpoint. - Corrected Nginx proxy.

------------------------------------------------------------------------

## Error 14 -- Vite Ignored .env

**Root Cause** - Environment variables injected only during build.

**Fix**

``` bash
rm -rf dist
rm -rf node_modules/.vite
npm run build
```

------------------------------------------------------------------------

## Error 15 -- Wrong API URL Embedded

**Symptoms** - Browser called Internal ALB directly.

**Fix**

``` env
VITE_API_URL=/api
```

------------------------------------------------------------------------

## Error 16 -- Login Returned 400

**Root Cause** - Backend validation.

**Fix** - Verified payload. - Corrected JWT configuration.

------------------------------------------------------------------------

## Error 17 -- Job API Returned HTML

**Root Cause** - Browser still used stale bundle.

**Fix** - Rebuilt frontend. - Copied new `dist`. - Restarted Nginx.

------------------------------------------------------------------------

## Error 18 -- API Route Mismatch

**Issue** - Mixed use of: - `/api/jobs/...` - `/api/getjobs`

**Fix** - Standardized frontend API endpoints to match backend.

------------------------------------------------------------------------

## Error 19 -- Production Verification

Verified successfully:

-   Database connectivity ✅
-   Backend APIs ✅
-   PM2 ✅
-   Nginx reverse proxy ✅
-   Internal Backend ALB ✅
-   Frontend ALB ✅
-   React build ✅
-   Login API ✅
-   Register API ✅
-   Job APIs ✅

------------------------------------------------------------------------

# Lessons Learned

-   Validate every infrastructure layer independently.
-   Use curl before debugging React.
-   Internal ALBs are never directly accessible from browsers.
-   Vite requires rebuilding after `.env` changes.
-   Configure Nginx to proxy API requests before SPA routing.
-   Use PM2 for production Node.js process management.
-   Verify Nginx using `nginx -t`.
-   Inspect browser Network tab before changing backend code.
