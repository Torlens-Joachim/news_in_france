import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Trouves-tout",
  description: "Un site comme Leboncoin où l'utilisateur a la capacité de créer, lire, modifier et supprimer une annonce, certaines de ses fonctionnalités nécessiteront d'être connecté, etc",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className="flex flex-col min-h-screen"
      >
        <Header />
        <main className="flex-grow">{children}</main>
      <Footer />
      </body>
    </html>
  );
}
