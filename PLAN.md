# Medha Expense QA

## Current Local Implementation Plan

### 1. Application Identity

- Application name: Medha Expense QA
- User profile: Medha
- Workspace label: Personal Expenses
- Local URL: `http://localhost:5173/`
- Entry document: `index.html`
- React entry point: `src/main.tsx`

### 2. Technology Currently Used

- React 19
- TypeScript
- Vite
- React Router is installed but not currently used for routing
- Lucide React icons
- Recharts and Zod are installed but not currently used in the implementation
- Browser `localStorage` for expense persistence
- CSS stylesheets in `src/styles.css` and `src/overrides.css`
- Playwright is configured for browser tests

### 3. Current Project Structure

```text
index.html
package.json
playwright.config.js
vite.config.ts
tsconfig.json
src/
  main.tsx
  styles.css
  overrides.css
  vite-env.d.ts
tests/
  example.spec.js
  enquire.spec.js
```

### 4. Current Application Shell

- Responsive desktop sidebar navigation.
- Compact mobile layout with a mobile menu button.
- Navigation options currently visible:
  - Overview
  - Expenses
  - Reports
  - Settings & data
- The Budget & categories navigation tab is currently hidden from the sidebar, but its view remains implemented and can still be reached from the dashboard budget Edit action.
- The dollar logo mark is hidden.
- Visual palette is black and white only.

### 5. Dashboard / Overview

The Overview view currently includes:

- Greeting for Medha.
- Monthly budget card.
- Budget progress bar.
- Current total spending.
- Remaining budget amount.
- Daily average metric.
- Largest expense metric.
- Transaction count.
- Recent transaction list.
- Search field for transactions.
- Category breakdown with a CSS conic-gradient chart and text legend.
- Spending insight message.
- Quick Add expense action.

The old welcome hero copy and the `Only for INR` block have been removed from the visible interface.

### 6. Expense Workflow

The Add expense modal currently captures:

- Merchant
- Amount
- Date
- Category
- Payment method
- Optional notes

Supported payment methods:

- Card
- Cash
- Direct debit

Supported default categories:

- Food & dining
- Transport
- Shopping
- Bills & utilities
- Health

Current actions:

- Add an expense.
- Search expenses by merchant, category, or payment method.
- Delete an expense.
- View all expenses.

Expense data is persisted under the existing localStorage key:

```text
spendwise-expenses
```

Existing local data is intentionally preserved when the product name and user name are changed.

### 7. Currency Rules

- Monetary formatting uses the `en-IN` locale.
- Monetary formatting uses the `INR` currency code.
- Visible monetary values use the literal `INR` code rather than `$` or `₹`.
- The current implementation stores numeric amounts directly rather than integer minor units.
- The current budget default is `1200`.
- The budget value is held in React state and is not currently persisted separately.

### 8. Reports View

The Reports view currently includes:

- August 2026 monthly total.
- Static seven-day trend bars.
- July comparison message.
- Category totals.
- Category percentage comparison.

The chart data is currently demonstration data and is not calculated from daily transaction totals.

### 9. Budget and Categories View

The implemented view includes:

- Editable monthly budget input.
- Save budget button presentation.
- Default category list.
- Add category icon presentation.
- Category overflow action presentation.

Category create, edit, archive, and budget persistence are not yet implemented as durable workflows.

### 10. Settings and Data View

The implemented view includes:

- Currency preference presentation showing INR.
- Theme preference presentation.
- Local browser storage guidance.
- JSON export of the current expense array.
- Import button presentation without import behavior.
- Clear local data button presentation without clear behavior.

JSON exports use the filename:

```text
medha-expense-qa-backup.json
```

### 11. Seed Data

The initial fallback data contains these transactions:

- Blue Bottle Coffee, August 24, INR 8.40
- Metro Transit, August 23, INR 42.00
- Sunrise Utilities, August 20, INR 118.90
- Northside Pharmacy, August 18, INR 36.50

The August 22 Corner Market transaction was removed from the active local dataset during browser demonstration.

### 12. Validation Completed

- `npm run build` passes.
- Vite development server runs at `http://localhost:5173/`.
- Browser smoke checks verified:
  - App title is Medha Expense QA.
  - Medha profile and greeting render.
  - Expense modal opens.
  - A new expense can be saved.
  - Expense totals update immediately.
  - Expenses view renders saved data.
  - Reports view opens.
  - Removed August 22 transaction is absent.
  - Dollar logo and Budget & categories sidebar tab are hidden.

### 13. Remaining Implementation Work

To reach the complete original SpendWise specification, the next work should be:

1. Split `src/main.tsx` into `app`, `components`, `features`, `domain`, `data`, `hooks`, and `lib` modules.
2. Add typed domain entities for expenses, categories, budgets, preferences, and import results.
3. Add Zod schemas for expense forms and JSON/CSV imports.
4. Replace direct `localStorage` calls with an `ExpenseRepository` interface and IndexedDB implementation.
5. Add schema versioning and migration handlers.
6. Store amounts as integer minor units and formalize INR-only currency behavior.
7. Implement durable budget persistence and 80% / 100% warning states.
8. Implement category creation, editing, archiving, and archived-category safeguards.
9. Implement edit-expense workflow and delete confirmation dialog.
10. Implement real filters for dates, category, payment method, and amount range.
11. Implement date grouping and month selection.
12. Calculate daily reports from transaction data instead of static chart values.
13. Add accessible table alternatives for charts.
14. Implement JSON and CSV import, validation, duplicate handling, and error reporting.
15. Implement clear-local-data confirmation and storage failure recovery states.
16. Add React Router routes for direct navigation and refresh persistence.
17. Add Vitest and Testing Library coverage for domain calculations and components.
18. Add Playwright tests for add, edit, delete, persistence, filters, export, and import flows.
19. Add ESLint, Prettier, CI, deployment configuration, and browser support documentation.

### 14. Development Commands

```bash
npm run dev
npm run build
npm run preview
npx playwright test
```

### 15. Scope Note

This file describes the code currently present in the local workspace. It is not a claim that every item in the original product specification has been implemented yet.
