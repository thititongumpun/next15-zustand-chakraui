"use client";

import { useState } from "react";
import { useExpenseStore } from "@/lib/store";
import { Button, Input } from "@chakra-ui/react";
import {
  NumberInputField,
  NumberInputRoot,
} from "@/components/ui/number-input";
import { toaster } from "@/components/ui/toaster";
import { DatePicker } from "./DatePicker";
import { ExpenseStatus } from "@/lib/expense.types";

export default function AddExpense() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("0");
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const { addExpense } = useExpenseStore();

  const handleAddExpense = async () => {
    await addExpense(selectedDate as Date, title, amount, ExpenseStatus.todo);
    setTitle("");
    setAmount("0");

    await toaster.create({
      title: `Sucess`,
      type: "success",
      description: "Expense added successfully",
      duration: 3000,
    });
  };

  const handleDeleteExpense = async () => {
    const res = await fetch("/api/expenses");
    console.log(await res.json());
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="flex items-center mb-4">
        <DatePicker
          selectedDate={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          placeholderText="Select a date"
        />
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Add a new expense..."
          display="flex"
          flexBasis="1"
          bg="bg.muted"
          color="fg.muted"
          rounded="md"
        />
        <NumberInputRoot
          value={amount}
          onValueChange={(e) => setAmount(e.value)}
          defaultValue={amount}
          width="full"
          bg="bg.muted"
          color="fg.muted"
          rounded="md"
        >
          <NumberInputField />
        </NumberInputRoot>
        <Button
          type="submit"
          disabled={!title}
          onClick={() => {
            handleAddExpense();
          }}
        >
          Add
        </Button>
        <Button onClick={handleDeleteExpense}>Clear</Button>
      </div>
    </form>
  );
}
