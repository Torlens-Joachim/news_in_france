"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const navLinks = [
  {
    name: "Accueil",
    to: "/",
  },
  {
    name: "Déposer une annonce",
    to: "/add/announce",
  },
  {
    name: "Se connecter",
    to: "/login",
  },
];

const Header = () => {
  const [currentPath, setCurrentPath] = useState <string | null>(null);
  const [searchQuery, setSearchQuery] = useState <string>("");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(()=>{
    setCurrentPath(pathname);
  }, [pathname]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(searchQuery.trim()) {
      router.push(`/search/${searchQuery.toLowerCase()}`);
      setSearchQuery("");
    }
  }

  return (
    <header className="bg-amber-200 py-2">
      <nav className="flex justify-between items-center">
        <Link
          href={"/"}
          className="ml-4 border-2 border-black py-1 px-2 text-amber-600 rounded-sm text-2xl"
        >
          Trouves-Tout
        </Link>
        <div className="text-black">
          <form onSubmit={handleSearchSubmit}>
            <input
              className="px-2 border-1 rounded-sm text-black"
              type="text"
              placeholder="Faire une recherche"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}  // Met à jour le terme de recherche
            />
            <input
              type="submit"
              className="bg-amber-400 rounded-sm px-1 py-0.5 ml-2 cursor-pointer"
            />
          </form>
        </div>
        <ul className="flex">
          {navLinks.map((link) => {
            const isActive: boolean= currentPath === link.to;
            
            return (
              <li key={link.name} className="mr-4">
                <Link
                  key={link.name}
                  className={`hover:text-amber-600 transition duration-300 text-black ${
                    isActive ? "text-amber-600 font-bold" : ""
                  }`}
                  href={link.to}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default Header;