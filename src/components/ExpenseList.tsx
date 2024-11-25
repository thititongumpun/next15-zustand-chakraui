"use client";

import { ExpenseStatus } from "@/lib/expense.types";
import { useExpenseStore } from "@/lib/store";
import { AnimatePresence } from "framer-motion";
import Expense from "./Expense";
import { Box, Container, Text } from "@chakra-ui/react";
import AddExpense from "./AddExpense";

export default function TasksList() {
  const { expenses } = useExpenseStore();
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
            .map((expense) => (
              <Expense key={expense.id} expense={expense} />
            ))}
        </AnimatePresence>
      </Box>
    </Container>
  );
}
