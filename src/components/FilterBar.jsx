import { getMonthLabel } from '../utils/format';

const FilterBar = ({
  filterType, setFilterType,
  filterMonth, setFilterMonth,
  availableMonths,
  total,
}) => {
  const selectClass = "bg-gray-800 border border-gray-700 text-white text-sm rounded-xl px-3 py-2 outline-none focus:border-yellow-400 transition-colors";

  return (
    <div className="flex flex-wrap items-center gap-3 mb-4">
      <span className="text-gray-400 text-sm">{total} transactions</span>

      <div className="flex ml-auto gap-2 flex-wrap">
        {/* Type filter */}
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className={selectClass}
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        {/* Month filter */}
        <select
          value={filterMonth}
          onChange={(e) => setFilterMonth(e.target.value)}
          className={selectClass}
        >
          <option value="all">All Months</option>
          {availableMonths.map((m) => (
            <option key={m} value={m}>{getMonthLabel(m)}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
