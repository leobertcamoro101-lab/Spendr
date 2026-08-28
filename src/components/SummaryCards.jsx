import { formatCurrency } from '../utils/format';

const Card = ({ label, amount, color, icon }) => (
  <div className={`rounded-2xl p-5 border ${color}`}>
    <div className="flex items-center justify-between mb-2">
      <span className="text-sm text-gray-400 uppercase tracking-wider">{label}</span>
      <span className="text-2xl">{icon}</span>
    </div>
    <p className="text-2xl font-bold text-white">{formatCurrency(amount)}</p>
  </div>
);

const SummaryCards = ({ summary }) => {
  const { income, expense, balance } = summary;
  const balanceColor = balance >= 0
    ? 'bg-green-500/10 border-green-500/30'
    : 'bg-red-500/10 border-red-500/30';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <Card
        label="Total Balance"
        amount={balance}
        icon={balance >= 0 ? '💰' : '⚠️'}
        color={balanceColor}
      />
      <Card
        label="Total Income"
        amount={income}
        icon="📈"
        color="bg-blue-500/10 border-blue-500/30"
      />
      <Card
        label="Total Expenses"
        amount={expense}
        icon="📉"
        color="bg-orange-500/10 border-orange-500/30"
      />
    </div>
  );
};

export default SummaryCards;
