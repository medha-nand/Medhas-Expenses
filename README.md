# Medha Expense QA

## Project Name

Medha Expense QA

## Project Description

Medha Expense QA is a responsive, local-first expense tracker for recording everyday spending and reviewing monthly totals. Expense data is stored in the browser so the app can be used without an account or backend service.

## Features

- Add expenses with merchant, amount, date, category, payment method, and optional notes.
- View dashboard totals, daily average, largest expense, budget progress, and recent transactions.
- Search expenses by merchant, category, or payment method.
- Delete expenses from the transaction list.
- View monthly reports with category comparisons and spending trends.
- Configure a monthly budget.
- View default expense categories.
- Export expense data as JSON.
- Persist expense data across browser refreshes with local storage.
- Responsive desktop and mobile layout.
- Black-and-white interface with INR currency formatting.

## Technology Used

- React 19
- TypeScript
- Vite
- React Router
- Lucide React
- Recharts
- Zod
- Playwright Test
- Browser `localStorage` for local persistence

## How to Install

Requirements:

- Node.js 18 or newer
- npm

Install dependencies from the project root:

```bash
npm install
```

## How to Run Locally

Start the Vite development server:

```bash
npm run dev
```

Open the local application at:

[http://localhost:5173/](http://localhost:5173/)

Create a production build with:

```bash
npm run build
```

Preview the production build with:

```bash
npm run preview
```

Run the Playwright tests with:

```bash
npx playwright test
```

## GitHub Repository

[https://github.com/medha-nand/Medhas-Expenses](https://github.com/medha-nand/Medhas-Expenses)

## Live Application URL

The public production application is available at [https://medhaexpense-project.vercel.app](https://medhaexpense-project.vercel.app).

The local development application is available at [http://localhost:5173/](http://localhost:5173/).

## Data Storage Notice

Expenses are stored in the current browser under local storage. Clearing browser data can permanently remove locally stored expenses. Use the JSON export in Settings & data to create a backup.
