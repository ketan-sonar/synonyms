"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function handleSubmit(formData: FormData) {
  const wordToSearch = formData.get("wordToSearch")
  if (wordToSearch && wordToSearch !== "") {
    revalidatePath("/");
    redirect(`?word=${wordToSearch}`);
  }
};
