export type Expense = {
  id: number;
  title: string;
  amount: string;
  date: Date;
  status: ExpenseStatus
}

export enum ExpenseStatus {
  done = "done",
  todo = "todo",
}