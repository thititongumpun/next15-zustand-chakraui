"use client";

import { CopilotSidebar } from "@copilotkit/react-ui";
import ExpenseList from "@/components/ExpenseList";

export default function Home() {
  return (
    <CopilotSidebar
      defaultOpen={false}
      instructions={
        "You are assisting the user as best as you can. Answer in the best way possible given the data you have."
      }
      labels={{
        title: "Sidebar Assistant",
        initial: "How can I help you today?",
      }}
    >
      <ExpenseList />
    </CopilotSidebar>
  );
}
