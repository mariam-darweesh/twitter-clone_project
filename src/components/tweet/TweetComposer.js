/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { Image, Smile } from "lucide-react";

export default function TweetFeed({ onAddTweet }) {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!content.trim()) return;

    onAddTweet(content);

    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="border-b border-[#2f3336] px-4 py-3 transition hover:bg-white/[0.03]">
      <div className="flex gap-3">
        <img
          src="https://i.pravatar.cc/100?img=12"
          alt="Ahmed"
          className="h-11 w-11 rounded-full"
        />

        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What is happening?!"
            rows={3}
            className="w-full resize-none bg-transparent text-xl outline-none placeholder:text-gray-500"
          />

          <div className="mt-3 flex items-center justify-between border-t border-gray-800 pt-3">
            <div className="flex gap-4 text-sky-500">
              <Image size={20} />
              <Smile size={20} />
            </div>

            <button
              disabled={!content.trim()}
              className="rounded-full bg-sky-500 px-5 py-2 font-bold text-white transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Tweet
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}