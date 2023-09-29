"use client";

import axios from "axios";
import { RefObject, useEffect, useRef, useState } from "react";

const API_URL = "https://api.api-ninjas.com/v1/thesaurus?word=";

export default function Home() {
  const [word, setWord] = useState("");
  const [synonyms, setSynonyms] = useState<string[]>([]);
  const inputRef = useRef() as RefObject<HTMLInputElement>;

  const getSynonyms = async () => {
    const res = await axios.get(API_URL + word, {
      headers: { "X-Api-Key": "gyyejB4K8GtHf0ukzl4pHA==Hw766ayiyKPPmn1Z" },
    });
    setSynonyms(res.data.synonyms);
  };

  useEffect(() => {
    if (word) getSynonyms();
    inputRef.current?.focus();
  }, [word, getSynonyms]);

  const handleClickWord = (w: string) => {
    setWord(w);
    getSynonyms();
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="container max-w-md flex flex-col rounded border p-6">
        <h1 className="text-3xl text-center">Synonyms</h1>
        <hr className="w-full" />
        <div className="WordInput my-2 flex">
          <input
            className="px-2 py-1 grow text-xl border border-black rounded-l focus:outline-none"
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && getSynonyms()}
            ref={inputRef}
          />
          <button
            className="bg-black text-white px-2 py-1 text-xl rounded-r"
            onClick={getSynonyms}
          >
            Search
          </button>
        </div>
        <div className="SynonymsList text-xl flex justify-center p-4">
          <ul className="space-y-2">
            {synonyms.slice(0, 5).map((s, i) => (
              <li key={i}>
                <button
                  className="underline"
                  onClick={() => handleClickWord(s)}
                >
                  {`${i + 1}. ${s}`}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
