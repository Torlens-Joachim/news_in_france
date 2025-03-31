import { ads } from "@/app/data";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const adById = ads.find(el => el.id === parseInt(params?.id));

    return Response.json(adById);
}