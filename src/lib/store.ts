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
            console.log("Fetched expenses:", serializedExpenses);
          } catch (error) {
            console.error("Error fetching expenses:", error);
          }
        },
        addExpense: async (date: Date, title: string, amount: string, status: ExpenseStatus.todo) => {
          try {

            // Calculate newId by accessing the current state
            const currentExpenses = get().expenses;
            const lastExpense = currentExpenses[currentExpenses.length - 1];
            const newId = lastExpense ? lastExpense.id + 1 : 1; // Start at 1 if no expenses exist

            // Perform the fetch and pass newId in the body
            const res = await fetch("/api/blob", {
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

            console.log("Expense and blob created successfully");
          } catch (error) {
            console.log(error);
          }
        },
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
