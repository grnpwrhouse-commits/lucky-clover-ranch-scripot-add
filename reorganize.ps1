# Lucky Clover Ranch — Reorganize to backend/frontend structure
# Run from: C:\Desktop\lucky-clover-ranch-v2

# 1. Create folder structure
New-Item -ItemType Directory -Force -Path backend\src\routes
New-Item -ItemType Directory -Force -Path backend\src\controllers
New-Item -ItemType Directory -Force -Path backend\src\services
New-Item -ItemType Directory -Force -Path backend\src\lib
New-Item -ItemType Directory -Force -Path backend\prisma
New-Item -ItemType Directory -Force -Path frontend\src\components

# 2. Move backend files
if (Test-Path "server.ts") { Move-Item -Force server.ts backend\src\ }
if (Test-Path "prisma\schema.prisma") { Move-Item -Force prisma\schema.prisma backend\prisma\ }
if (Test-Path "prisma\migrations") { Move-Item -Force prisma\migrations backend\prisma\ }
if (Test-Path "src\routes") { Get-ChildItem src\routes | Move-Item -Destination backend\src\routes -Force }
if (Test-Path "src\controllers") { Get-ChildItem src\controllers | Move-Item -Destination backend\src\controllers -Force }
if (Test-Path "src\services") { Get-ChildItem src\services | Move-Item -Destination backend\src\services -Force }
if (Test-Path "src\lib") { Get-ChildItem src\lib | Move-Item -Destination backend\src\lib -Force }

# 3. Move frontend files
if (Test-Path "src\App.tsx") { Move-Item -Force src\App.tsx frontend\src\ }
if (Test-Path "src\Dashboard.tsx") { Move-Item -Force src\Dashboard.tsx frontend\src\ }
if (Test-Path "src\main.tsx") { Move-Item -Force src\main.tsx frontend\src\ }
if (Test-Path "src\index.css") { Move-Item -Force src\index.css frontend\src\ }
if (Test-Path "src\components") { Get-ChildItem src\components | Move-Item -Destination frontend\src\components -Force }
if (Test-Path "index.html") { Move-Item -Force index.html frontend\ }
if (Test-Path "vite.config.ts") { Move-Item -Force vite.config.ts frontend\ }

# 4. Write backend package.json
@'
{
  "name": "lucky-clover-backend",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "tsx src/server.ts",
    "start": "tsx src/server.ts",
    "build": "prisma generate",
    "postinstall": "prisma generate"
  },
  "dependencies": {
    "@prisma/client": "^6.19.2",
    "body-parser": "^2.2.2",
    "cors": "^2.8.6",
    "express": "^4.21.2",
    "zod": "^4.3.6"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/node": "^22.14.0",
    "prisma": "^6.19.2",
    "tsx": "^4.21.0",
    "typescript": "~5.8.2"
  }
}
'@ | Out-File -Encoding utf8 backend\package.json

# 5. Write frontend package.json
@'
{
  "name": "lucky-clover-frontend",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "lucide-react": "^0.546.0",
    "motion": "^12.23.24",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.1.14",
    "@vitejs/plugin-react": "^5.0.4",
    "tailwindcss": "^4.1.14",
    "typescript": "~5.8.2",
    "vite": "^6.2.0"
  }
}
'@ | Out-File -Encoding utf8 frontend\package.json

# 6. Write frontend vercel.json
@'
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    { "source": "/api/(.*)", "destination": "https://victorious-abundance-production-cc5f.up.railway.app/api/$1" }
  ]
}
'@ | Out-File -Encoding utf8 frontend\vercel.json

# 7. Write backend railway.json
@'
{
  "$schema": "https://railway.app/railway.schema.json",
  "deploy": {
    "startCommand": "npx tsx src/server.ts",
    "healthcheckPath": "/api/animals"
  }
}
'@ | Out-File -Encoding utf8 backend\railway.json

# 8. Write README
@'
# Lucky Clover Ranch 🍀

Bull-rental dashboard and management SaaS for LATAM.

## Structure
- `backend/` — Express + Prisma API → Railway
- `frontend/` — React + Vite UI → Vercel

## Run locally

### Backend
```
cd backend
npm install
npx prisma migrate dev
npm run dev
```
Runs on http://localhost:3000

### Frontend
```
cd frontend
npm install
npm run dev
```
Runs on http://localhost:5173

## Live
- API: https://victorious-abundance-production-cc5f.up.railway.app
- App: https://lucky-clover-ranch.vercel.app
'@ | Out-File -Encoding utf8 README.md

# 9. Git commit and push
git add .
git commit -m "refactor: clean backend/frontend split structure"
git push origin master

Write-Host "DONE. Repo reorganized and pushed." -ForegroundColor Green
