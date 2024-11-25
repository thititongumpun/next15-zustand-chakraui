import { TZDate } from "@date-fns/tz";
import { Expense, ExpenseStatus } from "./expense.types";

export const defaultLists: Expense[] = [
  {
    id: 1,
    title: "กินข้าว",
    amount: "200",
    date: new TZDate(2024, 11, 25, "Asia/Singapore"),
    status: ExpenseStatus.done,
  },
  {
    id: 2,
    title: "กินหมาล่า",
    amount: "500",
    date: new TZDate(2024, 11, 25, "Asia/Singapore"),
    status: ExpenseStatus.done,
  },
  {
    id: 3,
    title: "ชาไข่มุก",
    amount: "150",
    date: new TZDate(2024, 11, 25, "Asia/Singapore"),
    status: ExpenseStatus.todo,
  },
  {
    id: 4,
    title: "บุฟเฟ่หมาล่า",
    amount: "500",
    date: new TZDate(2024, 11, 25, "Asia/Singapore"),
    status: ExpenseStatus.todo,
  },
  {
    id: 5,
    title: "ค่ารถไฟ",
    amount: "800",
    date: new TZDate(2024, 11, 25, "Asia/Singapore"),
    status: ExpenseStatus.todo,
  },
];