"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Ad } from "@/app/types";

import { use, useCallback, useEffect, useState } from "react";

export default function AdDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [ad, setAd] = useState<Ad>();

  // Unwrap la promesse 'params' pour obtenir l'id
  const { id } = use(params);
  const router = useRouter();

  // Fetching
  const getAdById = useCallback(async () => {
    try {
      const response = await fetch(`/api/ads/${id}`);
      if (!response.ok) {
        router.push("/not-found");
        return;
      }
      const data = await response.json();
      setAd({ ...data });
    } catch (error) {
      console.log(error);
    }
  }, [id, router]);

  useEffect(() => {
    if (id) {
      getAdById();
    }
  }, [id, getAdById]);

  if (!ad?.id) {
    return <p className="text-white">Chargement...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">{ad.title}</h1>
      <Image
        src={ad.imageUrl}
        alt={ad.title}
        width={600}
        height={400}
        priority
        className="rounded-lg object-cover w-auto h-auto"
      />

      <p className="mt-4 text-gray-600">{ad.description}</p>
      <p className="mt-2 text-lg font-semibold text-amber-600">{ad.price} €</p>
    </div>
  );
}
