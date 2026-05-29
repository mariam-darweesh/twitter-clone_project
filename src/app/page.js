"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Sidebar from "@/components/layout/Sidebar";
import Rightbar from "@/components/layout/Rightbar";
import MobileNav from "@/components/layout/MobileNav";
import TweetFeed from "@/components/tweet/TweetFeed";
import TweetComposer from "@/components/tweet/TweetComposer";

export default function Home() {
  const router = useRouter();
  const { status } = useSession();

  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    if (status !== "authenticated") return;

    async function getTweets() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch("/api/tweets", {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch tweets");
        }

        const data = await res.json();
        setTweets(data);
      } catch (error) {
        console.error(error);
        setError("Something went wrong while loading tweets.");
      } finally {
        setLoading(false);
      }
    }

    getTweets();
  }, [status, router]);

  async function handleAddTweet(content) {
    if (!content.trim()) return;

    try {
      const res = await fetch("/api/tweets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });

      if (!res.ok) {
        throw new Error("Failed to create tweet");
      }

      const newTweet = await res.json();
      setTweets((prevTweets) => [newTweet, ...prevTweets]);
    } catch (error) {
      console.error(error);
      setError("Could not post tweet. Please try again.");
    }
  }

  async function handleLikeTweet(id) {
    try {
      const res = await fetch(`/api/tweets/${id}/like`, {
        method: "PATCH",
      });

      if (!res.ok) {
        throw new Error("Failed to like tweet");
      }

      const updatedTweet = await res.json();

      setTweets((prevTweets) =>
        prevTweets.map((tweet) =>
          tweet._id === updatedTweet._id ? updatedTweet : tweet
        )
      );
    } catch (error) {
      console.error(error);
      setError("Could not update like. Please try again.");
    }
  }

  // async function handleCommentTweet(id, content){
  //   if(!content.trim()) return;

  //   const res = await fetch(`/api/tweets/${id}/comments`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ content }),
  //   });

  //   if(!res.ok) return;

  //   setTweets((prevTweets) =>
  //     prevTweets.map((tweet) =>
  //       tweet._id === id ? { ...tweet, commentsCount: tweet.commentsCount + 1 } : tweet
  //     )
  //   );
  // }

  function handleCommentTweet(tweetId) {
    setTweets((prevTweets) =>
      prevTweets.map((tweet) =>
        tweet._id === tweetId
          ? { ...tweet, commentsCount: (tweet.commentsCount || 0) + 1 }
          : tweet
      )
    );
  }
  
  if (status === "loading") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        <p className="text-gray-400">Loading Twitter...</p>
      </main>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

  return (
    <main className="min-h-screen bg-black pb-20 text-white md:pb-0">
      <div className="mx-auto grid max-w-[1265px] grid-cols-1 md:grid-cols-[275px_minmax(0,600px)] lg:grid-cols-[275px_minmax(0,600px)_350px]">
        <Sidebar />

        <section className="min-h-screen bg-black">
        <header className="sticky top-0 z-20 border-b border-[#2f3336] bg-black/80 px-4 py-4 backdrop-blur-md">
          <h1 className="text-2xl font-extrabold tracking-tight text-white">
            Home
          </h1>
        </header>

        <div className="border-b border-[#2f3336]">
          <TweetComposer onAddTweet={handleAddTweet} />
        </div>

        {error && (
          <div className="border-b border-[#2f3336] bg-red-950/40 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}
          {/* The loading state will show a skeleton loader, while the empty state will show a welcome message. */}
          {loading ? (
            <div className="space-y-4 p-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="animate-pulse border-b border-[#2f3336] pb-4">
                  <div className="flex gap-3">
                    <div className="h-12 w-12 rounded-full bg-gray-800" />
                    <div className="flex-1 space-y-3">
                      <div className="h-4 w-1/3 rounded bg-gray-800" />
                      <div className="h-4 w-full rounded bg-gray-800" />
                      <div className="h-4 w-3/4 rounded bg-gray-800" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : tweets.length === 0 ? (
            <div className="px-8 py-16 text-center">
              <h2 className="text-2xl font-extrabold text-white">
                Welcome to your timeline
              </h2>
              <p className="mt-2 text-gray-500">
                When people post tweets, they’ll show up here.
              </p>
            </div>
          ) : (
            <TweetFeed 
              tweets={tweets} 
              onLike={handleLikeTweet} 
              onComment={handleCommentTweet} 
            />
          )}
        </section>

        <aside className="hidden min-h-screen border-l border-gray-800 p-4 lg:block">
          <Rightbar />
        </aside>
      </div>

      <MobileNav />
    </main>
  );
}