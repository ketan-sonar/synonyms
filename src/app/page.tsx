"use client";

import axios from "axios";
import { RefObject, useEffect, useRef, useState } from "react";

export default function AnotherOne() {
  const [loading, setLoading] = useState(false);
  const [word, setWord] = useState("");
  const [wordToSearch, setWordToSearch] = useState("");
  const [synonyms, setSynonyms] = useState<string[]>([]);
  const inputRef = useRef() as RefObject<HTMLInputElement>;

  const getSynonyms = async () => {
    if (!word) return;

    setLoading(true);
    const res: { data: { success: boolean; synonyms: string[] } } =
      await axios.post("/api/getSynonyms", { word });
    if (res.data.success) {
      setSynonyms(res.data.synonyms.slice(0, 5));
    }
    setLoading(false);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    getSynonyms();
  }, [wordToSearch]);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="container max-w-md">
        <h1 className="text-3xl text-center">Synonyms</h1>
        <hr />
        <div className="flex my-4">
          <input
            className="text-xl px-2 py-1 grow border border-black focus:outline-none rounded-l"
            type="text"
            value={word}
            ref={inputRef}
            onChange={(e) => setWord(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setWordToSearch(word);
                getSynonyms();
              }
            }}
          />
          <button
            className="text-xl bg-black text-white px-2 py-1 rounded-r"
            onClick={() => {
              setWordToSearch(word);
              getSynonyms();
            }}
          >
            Search
          </button>
        </div>
        {loading ? (
          <p className="text-center p-4">Loading...</p>
        ) : synonyms.length === 0 ? (
          <p className="text-center p-4">Nothing to show.</p>
        ) : (
          <div className="container max-w-sm flex justify-center p-4">
            <ul>
              {synonyms.map((s, i) => (
                <li key={i}>
                  <button
                    className="underline text-xl"
                    onClick={() => {
                      setWord(s);
                      setWordToSearch(s);
                    }}
                  >
                    {`${i + 1}. ${s}`}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
