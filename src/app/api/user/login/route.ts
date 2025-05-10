import "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/Users";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
    try {
        const { username, password } = await req.json();

    if(!username || !password) {
        return NextResponse.json(
            { error: "Tous les champs sont requis" },
            { status: 400 }
          );
    };

    const existingUser = await User.findOne({ username });
    if(!existingUser) {
        return NextResponse.json(
            { error: "Cet utilisateur n'existe pas" },
            { status: 400 }
          );
    }

    const passwordHashed = existingUser.password;
    const isValidPassword = await bcrypt.compare(password, passwordHashed);
    if(!isValidPassword) {
        return NextResponse.json(
            { error: "Vos identifiants sont incorrects" },
            { status: 400 }
          );
    }

    return NextResponse.json(
        { token: existingUser.token },
        { status: 200 }
      );
    } catch (error) {
        console.error("Erreur POST /login:", error);
        return NextResponse.json(
          { status: 500, error: "Erreur serveur." },
          { status: 500 }
        );
    }
}