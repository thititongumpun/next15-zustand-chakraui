"use client";

import { useState } from "react";
import { useExpenseStore } from "@/lib/store";
import { Input, VStack, Text, HStack } from "@chakra-ui/react";
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
    <VStack as="form" onSubmit={(e) => e.preventDefault()} align="stretch">
      <Text fontSize="xl" fontWeight="bold">
        Add New Expense
      </Text>
      <HStack spaceX={4}>
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
          bg="bg.muted"
          color="fg.muted"
          rounded="md"
          flex={1}
        />
      </HStack>
      <HStack spaceX={4}>
        <NumberInputRoot
          value={amount}
          onValueChange={(e) => setAmount(e.value)}
          defaultValue={amount}
          width="full"
          bg="bg.muted"
          color="fg.muted"
          rounded="md"
        >
          <NumberInputField placeholder="Amount" />
        </NumberInputRoot>
        <Button
          type="submit"
          loading={isLoading}
          loadingText="Saving..."
          disabled={!title}
          onClick={handleAddExpense}
          colorScheme="blue"
          width="150px"
        >
          Add Expense
        </Button>
      </HStack>
    </VStack>
  );
}
