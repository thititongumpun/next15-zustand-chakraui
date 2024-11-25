import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { Expense, ExpenseStatus } from './expense.types'
import { defaultLists } from './default.list'

interface ExpenseState {
  expenses: Expense[]
  addExpense: (title: string, amount: string) => void
  setExpenseStatus: (id: number, status: ExpenseStatus) => void
  deleteExpense: (id: number) => void
}



export const useExpenseStore = create<ExpenseState>()(
  devtools(
    persist(
      (set) => ({
        expenses: defaultLists,
        addExpense: (title: string, amount: string) =>
          set((state) => ({
            expenses: [
              ...state.expenses,
              {
                id: state.expenses.length++,
                title: title,
                amount: amount,
                status: ExpenseStatus.todo,
              },
            ],
          })),
        setExpenseStatus: (id: number, status: ExpenseStatus) =>
          set((state) => ({
            expenses: state.expenses.map((expense) =>
              expense.id === id ? { ...expense, status } : expense,
            ),
          })),
        deleteExpense: (id: number) =>
          set((state) => ({
            expenses: state.expenses.filter((expense) => expense.id !== id),
          })),
        clear: () => set({ expenses: [] }),
      }),
      {
        name: 'expense-storage',
      },
    ),
  ),
)
