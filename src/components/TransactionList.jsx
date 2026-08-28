import { formatCurrency, formatDate } from '../utils/format';
import { getCategoryMeta } from '../constants/categories';

const TransactionItem = ({ transaction, onDelete }) => {
  const { id, type, amount, category, description, date } = transaction;
  const meta = getCategoryMeta(category);
  const isIncome = type === 'income';

  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-800/50 hover:bg-gray-800 transition-colors group">
      <span className="text-2xl">{meta.icon}</span>
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-medium truncate">{description}</p>
        <p className="text-gray-400 text-xs">{meta.label} · {formatDate(date)}</p>
      </div>
      <div className="flex items-center gap-3">
        <span className={`font-bold text-sm ${isIncome ? 'text-green-400' : 'text-red-400'}`}>
          {isIncome ? '+' : '-'}{formatCurrency(amount)}
        </span>
        <button
          onClick={() => onDelete(id)}
          className="text-gray-600 hover:text-red-400 transition-colors opacity-100 md:opacity-0 md:group-hover:opacity-100 text-lg"
          title="Delete"
        >
          ×
        </button>
      </div>
    </div>
  );
};

const TransactionList = ({ transactions, onDelete }) => {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-4xl mb-3">📭</p>
        <p>No transactions found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {transactions.map((t) => (
        <TransactionItem key={t.id} transaction={t} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default TransactionList;
