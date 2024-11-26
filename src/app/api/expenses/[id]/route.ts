import { NextResponse } from "next/server"
import { getStore } from "@netlify/blobs";

export async function PATCH(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const { status } = await req.json();

    const expense = getStore({ siteID: process.env.BLOB_SITE_ID, token: process.env.BLOB_SITE_KEY, name: "expense" });
    const list = await expense.list()
    const expenseList = [];
    for (const { key } of list.blobs) {
      const value = await expense.get(key, { type: "json" });
      expenseList.push({ key, value })
    }

    if (!id || !status) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const expenseId = parseInt(id, 10);
    const expenseIndex = expenseList.findIndex((expense) => expense.key === expenseId.toString());

    if (expenseIndex === -1) {
      return NextResponse.json({ error: "Expense not found" }, { status: 404 });
    }

    expenseList[expenseIndex].value.status = status;

    await expense.setJSON("" + id, expenseList[expenseIndex].value)

    return NextResponse.json({
      message: "Expense updated successfully",
      expense: expenseList[expenseIndex],
    });
  } catch (error) {
    console.error("Error updating expense:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(_: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json({ error: "Missing id parameter" }, { status: 400 });
    }

    const expense = getStore({ siteID: process.env.BLOB_SITE_ID, token: process.env.BLOB_SITE_KEY, name: "expense" });

    await expense.delete(id)

    return NextResponse.json({
      message: `Delete expense ${id} successfully`,
    });
  } catch (error) {
    console.error("Error delete expense:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}