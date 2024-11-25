'use server';
import { getStore } from '@netlify/blobs';

export async function setBlob() {
  const expense = getStore('expense');
  await expense.setJSON('expense', "foo");

  return new Response("Nail blobs set for Construction and Beauty stores");
}
