import SynonymsInput from "@/app/components/synonyms-input";
import SynonymsList from "@/app/components/synonyms-list";

type SynonymsPageProps = {
  searchParams: { [key: string]: string | undefined };
};

export default async function SynonymsPage({
  searchParams,
}: SynonymsPageProps) {
  const word = searchParams["word"];

  return (
    <main className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="w-full max-w-sm h-full md:max-h-96 overflow-y-scroll border border-black p-4 flex flex-col gap-4">
        <SynonymsInput word={word} />
        {word ? (
          <SynonymsList word={word} />
        ) : (
          <p className="text-slate-600 text-center">
            Enter a word to know its synonyms...
          </p>
        )}
      </div>
    </main>
  );
}
