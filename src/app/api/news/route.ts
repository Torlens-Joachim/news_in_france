import fetch from "node-fetch";
import { NextResponse } from "next/server";

const newsApi: string = `https://newsdata.io/api/1/latest?country=fr&apiKey=${process.env.API_KEY}`;

export async function GET() {
  try {
    const response = await fetch(newsApi);
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des news :", error);
    return NextResponse.json({ error: "Erreur lors de la récupération des actualités." }, { status: 500 });
  }
}
