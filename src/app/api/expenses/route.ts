import { getStore } from "@netlify/blobs";

export async function GET() {
  const expense = getStore({ siteID: process.env.BLOB_SITE_ID, token: process.env.BLOB_SITE_KEY, name: "expense" });
  const list = await expense.list()
  const expenseList = [];
  for (const { key } of list.blobs) {
    const value = await expense.get(key, { type: "json" });
    expenseList.push({ key, value })
  }

  return Response.json({ expenseList })
}