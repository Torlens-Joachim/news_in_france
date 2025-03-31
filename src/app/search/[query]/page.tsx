"use client";
import { use, useEffect, useState } from "react";
import { Ad } from "@/app/types";
import Image from "next/image";
import Link from "next/link";

const SearchPage = ({ params }: { params: Promise<{ query: string }> }) => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { query } = use(params); // Extraire la requête de recherche

  useEffect(() => {
    const getAdsByParams = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/ads?query=${query}`);
        const data = await response.json();
        setAds(data.length > 0 ? data : []);
      } catch (error) {
        console.error("Erreur de chargement :", error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      getAdsByParams();
    }
  }, [query]); // Dépendance sur `query`

  return (
    <div className="m-20">
      <h1>Résultats de la recherche pour: {query}</h1>

      {loading ? (
        <p>Chargement...</p>
      ) : ads.length > 0 ? (
        <>
          {ads.map((ad) => (
            <ul key={ad.id}>
              <li>
                <h2>{ad.title}</h2>
              </li>
              <li>
                <Image
                  alt={ad?.title}
                  src={ad.imageUrl}
                  width={600}
                  height={600}
                  priority
                  className="rounded-lg w-auto h-auto"
                />
              </li>
              <li className="my-4">
                <Link href={`/ads/${ad.id}`} className="bg-blue-300 py-2 px-4 rounded-4xl">
                    Voir l&apos;annonce
                </Link>
              </li>
            </ul>
          ))}
        </>
      ) : (
        /* eslint-disable-next-line react/no-unescaped-entities */
        <p>Il n'y a pas d'annonce correspondant à votre recherche.</p>
      )}
    </div>
  );
};

export default SearchPage;
