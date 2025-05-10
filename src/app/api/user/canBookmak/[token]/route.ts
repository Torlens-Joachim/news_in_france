import "@/lib/db";
import User from "@/models/Users";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { token: string } }) {
  try {
    const { token } = params;

    const user = await User.findOne({ token });
    if (!user) {
      return NextResponse.json({
        result: false,
        error: "Utilisateur non trouvé",
      });
    }

    console.log(user?.username);

    return NextResponse.json({ result: true, canBookmark: user.canBookmark });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { result: false, error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
