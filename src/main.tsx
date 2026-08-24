import { StrictMode, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  CalendarDays,
  ChevronDown,
  CircleDollarSign,
  CreditCard,
  Download,
  Filter,
  LayoutDashboard,
  Menu,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  SlidersHorizontal,
  Tag,
  Trash2,
  Upload,
  WalletCards,
  X,
} from 'lucide-react';
import './styles.css';
import './overrides.css';

type Expense = {
  id: number;
  merchant: string;
  category: string;
  method: string;
  date: string;
  amount: number;
  color: string;
  icon: string;
};

const categories = [
  { name: 'Food & dining', icon: 'FD', color: '#ef8f64' },
  { name: 'Transport', icon: 'TR', color: '#63a9a2' },
  { name: 'Shopping', icon: 'SH', color: '#e6b85c' },
  { name: 'Bills & utilities', icon: 'BU', color: '#9186cc' },
  { name: 'Health', icon: 'HE', color: '#d9788e' },
];

const starterExpenses: Expense[] = [
  { id: 1, merchant: 'Blue Bottle Coffee', category: 'Food & dining', method: 'Card', date: '2026-08-24', amount: 8.4, color: '#ef8f64', icon: 'FD' },
  { id: 2, merchant: 'Metro Transit', category: 'Transport', method: 'Card', date: '2026-08-23', amount: 42, color: '#63a9a2', icon: 'TR' },
  { id: 3, merchant: 'Corner Market', category: 'Shopping', method: 'Cash', date: '2026-08-22', amount: 64.25, color: '#e6b85c', icon: 'SH' },
  { id: 4, merchant: 'Sunrise Utilities', category: 'Bills & utilities', method: 'Direct debit', date: '2026-08-20', amount: 118.9, color: '#9186cc', icon: 'BU' },
  { id: 5, merchant: 'Northside Pharmacy', category: 'Health', method: 'Card', date: '2026-08-18', amount: 36.5, color: '#d9788e', icon: 'HE' },
];

const money = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', currencyDisplay: 'code' });
const formatDate = (value: string) => new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(new Date(`${value}T12:00:00`));

function App() {
  const [active, setActive] = useState('Overview');
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const stored = localStorage.getItem('spendwise-expenses');
    return stored ? JSON.parse(stored) : starterExpenses;
  });
  const [showForm, setShowForm] = useState(false);
  const [query, setQuery] = useState('');
  const [budget, setBudget] = useState(1200);
  const [form, setForm] = useState({ merchant: '', amount: '', category: 'Food & dining', method: 'Card', date: '2026-08-24', notes: '' });

  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const filteredExpenses = expenses.filter((expense) => `${expense.merchant} ${expense.category} ${expense.method}`.toLowerCase().includes(query.toLowerCase()));
  const categoryTotals = useMemo(() => categories.map((category) => ({ ...category, total: expenses.filter((expense) => expense.category === category.name).reduce((sum, expense) => sum + expense.amount, 0) })).filter((category) => category.total > 0), [expenses]);
  const largest = expenses.reduce((max, expense) => expense.amount > max.amount ? expense : max, expenses[0]);

  const saveExpenses = (next: Expense[]) => {
    setExpenses(next);
    localStorage.setItem('spendwise-expenses', JSON.stringify(next));
  };

  const addExpense = (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.merchant || !form.amount || Number(form.amount) <= 0) return;
    const category = categories.find((item) => item.name === form.category) ?? categories[0];
    saveExpenses([{ id: Date.now(), merchant: form.merchant, amount: Number(form.amount), category: form.category, method: form.method, date: form.date, color: category.color, icon: category.icon }, ...expenses]);
    setForm({ merchant: '', amount: '', category: 'Food & dining', method: 'Card', date: '2026-08-24', notes: '' });
    setShowForm(false);
  };

  const deleteExpense = (id: number) => saveExpenses(expenses.filter((expense) => expense.id !== id));

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand"><div className="brand-mark"><CircleDollarSign size={22} /></div><span>Medha Expense QA</span></div>
        <div className="workspace-label">Personal Expenses</div>
        <nav>
          {[['Overview', LayoutDashboard], ['Expenses', WalletCards], ['Reports', BarChart3], ['Budget & categories', Tag]].map(([label, Icon]) => <button className={active === label ? 'nav-item active' : 'nav-item'} onClick={() => setActive(label as string)} key={label as string}><Icon size={18} /><span>{label as string}</span>{label === 'Overview' && <span className="nav-dot" />}</button>)}
        </nav>
        <div className="sidebar-bottom"><button className="nav-item" onClick={() => setActive('Settings')}><Settings size={18} /><span>Settings & data</span></button><div className="profile"><div className="avatar">M</div><div><strong>Medha</strong><small>Local account</small></div><MoreHorizontal size={18} /></div></div>
      </aside>

      <main className="main-content">
        <header className="topbar"><button className="mobile-menu" aria-label="Open menu"><Menu size={20} /></button><div><p className="eyebrow">MONDAY, AUGUST 24, 2026</p><h1>{active === 'Overview' ? 'Good morning, Medha' : active}</h1></div><div className="top-actions"><button className="icon-button" aria-label="Notifications"><Bell size={19} /><span className="notification-dot" /></button><button className="outline-button" onClick={() => setShowForm(true)}><Plus size={17} /> Add expense</button></div></header>

        {active === 'Overview' && <>
          <section className="hero-grid"><div className="welcome-card"><div><p className="eyebrow light">AUGUST 2026</p><h2>Your money, in focus.</h2><p className="muted-light">You’re doing well this month. Keep your daily rhythm going.</p></div><div className="hero-spark"><span>$</span><svg viewBox="0 0 220 90" role="img" aria-label="Spending trend"><path d="M2 72 C28 70, 28 42, 54 52 S77 75, 101 51 S125 20, 148 38 S175 57, 218 10" fill="none" stroke="#f6c96e" strokeWidth="3" /></svg></div></div><div className="budget-card"><div className="card-heading"><span>Monthly budget</span><button className="text-button" onClick={() => setActive('Budget & categories')}>Edit <ChevronDown size={14} /></button></div><div className="budget-amount"><strong>{money.format(total)}</strong><span>of {money.format(budget)}</span></div><div className="progress"><span style={{ width: `${Math.min((total / budget) * 100, 100)}%` }} /></div><div className="budget-foot"><span>{Math.max(budget - total, 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' })} left</span><span className="warning"><span className="status-pip" />{Math.round((total / budget) * 100)}% used</span></div></div></section>

          <section className="metrics"><Metric label="Daily average" value={money.format(total / 24)} change="12.4%" positive icon={<CalendarDays size={18} />} /><Metric label="Largest expense" value={largest ? money.format(largest.amount) : '$0'} change={largest?.merchant ?? 'No expenses'} icon={<ArrowUpRight size={18} />} /><Metric label="Transactions" value={String(expenses.length)} change="This month" icon={<CreditCard size={18} />} /></section>

          <section className="content-grid"><div className="panel transactions"><div className="panel-header"><div><p className="eyebrow">ACTIVITY</p><h2>Recent transactions</h2></div><button className="text-button" onClick={() => setActive('Expenses')}>View all <ArrowUpRight size={15} /></button></div><div className="search-row"><div className="search-box"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search transactions" /></div><button className="filter-button"><Filter size={16} /> Filter</button></div><ExpenseList expenses={filteredExpenses.slice(0, 5)} onDelete={deleteExpense} /></div><div className="panel breakdown"><div className="panel-header"><div><p className="eyebrow">WHERE IT GOES</p><h2>Category breakdown</h2></div><button className="icon-button subtle"><MoreHorizontal size={18} /></button></div><div className="donut-wrap"><div className="donut" style={{ background: `conic-gradient(${categoryTotals.map((category, index) => `${category.color} ${categoryTotals.slice(0, index).reduce((sum, item) => sum + item.total, 0) / total * 360}deg ${(categoryTotals.slice(0, index + 1).reduce((sum, item) => sum + item.total, 0) / total) * 360}deg`).join(', ')})` }}><div><strong>{money.format(total)}</strong><span>Total spend</span></div></div></div><div className="category-legend">{categoryTotals.map((category) => <div className="legend-row" key={category.name}><span className="legend-name"><i style={{ background: category.color }} />{category.name}</span><strong>{money.format(category.total)}</strong></div>)}</div></div></section>
          <section className="insight"><div className="insight-icon"><SlidersHorizontal size={19} /></div><div><strong>Small steps add up</strong><p>Your spending is 8% lower than this time last month. That’s a good trend worth keeping.</p></div><button className="close-insight" aria-label="Dismiss"><X size={17} /></button></section>
        </>}

        {active === 'Expenses' && <section className="page-panel"><div className="panel-header"><div><p className="eyebrow">AUGUST 2026</p><h2>All expenses</h2></div><button className="outline-button" onClick={() => setShowForm(true)}><Plus size={17} /> Add expense</button></div><div className="search-row"><div className="search-box wide"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search merchant, category, or payment method" /></div><button className="filter-button"><SlidersHorizontal size={16} /> Filters</button></div><ExpenseList expenses={filteredExpenses} onDelete={deleteExpense} /></section>}
        {active === 'Reports' && <Reports expenses={expenses} total={total} />}
        {active === 'Budget & categories' && <Budget budget={budget} setBudget={setBudget} />}
        {active === 'Settings' && <SettingsPage expenses={expenses} />}
      </main>
      {showForm && <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setShowForm(false)}><form className="expense-modal" onSubmit={addExpense}><div className="modal-header"><div><p className="eyebrow">NEW TRANSACTION</p><h2>Add an expense</h2></div><button type="button" className="icon-button subtle" onClick={() => setShowForm(false)}><X size={19} /></button></div><label>Merchant<input autoFocus value={form.merchant} onChange={(event) => setForm({ ...form, merchant: event.target.value })} placeholder="e.g. Whole Foods" required /></label><div className="form-row"><label>Amount<input type="number" min="0.01" step="0.01" value={form.amount} onChange={(event) => setForm({ ...form, amount: event.target.value })} placeholder="0.00" required /></label><label>Date<input type="date" value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} required /></label></div><div className="form-row"><label>Category<select value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })}>{categories.map((category) => <option key={category.name}>{category.name}</option>)}</select></label><label>Payment method<select value={form.method} onChange={(event) => setForm({ ...form, method: event.target.value })}><option>Card</option><option>Cash</option><option>Direct debit</option></select></label></div><label>Notes <span className="optional">Optional</span><textarea value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} placeholder="Add a note" /></label><div className="modal-actions"><button type="button" className="ghost-button" onClick={() => setShowForm(false)}>Cancel</button><button className="primary-button" type="submit">Save expense <ArrowUpRight size={16} /></button></div></form></div>}
    </div>
  );
}

function Metric({ label, value, change, positive, icon }: { label: string; value: string; change: string; positive?: boolean; icon: React.ReactNode }) { return <div className="metric"><div className="metric-icon">{icon}</div><p>{label}</p><strong>{value}</strong><span className={positive ? 'metric-change positive' : 'metric-change'}>{positive ? <ArrowUpRight size={13} /> : null}{change}</span></div>; }
function ExpenseList({ expenses, onDelete }: { expenses: Expense[]; onDelete: (id: number) => void }) { return <div className="expense-list">{expenses.length === 0 ? <div className="empty-state"><Search size={24} /><strong>No expenses found</strong><span>Try another search or add a new expense.</span></div> : expenses.map((expense) => <div className="expense-row" key={expense.id}><div className="expense-symbol" style={{ background: `${expense.color}22`, color: expense.color }}>{expense.icon}</div><div className="expense-info"><strong>{expense.merchant}</strong><span>{expense.category} · {expense.method}</span></div><span className="expense-date">{formatDate(expense.date)}</span><strong className="expense-amount">{money.format(expense.amount)}</strong><button className="delete-button" aria-label={`Delete ${expense.merchant}`} onClick={() => onDelete(expense.id)}><Trash2 size={16} /></button></div>)}</div>; }
function Reports({ expenses, total }: { expenses: Expense[]; total: number }) { const days = Array.from({ length: 7 }, (_, index) => ({ label: ['M', 'T', 'W', 'T', 'F', 'S', 'S'][index], value: [62, 38, 78, 52, 92, 45, 67][index] })); return <section className="reports-grid"><div className="panel report-hero"><div className="panel-header"><div><p className="eyebrow">MONTHLY REPORT</p><h2>August 2026</h2></div><button className="select-button">August 2026 <ChevronDown size={15} /></button></div><div className="report-total"><span>Total spent</span><strong>{money.format(total)}</strong><span className="positive"><ArrowDownRight size={14} /> 8% vs July</span></div><div className="bars">{days.map((day) => <div className="bar-col" key={day.label}><div className="bar" style={{ height: `${day.value}%` }} /><span>{day.label}</span></div>)}</div></div><div className="panel report-table"><div className="panel-header"><div><p className="eyebrow">COMPARISON</p><h2>Category totals</h2></div></div>{categories.map((category) => { const amount = expenses.filter((expense) => expense.category === category.name).reduce((sum, expense) => sum + expense.amount, 0); return <div className="comparison-row" key={category.name}><span><i style={{ background: category.color }} />{category.name}</span><strong>{money.format(amount)}</strong><span className="muted">{total ? Math.round(amount / total * 100) : 0}%</span></div>; })}</div></section>; }
function Budget({ budget, setBudget }: { budget: number; setBudget: (value: number) => void }) { return <section className="settings-grid"><div className="panel settings-card"><p className="eyebrow">MONTHLY PLAN</p><h2>Budget & categories</h2><p className="description">Set a monthly limit and keep your category list tidy. SpendWise will flag your dashboard at 80% and 100%.</p><label>Monthly budget<input type="number" value={budget} onChange={(event) => setBudget(Number(event.target.value))} /></label><button className="primary-button">Save budget</button></div><div className="panel settings-card"><div className="panel-header"><h2>Categories</h2><button className="icon-button subtle" aria-label="Add category"><Plus size={18} /></button></div>{categories.map((category) => <div className="category-setting" key={category.name}><i style={{ background: category.color }} /><span>{category.name}</span><MoreHorizontal size={17} /></div>)}</div></section>; }
function SettingsPage({ expenses }: { expenses: Expense[] }) { const exportData = () => { const blob = new Blob([JSON.stringify({ version: 1, expenses }, null, 2)], { type: 'application/json' }); const url = URL.createObjectURL(blob); const link = document.createElement('a'); link.href = url; link.download = 'medha-expense-qa-backup.json'; link.click(); URL.revokeObjectURL(url); }; return <section className="settings-grid"><div className="panel settings-card"><p className="eyebrow">PREFERENCES</p><h2>Settings & data</h2><p className="description">Medha Expense QA stores your data locally in this browser. Export a backup before clearing browser data.</p><div className="preference"><span><strong>Currency</strong><small>Used across your reports</small></span><button className="select-button">USD · $ <ChevronDown size={14} /></button></div><div className="preference"><span><strong>Theme</strong><small>Warm light</small></span><button className="select-button">Light <ChevronDown size={14} /></button></div></div><div className="panel settings-card"><p className="eyebrow">DATA PORTABILITY</p><h2>Backup your data</h2><p className="description">A complete JSON export can restore all expenses in a future session.</p><button className="outline-button full" onClick={exportData}><Download size={17} /> Export JSON</button><button className="ghost-button full"><Upload size={17} /> Import data</button><button className="danger-button full">Clear local data</button></div></section>; }

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
