"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function action(word: string) {
  revalidatePath("/");
  redirect(`?word=${word}`);
}
