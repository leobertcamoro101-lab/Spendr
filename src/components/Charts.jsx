import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from 'recharts';
import { getCategoryMeta, CHART_COLORS } from '../constants/categories';
import { formatCurrency, getMonthLabel } from '../utils/format';

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-sm">
      <p className="text-white font-medium">{payload[0].name}</p>
      <p className="text-yellow-400">{formatCurrency(payload[0].value)}</p>
    </div>
  );
};

const ExpensePieChart = ({ data }) => {
  if (!data.length) return (
    <div className="flex items-center justify-center h-40 text-gray-500 text-sm">
      No expense data yet
    </div>
  );

  const labeled = data.map((d) => ({
    ...d,
    name: `${getCategoryMeta(d.category).icon} ${getCategoryMeta(d.category).label}`,
  }));

  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={labeled}
          dataKey="amount"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          innerRadius={45}
        >
          {labeled.map((_, i) => (
            <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          formatter={(val) => <span className="text-gray-300 text-xs">{val}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

const MonthlyBarChart = ({ data }) => {
  if (!data.length) return (
    <div className="flex items-center justify-center h-40 text-gray-500 text-sm">
      No monthly data yet
    </div>
  );

  const labeled = data.map((d) => ({
    ...d,
    name: getMonthLabel(d.month).split(' ')[0], // short month name
  }));

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={labeled} barGap={4}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="name" tick={{ fill: '#9ca3af', fontSize: 11 }} />
        <YAxis tick={{ fill: '#9ca3af', fontSize: 11 }} />
        <Tooltip content={<CustomTooltip />} />
        <Legend formatter={(val) => <span className="text-gray-300 text-xs capitalize">{val}</span>} />
        <Bar dataKey="income" name="Income" fill="#10b981" radius={[4, 4, 0, 0]} />
        <Bar dataKey="expense" name="Expense" fill="#f59e0b" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

const Charts = ({ chartData, monthlyData }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
      <h3 className="text-white font-semibold mb-3 text-sm">📊 Expenses by Category</h3>
      <ExpensePieChart data={chartData} />
    </div>
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
      <h3 className="text-white font-semibold mb-3 text-sm">📅 Monthly Overview</h3>
      <MonthlyBarChart data={monthlyData} />
    </div>
  </div>
);

export default Charts;
