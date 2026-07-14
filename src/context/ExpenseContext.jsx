import { createContext, useContext, useCallback, useEffect, useMemo, useState } from 'react'
import { seedExpenses } from '../data/expenseData'

// ── useExpenses hook ─────────────────────────

const STORAGE_KEY = 'skydesk.expenses.v1'

function loadInitial() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    // fall through to seed data
  }
  return seedExpenses
}

function useExpenses() {
  const [expenses, setExpenses] = useState(loadInitial)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses))
    } catch {
      // ignore storage errors
    }
  }, [expenses])

  const addExpense = useCallback((entry) => {
    setExpenses((prev) => {
      const id = `EXP-${String(prev.length + 1).padStart(4, '0')}`
      return [{ id, status: 'Pending', bookingId: null, ...entry }, ...prev]
    })
  }, [])

  const updateStatus = useCallback((id, status) => {
    setExpenses((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)))
  }, [])

  const removeExpense = useCallback((id) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id))
  }, [])

  const totals = useMemo(() => {
    const total = expenses.reduce((s, e) => s + Number(e.amount || 0), 0)
    const pending = expenses.filter((e) => e.status === 'Pending').reduce((s, e) => s + Number(e.amount || 0), 0)
    const approved = expenses.filter((e) => e.status === 'Approved').reduce((s, e) => s + Number(e.amount || 0), 0)
    const rejected = expenses.filter((e) => e.status === 'Rejected').reduce((s, e) => s + Number(e.amount || 0), 0)
    return { total, pending, approved, rejected }
  }, [expenses])

  return { expenses, totals, addExpense, updateStatus, removeExpense }
}

// ── Context ──────────────────────────────────

const ExpenseContext = createContext(null)

export function ExpenseProvider({ children }) {
  const value = useExpenses()
  return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
}

export function useExpenseStore() {
  const ctx = useContext(ExpenseContext)
  if (!ctx) throw new Error('useExpenseStore must be used inside ExpenseProvider')
  return ctx
}
