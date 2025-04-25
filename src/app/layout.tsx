import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Providers from "./Providers";

export const metadata: Metadata = {
  title: "News In France",
  description: "News In France est un site web d'actualité...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="flex flex-col min-h-screen mx-16">
        <Header />
        <main className="flex-grow">
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}