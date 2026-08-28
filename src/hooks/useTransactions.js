import { useState, useEffect, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'expense_tracker_transactions';

// NEW CONCEPT: reading/writing to localStorage to persist data
const loadFromStorage = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveToStorage = (transactions) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
};

const useTransactions = () => {
  const [transactions, setTransactions] = useState(loadFromStorage);
  const [filterType, setFilterType] = useState('all');   // all | income | expense
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterMonth, setFilterMonth] = useState('all'); // 'all' or 'YYYY-MM'

  // Sync to localStorage on every change
  useEffect(() => {
    saveToStorage(transactions);
  }, [transactions]);

  // Add a new transaction
  const addTransaction = (data) => {
    const newTransaction = {
      id: uuidv4(),
      ...data,
      amount: parseFloat(data.amount),
      date: data.date || new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
    };
    setTransactions((prev) => [newTransaction, ...prev]);
  };

  // Delete a transaction by id
  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  // Clear all transactions
  const clearAll = () => setTransactions([]);

  // NEW CONCEPT: useMemo — derived data computed only when transactions change
  const summary = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const expense = transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    return { income, expense, balance: income - expense };
  }, [transactions]);

  // Filtered transactions
  const filtered = useMemo(() => {
    return transactions.filter((t) => {
      const matchType = filterType === 'all' || t.type === filterType;
      const matchCategory = filterCategory === 'all' || t.category === filterCategory;
      const matchMonth = filterMonth === 'all' || t.date.startsWith(filterMonth);
      return matchType && matchCategory && matchMonth;
    });
  }, [transactions, filterType, filterCategory, filterMonth]);

  // Data for pie/bar chart — group expenses by category
  const chartData = useMemo(() => {
    const expenseMap = {};
    transactions
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        expenseMap[t.category] = (expenseMap[t.category] || 0) + t.amount;
      });
    return Object.entries(expenseMap).map(([category, amount]) => ({
      category,
      amount: parseFloat(amount.toFixed(2)),
    }));
  }, [transactions]);

  // Monthly income vs expense for bar chart
  const monthlyData = useMemo(() => {
    const map = {};
    transactions.forEach((t) => {
      const month = t.date.slice(0, 7); // YYYY-MM
      if (!map[month]) map[month] = { month, income: 0, expense: 0 };
      map[month][t.type] += t.amount;
    });
    return Object.values(map).sort((a, b) => a.month.localeCompare(b.month));
  }, [transactions]);

  // Available months for filter dropdown
  const availableMonths = useMemo(() => {
    const months = [...new Set(transactions.map((t) => t.date.slice(0, 7)))];
    return months.sort((a, b) => b.localeCompare(a));
  }, [transactions]);

  return {
    transactions, filtered, summary,
    chartData, monthlyData, availableMonths,
    filterType, setFilterType,
    filterCategory, setFilterCategory,
    filterMonth, setFilterMonth,
    addTransaction, deleteTransaction, clearAll,
  };
};

export default useTransactions;
