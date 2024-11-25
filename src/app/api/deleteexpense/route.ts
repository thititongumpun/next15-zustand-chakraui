import { getStore } from "@netlify/blobs";

export async function DELETE(id: string) {
  const expense = getStore({ siteID: process.env.BLOB_SITE_ID, token: process.env.BLOB_SITE_KEY, name: "expense" });
  await expense.delete(id)

  return Response.json({ message: "delete success" })
}