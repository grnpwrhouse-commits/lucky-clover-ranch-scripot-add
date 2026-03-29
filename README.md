# Lucky Clover Ranch ðŸ€

Bull-rental dashboard and management SaaS for LATAM.

## Structure
- `backend/` â€” Express + Prisma API â†’ Railway
- `frontend/` â€” React + Vite UI â†’ Vercel

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
