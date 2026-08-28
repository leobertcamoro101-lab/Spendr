import { useState } from 'react';
import useTransactions from './hooks/useTransactions';
import SummaryCards from './components/SummaryCards';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import FilterBar from './components/FilterBar';
import Charts from './components/Charts';

function App() {
  const {
    filtered, summary, chartData, monthlyData, availableMonths,
    filterType, setFilterType,
    filterMonth, setFilterMonth,
    addTransaction, deleteTransaction, clearAll,
  } = useTransactions();

  const [showCharts, setShowCharts] = useState(true);
  const [showForm, setShowForm] = useState(true);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="bg-gray-900/80 backdrop-blur-md border-b border-gray-800 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-yellow-400">💸 ExpenseTracker</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setShowCharts((p) => !p)}
              className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1.5 rounded-lg transition-colors"
            >
              {showCharts ? '🙈 Hide Charts' : '📊 Show Charts'}
            </button>
            <button
              onClick={() => setShowForm((p) => !p)}
              className="text-xs bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-3 py-1.5 rounded-lg transition-colors"
            >
              {showForm ? '✕ Close' : '➕ Add'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Summary */}
        <SummaryCards summary={summary} />

        {/* Charts */}
        {showCharts && (
          <Charts chartData={chartData} monthlyData={monthlyData} />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form */}
          {showForm && (
            <div className="lg:col-span-1">
              <TransactionForm onAdd={addTransaction} />
            </div>
          )}

          {/* Transactions */}
          <div className={showForm ? 'lg:col-span-2' : 'lg:col-span-3'}>
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-white font-bold text-lg">📋 Transactions</h2>
                {filtered.length > 0 && (
                  <button
                    onClick={clearAll}
                    className="text-xs text-red-400 hover:text-red-300 transition-colors"
                  >
                    Clear All
                  </button>
                )}
              </div>

              <FilterBar
                filterType={filterType}
                setFilterType={setFilterType}
                filterMonth={filterMonth}
                setFilterMonth={setFilterMonth}
                availableMonths={availableMonths}
                total={filtered.length}
              />

              <TransactionList
                transactions={filtered}
                onDelete={deleteTransaction}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
