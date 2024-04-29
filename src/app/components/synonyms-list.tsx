"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import goToLink from "@/app/actions/link";

const BASE_URL = "https://api.datamuse.com/words";

type Synonym = {
  word: string;
  score: number;
};

type SynonymsListProps = {
  word: string;
};

export default function SynonymsList({ word }: SynonymsListProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [synonyms, setSynonyms] = useState<Synonym[]>([]);

  useEffect(() => {
    (async () => {
      const res = await axios.get(`${BASE_URL}?rel_syn=${word}`);
      if (res.status !== 200) {
        setIsError(true);
        return;
      }
      let newSynonyms: Synonym[] = res.data;
      newSynonyms.sort((a, b) => a.score - b.score);
      newSynonyms = newSynonyms.slice(0, 10);
      setSynonyms(newSynonyms);
      setIsLoading(false);
    })();
  }, []);

  if (isError) {
    return (
      <p className="text-red-500">Could not get the synonyms for {word}!</p>
    );
  }

  if (isLoading) {
    return (
      <p className="text-green-500">Loading...</p>
    );
  }

  return (
    <ul className="list-decimal pl-8">
      {synonyms.map((synonym) => (
        <li key={synonym.word}>
          <button className="underline" onClick={() => goToLink(synonym.word)}>
            {synonym.word}
          </button>
        </li>
      ))}
    </ul>
  );
}
