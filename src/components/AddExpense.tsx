"use client";

import { useState } from "react";
import { useExpenseStore } from "@/lib/store";
import { Input } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import {
  NumberInputField,
  NumberInputRoot,
} from "@/components/ui/number-input";
import { toaster } from "@/components/ui/toaster";
import { DatePicker } from "./DatePicker";
import { ExpenseStatus } from "@/lib/expense.types";
import { useCopilotAction } from "@copilotkit/react-core";

export default function AddExpense() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("0");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const { addExpense } = useExpenseStore();

  useCopilotAction({
    name: "addExpense",
    description: "Sets the status of a expense",
    parameters: [
      {
        name: "selectedDate",
        type: "string",
        description: "The expense date",
      },
      {
        name: "title",
        type: "string",
        description: "The title of the expense",
        required: true,
      },
      {
        name: "amount",
        type: "string",
        description: "The amount of the expense",
        required: true,
      },
      {
        name: "status",
        type: "string",
        description: "The status of the expense",
        enum: Object.values(ExpenseStatus),
      },
    ],
    handler: ({ title, amount }) => {
      addExpense(selectedDate as Date, title, amount, ExpenseStatus.todo);
    },
  });

  const handleAddExpense = async () => {
    setIsLoading(true);
    await addExpense(selectedDate as Date, title, amount, ExpenseStatus.todo);
    setIsLoading(false);
    setTitle("");
    setAmount("0");

    await toaster.create({
      title: `Sucess`,
      type: "success",
      description: "Expense added successfully",
      duration: 3000,
    });
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
        {/* <Button
          type="submit"
          disabled={!title}
          onClick={() => {
            handleAddExpense();
          }}
        >
          Add
        </Button> */}
        <Button
          type="submit"
          loading={isLoading}
          loadingText="Saving..."
          disabled={!title}
          onClick={() => {
            handleAddExpense();
          }}
        >
          Add
        </Button>
      </div>
    </form>
  );
}
