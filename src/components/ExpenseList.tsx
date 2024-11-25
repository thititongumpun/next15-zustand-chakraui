"use client";

import { useEffect } from "react";
import { ExpenseStatus } from "@/lib/expense.types";
import { useExpenseStore } from "@/lib/store";
import { AnimatePresence } from "framer-motion";
import Expense from "./Expense";
import { Box, Container, Text } from "@chakra-ui/react";
import AddExpense from "./AddExpense";
import { ColorModeButton } from "./ui/color-mode";

export default function ExpensesList() {
  const { expenses, fetchExpenses } = useExpenseStore();

  console.log(expenses);

  useEffect(() => {
    fetchExpenses(); // Fetch expenses on component mount
  }, [fetchExpenses]);

  if (!expenses) {
    return <>loading....</>;
  }

  return (
    <Container
      h="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
      padding={8}
      md={{ padding: 24 }}
    >
      <Box
        display="flex"
        flexDirection="column"
        gap={4}
        minW="full"
        md={{ minWidth: "500px" }}
      >
        <ColorModeButton />
        <Text fontSize="2xl" fontWeight="bold">
          ✍️ My Expenses
        </Text>
        <AddExpense />
        <AnimatePresence>
          {expenses
            .sort((a, b) => {
              if (a.status === b.status) {
                return a.id - b.id;
              }
              return a.status === ExpenseStatus.todo ? -1 : 1;
            })
            .map((expense, idx) => (
              <Expense key={idx} expense={expense} />
            ))}
        </AnimatePresence>
      </Box>
    </Container>
  );
}
