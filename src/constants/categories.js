export const CATEGORIES = {
  income: [
    { id: 'salary', label: 'Salary', icon: '💼' },
    { id: 'freelance', label: 'Freelance', icon: '💻' },
    { id: 'investment', label: 'Investment', icon: '📈' },
    { id: 'gift', label: 'Gift', icon: '🎁' },
    { id: 'other_income', label: 'Other', icon: '💰' },
  ],
  expense: [
    { id: 'food', label: 'Food', icon: '🍔' },
    { id: 'transport', label: 'Transport', icon: '🚗' },
    { id: 'shopping', label: 'Shopping', icon: '🛍️' },
    { id: 'bills', label: 'Bills', icon: '📄' },
    { id: 'health', label: 'Health', icon: '🏥' },
    { id: 'entertainment', label: 'Entertainment', icon: '🎮' },
    { id: 'education', label: 'Education', icon: '📚' },
    { id: 'other_expense', label: 'Other', icon: '💸' },
  ],
};

export const ALL_CATEGORIES = [
  ...CATEGORIES.income,
  ...CATEGORIES.expense,
];

export const getCategoryMeta = (id) =>
  ALL_CATEGORIES.find((c) => c.id === id) || { label: id, icon: '❓' };

export const CHART_COLORS = [
  '#f59e0b', '#10b981', '#3b82f6', '#ef4444',
  '#8b5cf6', '#ec4899', '#14b8a6', '#f97316',
];
