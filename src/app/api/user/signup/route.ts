import "@/lib/db";
import User from "@/models/Users";
import uid2 from "uid2";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { username, password, confirmPassword } = await req.json();

    // Vérification des champs
    if (!username || !password || !confirmPassword) {
      return NextResponse.json(
        { status: 400, error: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { status: 400, error: "Les mots de passe ne correspondent pas." },
        { status: 400 }
      );
    }

    if (username.length < 4) {
      return NextResponse.json(
        {
          status: 400,
          error: "veuillez entrer un pseudonyme d'au moins 4 caractères",
        },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        {
          status: 400,
          error: "veuillez entrer un mot de passe d'au moins 8 caractères",
        },
        { status: 400 }
      );
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return NextResponse.json(
        { status: 409, error: "Ce nom d'utilisateur est déjà pris." },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    // Créer un nouvel utilisateur
    await User.create({
      username,
      password: passwordHash,
      token: uid2(32),
    });

    return NextResponse.json(
      { status: 201, message: "Vous pouvez maintenant vous connecter !" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur POST /register:", error);
    return NextResponse.json(
      { status: 500, error: "Erreur serveur." },
      { status: 500 }
    );
  }
};