'use client'
import AnnoucementCard from "@/components/AnnoucementCard";
import Hero from "@/components/Hero";
// import { ads } from "./data";
import { useEffect, useState } from "react";

interface Announcement {
  id: number,
  title: string,
  description: string,
  price: number,
  imageUrl: string
}

export default function Home() {
  const [ads, setAds] = useState <Announcement[]>([]);

  const getAds = async () => {
    try {
      const response = await fetch('/api/ads');
      const data: Announcement[] = await response.json();

      setAds(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getAds();
  }, []);

  const ad = ads.map((ad) => <AnnoucementCard key={ad.id} {...ad} />);

  return (
    <>
      <section>
        <Hero />
      </section>
      <section className=" bg-amber-100">
        <p className="text-center text-4xl text-black mb-2">Les annonces</p>

        {/* Grille de cartes d'annonces */}
        <div className="mx-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {ad}
        </div>
      </section>
    </>
  );
}
