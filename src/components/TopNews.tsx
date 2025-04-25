"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoIosBookmark } from "react-icons/io";
import { Article } from "@/app/types/types";
import { useDispatch, useSelector } from "react-redux";
import { bookmark } from "@/app/types/types";
import { addBookmark, removeBookmark } from "@/reducers/bookmarks";

const TopNews = (props: Article | bookmark) => {
  const bookmarks = useSelector(
    (state: { bookmarks: { value: bookmark[] } }) => state.bookmarks.value
  );

  const isBookmarked = bookmarks.some((e) => e.link === props.link);

  const dispatch = useDispatch();

  const fallbackImage = "/default-news.webp";

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

  if (!props || !props.title) return null;

  return (
    <div className="bg-white h-[400px] w-full max-w-4xl flex flex-col md:flex-row overflow-hidden rounded-xl shadow-md">
      {/* Image */}
      <div className="relative w-full md:w-1/2 h-[200px] md:h-auto">
        {props.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={props.image_url}
            alt={props.title}
            className="object-cover w-full h-full"
          />
        ) : (
          <Image
            src={fallbackImage}
            alt="Image par défaut"
            fill
            className="object-cover"
            priority
          />
        )}
      </div>

      {/* Contenu */}
      <div className="p-6 flex flex-col justify-between w-full md:w-1/2 space-y-4">
        <div className="flex justify-between items-start flex-shrink-0">
          <h1 className="text-lg font-bold line-clamp-3">{props.title}</h1>
          <IoIosBookmark
            className={
              isBookmarked
                ? "text-3xl text-[#E9B959] cursor-pointer mt-1"
                : "text-3xl text-gray-500 cursor-pointer mt-1"
            }
            onClick={handleToggleBookmark}
          />
        </div>
        <div className="flex justify-between items-center">
          <h4 className="text-sm text-gray-600">
            {props.creator || "Auteur inconnu"}
          </h4>
          <Link className="text-cyan-600" href={props.link} target="_blank">
            Voir plus
          </Link>
        </div>
        <p className="text-sm text-gray-700 line-clamp-3">
          {props.description || "Pas de description."}
        </p>
      </div>
    </div>
  );
};

export default TopNews;
