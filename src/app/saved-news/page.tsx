"use client";
import News from "@/components/News";
import React, { JSX } from "react";
import { useSelector } from "react-redux";
import { bookmark } from "@/app/types/types";

const SavedNews = () => {
  const bookmarks = useSelector(
    (state: { bookmarks: { value: bookmark[] } }) => state.bookmarks.value
  );

  let savedNews: JSX.Element | JSX.Element[] = (
    <p className="text-center">Pas d&apos;article enregistré</p>
  );
  if (bookmarks?.length > 0) {
    savedNews = bookmarks?.map((bookmark, i) => {
      const isBookmarked = bookmarks.some((e) => e.link === bookmark.link);

      return <News key={i} {...bookmark} isBookmarked={isBookmarked} />;
    });
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{savedNews}</div>
  );
};

export default SavedNews;
