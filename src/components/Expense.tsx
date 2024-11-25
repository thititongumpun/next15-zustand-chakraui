import { Checkbox } from "@/components/ui/checkbox";
import { Button, Text } from "@chakra-ui/react";
import { ExpenseStatus, type Expense } from "@/lib/expense.types";
import { useExpenseStore } from "@/lib/store";
import { ChakraBox } from "./ChakraBox";
import { LuTrash2 } from "react-icons/lu";
import { useCopilotAction } from "@copilotkit/react-core";
import { toaster } from "./ui/toaster";
import { format } from "date-fns";

export default function Expense({
  expense: { id, title, amount, date, status },
}: {
  expense: Expense;
}) {
  const { setExpenseStatus, deleteExpense } = useExpenseStore();

  useCopilotAction({
    name: "setExpenseStatus",
    description: "Sets the status of a expense",
    parameters: [
      {
        name: "id",
        type: "number",
        description: "The id of the expense",
        required: true,
      },
      {
        name: "status",
        type: "string",
        description: "The status of the expense",
        enum: Object.values(ExpenseStatus),
        required: true,
      },
    ],
    handler: ({ id, status }) => {
      setExpenseStatus(id, status);
    },
  });

  return (
    <ChakraBox
      key={`${id}_${status}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      display="flex"
      alignItems="center"
      gap="4"
      padding="2"
      rounded="md"
      bg="bg.muted"
    >
      <Checkbox
        id={`expense${id}`}
        onClick={() =>
          setExpenseStatus(
            id,
            status === ExpenseStatus.done
              ? ExpenseStatus.todo
              : ExpenseStatus.done
          )
        }
        checked={status === ExpenseStatus.done}
      />
      <Text fontSize="sm" color="ActiveBorder" fontWeight="medium">
        EXPENSE-{id}
      </Text>
      <Text
        fontSize="sm"
        textDecoration={status === ExpenseStatus.done ? "line-through" : "none"}
      >
        {format(date, "dd/MM/yyyy")} {title} {amount}
      </Text>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          deleteExpense(id);
          toaster.create({
            title: `Sucess`,
            type: "info",
            description: `Deleted ${title} successfully`,
            duration: 3000,
          });
        }}
      >
        <LuTrash2 width="4" height="4" />
        <span className="sr-only">Delete</span>
      </Button>
    </ChakraBox>
  );
}
