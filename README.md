# Spendr

Spendr is a personal finance dashboard for tracking income and expenses, understanding spending habits, and staying on top of monthly cash flow. Built with React + Vite, the app stores transactions locally in the browser so you can manage your finances quickly without a backend.

## Features

- Add income and expense transactions
- Pick from category-based entries for each transaction
- View total balance, income, and expenses at a glance
- Filter by type, month, and category
- Delete individual transactions or clear all records
- See spending insights in charts:
  - expenses by category
  - monthly income vs. expense overview
- Persistent data using localStorage

## Tech Stack

- React 19
- Vite
- Tailwind CSS
- Recharts
- UUID

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Install dependencies

```bash
npm install
```

### Run the app locally

```bash
npm run dev
```

Then open the local URL shown in the terminal (usually http://localhost:5173).

## Screenshot

> Screenshot placeholder: add a dashboard image at `public/spendr-dashboard.png`, then replace this note with:
> `![Spendr dashboard](./public/spendr-dashboard.png)`

### Production build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Available Scripts

- `npm run dev` — start the Vite dev server
- `npm run build` — create a production build
- `npm run preview` — preview the production build locally
- `npm run lint` — run the project linter

## Deployment

Spendr is a static Vite app. Build it with `npm run build`; the production files are written to `dist/`.

### Deploy to Netlify

1. Import the repository in Netlify.
2. Set the build command to `npm run build`.
3. Set the publish directory to `dist`.
4. Deploy the site.

### Deploy to Vercel

1. Import the repository in Vercel.
2. Select the Vite framework preset (or configure the project manually).
3. Set the build command to `npm run build` and the output directory to `dist`.
4. Deploy the site.

## Project Structure

```text
src/
  components/      UI blocks for forms, cards, filters, and charts
  constants/       transaction categories and chart metadata
  hooks/           finance state logic and localStorage persistence
  utils/           formatting helpers
  App.jsx          main dashboard layout
  main.jsx         app entry point
public/            static assets
```

## Notes

This app is designed as a lightweight personal budgeting tool. It currently runs entirely in the browser using localStorage, so data is stored on the device and is not synced across devices.

## License

This project is for learning and personal use.
