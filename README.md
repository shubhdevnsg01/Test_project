# Romantic Date Proposal

A small React + Vite single-page app with an evasive "No" button and a celebration form after clicking "Yes".

## Run locally

This project intentionally uses Vite 5 so it can run on Node.js 20.11.0 and newer compatible Node versions.

```bash
npm install
npm run dev
```

Then open the local URL printed by Vite, usually `http://localhost:5173/`.

## If you already installed dependencies with `vite@latest`

Newer Vite releases require Node.js 20.19+ or 22.12+. If you saw a Node version error, reinstall the pinned dependencies from this repo:

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

## Production build

```bash
npm run build
npm run preview
```
