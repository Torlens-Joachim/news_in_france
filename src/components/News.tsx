"use client";
import { Article } from "@/app/types/types";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoIosBookmark } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { addBookmark, removeBookmark } from "@/reducers/bookmarks";
import { bookmark } from "@/app/types/types";

const News = (props: Article | bookmark) => {
  const [loading, setLoading] = useState<boolean>(true);

  const bookmarks = useSelector(
    (state: { bookmarks: { value: bookmark[] } }) => state.bookmarks.value
  );

  // isBookmarked pour la couleur
  const isBookmarked = bookmarks.some((b) => b.link === props.link);

  const dispatch = useDispatch();

  const fallbackImage = "/default-news.webp"; // Je prend une image du dossier "public/"

  const handleToggleBookmark = () => {
    const isAllReadyExist = bookmarks.some((e) => e.link === props.link);

    const newBookmark = {
      image_url: props.image_url || fallbackImage,
      title: props.title,
      creator: props.creator,
      link: props.link,
      isBookmarked: props.isBookmarked,
    };

    if (!isAllReadyExist) {
      dispatch(addBookmark(newBookmark));
    } else {
      dispatch(removeBookmark(newBookmark));
    }
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <p>Chargement...</p>;
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col justify-between">
      {/* Image */}
      <div className="w-full h-[200px] relative">
        {props.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="object-cover w-full h-full"
            src={props.image_url}
            alt={props.title}
          />
        ) : (
          <Image
            className="object-cover"
            alt="Image par défaut"
            src={fallbackImage}
            fill
            sizes="(max-width: 768px) 100vw, 430px"
            priority
          />
        )}
      </div>

      {/* Contenu */}
      <div className="p-4 space-y-2">
        <div className="flex justify-between items-start gap-2">
          <h1 className="text-sm font-semibold line-clamp-2 w-full">
            {props.title}
          </h1>
          <div className="flex-shrink-0">
            <IoIosBookmark
              onClick={handleToggleBookmark}
              className={
                isBookmarked
                  ? "text-xl text-[#E9B959] cursor-pointer"
                  : "text-xl text-gray-500 cursor-pointer"
              }
            />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <h4 className="text-xs text-gray-600">
            {props.creator || "Auteur inconnu"}
          </h4>
          <Link className="text-cyan-600" href={props.link} target="_blank">
            Voir plus
          </Link>
        </div>
      </div>
    </div>
  );
};

export default News;
