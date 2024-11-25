export type Expense = {
  id: number;
  title: string;
  amount: string;
  status: ExpenseStatus
}

export enum ExpenseStatus {
  done = "done",
  todo = "todo",
}