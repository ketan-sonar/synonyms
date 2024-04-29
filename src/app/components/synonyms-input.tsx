"use client";

import { useRouter } from "next/navigation";

type SynonymsInputProps = {
  word: string | undefined;
};

export default function SynonymsInput({ word }: SynonymsInputProps) {
  const router = useRouter();

  const handleSubmit = (formData: FormData) => {
    const wordToSearch = formData.get("wordToSearch")
    if (wordToSearch && wordToSearch !== "") {
      router.push(`?word=${wordToSearch}`);
    }
  };

  return (
    <form action={handleSubmit} className="flex w-full">
      <input
        type="text"
        name="wordToSearch"
        className="flex-1 focus:outline-0 border border-black px-3 py-2"
        defaultValue={word}
      />
      <button
        type="submit"
        className="focus:outline-0 focus:scale-105 bg-black text-white font-semibold px-3 py-2"
      >
        Search
      </button>
    </form>
  );
}
