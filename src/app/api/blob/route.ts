import { getStore } from "@netlify/blobs";

export async function POST(req: Request) {
  const { id, date, title, amount, status } = await req.json()
  const expense = getStore({ siteID: process.env.BLOB_SITE_ID, token: process.env.BLOB_SITE_KEY, name: "expense" });

  await expense.setJSON("" + id, { date, title, amount, status })

  return Response.json({ message: 'Created Expense successfully' })
}