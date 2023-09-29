import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const API_URL = "https://api.api-ninjas.com/v1/thesaurus?word=";

async function handler(req: NextRequest) {
  const reqBody: { word: string } = await req.json();
  const word = reqBody.word;
  const res: { data: { synonyms: string[] } } = await axios.get(
    API_URL + word,
    {
      headers: { "X-Api-Key": process.env.API_KEY as string },
    }
  );
  return NextResponse.json({
    success: true,
    synonyms: res.data.synonyms,
  });
}

export { handler as POST };
