import { useState } from 'react';
import { CATEGORIES } from '../constants/categories';

const defaultForm = {
  type: 'expense',
  amount: '',
  category: '',
  description: '',
  date: new Date().toISOString().split('T')[0],
};

const TransactionForm = ({ onAdd }) => {
  const [form, setForm] = useState(defaultForm);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      // Reset category when type changes
      ...(name === 'type' ? { category: '' } : {}),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.amount || isNaN(form.amount) || parseFloat(form.amount) <= 0) {
      return setError('Please enter a valid amount.');
    }
    if (!form.category) return setError('Please select a category.');
    if (!form.description.trim()) return setError('Please enter a description.');

    setError('');
    onAdd(form);
    setForm({ ...defaultForm, type: form.type });
  };

  const currentCategories = CATEGORIES[form.type];
  const inputClass = "w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 outline-none focus:border-yellow-400 transition-colors text-sm";

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 mb-6">
      <h2 className="text-white font-bold text-lg mb-4">➕ Add Transaction</h2>

      {/* Type toggle */}
      <div className="flex rounded-xl overflow-hidden border border-gray-700 mb-4">
        {['expense', 'income'].map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setForm({ ...defaultForm, type })}
            className={`flex-1 py-2.5 text-sm font-semibold capitalize transition-colors
              ${form.type === type
                ? type === 'expense'
                  ? 'bg-red-500 text-white'
                  : 'bg-green-500 text-white'
                : 'bg-transparent text-gray-400 hover:text-white'
              }`}
          >
            {type === 'expense' ? '📉 Expense' : '📈 Income'}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Amount */}
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Amount (₱)</label>
            <input
              name="amount"
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={form.amount}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Date */}
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Date</label>
            <input
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="text-xs text-gray-400 mb-1 block">Category</label>
          <div className="flex flex-wrap gap-2">
            {currentCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setForm((p) => ({ ...p, category: cat.id }))}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors
                  ${form.category === cat.id
                    ? 'bg-yellow-400 text-black border-yellow-400'
                    : 'bg-gray-800 text-gray-300 border-gray-700 hover:border-yellow-400'
                  }`}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="text-xs text-gray-400 mb-1 block">Description</label>
          <input
            name="description"
            type="text"
            placeholder="What was this for?"
            value={form.description}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {error && <p className="text-red-400 text-xs">{error}</p>}

        <button
          type="submit"
          className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold
                     py-3 rounded-xl transition-colors"
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
