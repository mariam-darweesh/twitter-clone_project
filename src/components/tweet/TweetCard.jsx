/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Heart, MessageCircle, Repeat2, Share, Trash2 } from "lucide-react";
import CommentSection from "@/components/comment/CommentSection";

export default function TweetCard({ tweet, onLike, onComment, onDelete }) {

  const { data: session } = useSession();
  const [showComments, setShowComments] = useState(false);

  console.log("TWEET:", tweet);
  console.log("LIKES:", tweet.likes);
  console.log("LIKES TYPE:", typeof tweet.likes);

  const authorId =
    typeof tweet.author === "object" ? tweet.author._id : tweet.author;

  const isOwner = session?.user?.id === authorId?.toString();
  const author = tweet.author || {
      name: "Unknown User",
      username: "unknown",
      avatar: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
    };

  const likesArray = Array.isArray(tweet.likes) ? tweet.likes : [];

  const likesCount = likesArray.length;

  const isLiked = likesArray.some(
    (likeId) => likeId.toString() === session?.user?.id
  );

  return (
    <article className="border-b border-[#2f3336] px-4 py-3 transition hover:bg-white/[0.03]" >
      <div className="flex gap-3">
        <img
          src={author.avatar}
          alt={author.username}
          width={44}
          height={44}
          className="h-11 w-11 rounded-full"
        />

        <div className="flex-1" >
          <div className="flex items-center gap-1 text-sm">
            <span className="font-bold text-white">{author.name}</span>
            <span className="text-gray-500">@{author.username}</span>
            <span className="text-gray-500">·</span>
            <span className="text-gray-500">{tweet.createdAt}</span>
          </div>
          <Link href={`/tweet/${tweet._id}`} className="hover:bg-gray-900">
            <p className="mt-2 text-[15px] leading-relaxed text-gray-100">
              {tweet.content}
            </p>
          </Link>
          <div className="mt-4 flex max-w-md justify-between text-gray-500">
            <button
              onClick={() => setShowComments((prev) => !prev)} 
              className="flex items-center gap-2 hover:text-sky-500">
              <MessageCircle size={18} />
              {tweet.commentsCount || 0}
            </button>
            
            <button className="hover:text-green-500">
              <Repeat2 size={18} />
            </button>

            <button
              onClick={() => onLike?.(tweet._id)}
              className={`flex items-center gap-2 transition
              ${ isLiked ? "text-pink-500" : "text-gray-500 hover:text-pink-500"}`}
            >
              <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
              {likesCount}
            </button>

            <button className="hover:text-sky-500">
              <Share size={18} />
            </button>

              {isOwner && (
                <button
                  onClick={() => onDelete(tweet._id)}
                  className="transition hover:text-red-500"
                >
                  <Trash2 size={18} />
                </button>
              )}
          </div>
            {showComments && (
              <CommentSection
                tweetId={tweet._id}
                onCommentAdded={onComment}
                onCommentDeleted={(tweetId) => onComment(tweetId, "delete")}
              />
            )}
        </div>
      </div>
    </article>
  );
}