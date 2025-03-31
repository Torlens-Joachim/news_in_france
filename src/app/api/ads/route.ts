import { ads } from "@/app/data";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const requestParams = req.nextUrl.searchParams;
    const query = requestParams.get('query');
    // Filtrer les annonces par titre en ignorant la casse
    const filteredAd = query ? ads.filter(el => el.title.toLowerCase().includes(query.toLowerCase())) : ads;

    return NextResponse.json(filteredAd);
};