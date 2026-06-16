# Romantic Date Proposal

A small React + Vite single-page app with an evasive "No" button and a celebration form after clicking "Yes".

## Requirements

Use Node.js v24.x. This project is configured for your local Node.js v24.16.0 setup and Vercel's Node.js 24 runtime.

## Run locally

```bash
npm install
npm run dev
```

Then open the local URL printed by Vite, usually `http://localhost:5173/`.

## If you already installed dependencies with a different setup

If your local install is stale or you previously installed dependencies with another Node version, reinstall from a clean dependency folder:

```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

On Windows PowerShell, use:

```powershell
Remove-Item -Recurse -Force node_modules, package-lock.json
npm install
npm run dev
```

## Deploy on Vercel

This repository includes `vercel.json`, so Vercel knows to install dependencies, run the Vite build, and publish the `dist` folder. Do not add a catch-all `routes` rule for this app; Vercel should serve the generated JavaScript and CSS assets from `dist/assets` normally.

### Deploy from the Vercel dashboard

1. Push this repository to GitHub.
2. Open Vercel and choose **Add New → Project**.
3. Import the GitHub repository.
4. Confirm these settings if Vercel asks:
   - Framework Preset: `Vite`
   - Install Command: `npm install`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Node.js Version: `24.x`
5. Click **Deploy**.

### Deploy from the Vercel CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

## Production build

```bash
npm run build
npm run preview
```
