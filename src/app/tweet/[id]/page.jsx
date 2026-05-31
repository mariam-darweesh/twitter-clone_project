/* eslint-disable @next/next/no-img-element */
"use client";
import { use } from "react";
import { useEffect, useState } from "react";

export default function TweetPage({ params }){
    const resolvedParams = use(params);

    const [tweet, setTweet] = useState(null);
   
    useEffect(() => {
        const fetchTweet = async () => {
            const res = await fetch(`/api/tweets/${resolvedParams.id}`);
            const data = await res.json();
            setTweet(data);
        };

        fetchTweet();
    }, [resolvedParams.id]);

    if(!tweet) {
        return (
        <main className="min-h-screen bg-black p-16 text-white text-center text-2xl">
            Loading ...
        </main>
        )
    }

    return (
        <main className="min-h-screen bg-black p-6 text-white">
           <div className="mx-auto max-w-2xl rounded-2xl border border-gray-800 p-6">
            <div className="flex items-center gap-3">
                <img 
                    src={tweet.avatar} 
                    alt={tweet.name} 
                    className="w-12 h-12 rounded-full"
                />
                <div>
                <h2 className="font-bold">{tweet.name}</h2>
                <p className="text-gray-500">@{tweet.username}</p>
            </div>
            </div>
            <p className="mt-6 text-2xl leading-relaxed">
                {tweet.content}
            </p>

            <div className="mt-6 flex items-center gap-8 text-gray-500">
                {tweet.likes} Likes
            </div>        
           </div>
        </main>
    )
}