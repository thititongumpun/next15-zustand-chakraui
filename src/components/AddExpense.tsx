import { useState } from "react";
import { useExpenseStore } from "@/lib/store";
import { Button, Input } from "@chakra-ui/react";
import {
  NumberInputField,
  NumberInputRoot,
} from "@/components/ui/number-input";

export default function AddExpense() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("0");
  const { addExpense } = useExpenseStore();

  const handleAddExpense = () => {
    addExpense(title, amount);
    setTitle("");
    setAmount("0");
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="flex items-center mb-4">
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
        <Button type="submit" disabled={!title} onClick={handleAddExpense}>
          Add
        </Button>
      </div>
    </form>
  );
}
