import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { Expense, ExpenseStatus } from './expense.types'
import { TZDate } from "@date-fns/tz";

interface ExpenseState {
  expenses: Expense[]
  fetchExpenses: () => void
  addExpense: (date: Date, title: string, amount: string, status: ExpenseStatus.todo) => void
  setExpenseStatus: (id: number, status: ExpenseStatus) => void
  deleteExpense: (id: number) => void
}

export const useExpenseStore = create<ExpenseState>()(
  devtools(
    persist(
      (set, get) => ({
        expenses: [],
        fetchExpenses: async () => {
          try {
            const res = await fetch("/api/expenses");
            if (!res.ok) {
              throw new Error("Failed to fetch expenses");
            }
            const { expenseList } = await res.json();

            const serializedExpenses: Expense[] = expenseList.map((item: { key: string; value: { date: string; title: string; amount: string; status: string } }) => ({
              id: parseInt(item.key, 10),
              title: item.value.title,
              amount: item.value.amount,
              date: new Date(item.value.date),
              status: item.value.status as ExpenseStatus,
            }));

            set({ expenses: serializedExpenses });
          } catch (error) {
            console.error("Error fetching expenses:", error);
          }
        },
        addExpense: async (date: Date, title: string, amount: string, status: ExpenseStatus.todo) => {
          try {

            // Calculate newId by accessing the current state
            const currentExpenses = get().expenses;
            // Find the smallest unused ID
            const usedIds = currentExpenses.map((expense) => expense.id);
            const newId = usedIds.length === 0 ? 1 : Math.min(...Array.from({ length: Math.max(...usedIds) + 1 }, (_, i) => i + 1).filter((id) => !usedIds.includes(id)));

            // Perform the fetch and pass newId in the body
            const res = await fetch("/api/expenses", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ id: newId, title, date: new TZDate(date, "Asia/Singapore"), amount, status }),
            });

            if (!res.ok) {
              throw new Error("Failed to create blob");
            }

            // Add the new expense to the state
            set((state) => ({
              expenses: [
                ...state.expenses,
                {
                  id: newId,
                  title,
                  amount,
                  date: date,
                  status: ExpenseStatus.todo,
                },
              ],
            }));

          } catch (error) {
            console.log(error);
          }
        },
        setExpenseStatus: async (id: number, status: ExpenseStatus) => {
          set((state) => ({
            expenses: state.expenses.map((expense) =>
              expense.id === id ? { ...expense, status } : expense,
            ),
          }))

          try {
            // Make an API call to update the status on the server
            const response = await fetch(`/api/expenses/${id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ status }),
            });

            if (!response.ok) {
              throw new Error("Failed to update status on the server");
            }

            // Optionally, re-fetch expenses from the server to sync local and server state
            const updatedExpense = await response.json();
            set((state) => ({
              expenses: state.expenses.map((expense) =>
                expense.id === id ? { ...expense, ...updatedExpense } : expense
              ),
            }));
          } catch (error) {
            console.error("Error updating expense status:", error);

            // Revert the optimistic update in case of an error
            set((state) => ({
              expenses: state.expenses.map((expense) =>
                expense.id === id ? { ...expense, status: expense.status } : expense
              ),
            }));
          }
        },
        deleteExpense: async (id: number) => {
          // Optimistically update the state
          const currentExpenses = get().expenses;
          const expenseToDelete = currentExpenses.find((expense) => expense.id === id);
          if (!expenseToDelete) {
            console.error(`Expense with id ${id} not found`);
            return;
          }

          set((state) => ({
            expenses: state.expenses.filter((expense) => expense.id !== id),
          }))

          try {
            // Make an API call to update the status on the server
            const response = await fetch(`/api/expenses/${id}`, {
              method: "DELETE",
            });

            if (!response.ok) {
              throw new Error("Failed to delete expense on the server");
            }
          } catch (error) {
            console.error("Error updating expense status:", error);

            // Revert the local state to include the expense again
            set({ expenses: currentExpenses });
          }
        },
        clear: () => set({ expenses: [] }),
      }),
      {
        name: 'expense-storage',
      },
    ),
  ),
)
