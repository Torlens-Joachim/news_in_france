"use client";
import News from "@/components/News";
import React, { useEffect, useState } from "react";
import { Article } from "./types/types";
import TopNews from "@/components/TopNews";

const Home = () => {
  const [topNews, setTopNews] = useState<Article>();
  const [newsData, setNewsData] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const newsFetching = async () => {
      try {
        const response = await fetch("api/news");
        const data = await response.json();
        if (data.status !== "success") {
          return console.log("Aucun article n'a été trouvé");
        }

        setTopNews(data.results[0]);
        setNewsData(data.results.slice(1));
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(true);
      }
    };

    newsFetching();
  }, []);

  const news = newsData.map((data, i) => {
    return <News key={i} {...data} isBookmarked={data.isBookmarked} />;
  });

  if (loading) {
    return <p>Chargement...</p>;
  }

  return (
    <section className="px-4 lg:px-12 py-8">
      {/* Article principal */}
      <section className="flex justify-center mb-14">
        {topNews && <TopNews {...topNews} isBookmarked />}
      </section>

      {/* Grid des news */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{news}</div>
    </section>
  );
};

export default Home;
