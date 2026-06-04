import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { connectDB } from "@/lib/mongodb";
import Tweet from "@/models/Tweet";
import { authOptions } from "@/auth";

export async function PATCH(req, { params }) {
  try {
    await connectDB();
    
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if(!session?.user?.id){
      return NextResponse.json(
        { message: "unauthenticated" },
        { status: 401 }
      );
    }

    const tweet = await Tweet.findById(id);
    
    if (!tweet) {
      return NextResponse.json(
        { message: "Tweet not found" }, 
        { status: 404 }
      );
    }

    const userId = session.user.id;

    const alreadyLiked = tweet.likes.some(
      (likedId) => likedId.toString() === userId
    );

    if(alreadyLiked){
      tweet.likes = tweet.likes.filter(
        (likedId) => likedId.toString() !== userId
      );
    } else {
      tweet.likes.push(userId);
    }

    await tweet.save();

    const updatedTweet = await Tweet.findById(id)
      .populate("author", "name username avatar");

    return NextResponse.json(updatedTweet);
  } catch (error) {
    console.error("LIKE API ERROR:", error);
    return NextResponse.json(
      { message: "Failed to update like", error: error.message },
      { status: 500 }
    );
  }
}
