import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/auth";
import { connectDB } from "@/lib/mongodb";
import Tweet from "@/models/Tweet";
import Comment from "@/models/Comment";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const tweet = await Tweet.findById(id);

    if(!tweet){
      return Response.json(
        { message: "Tweet not found" }, 
        { status: 404 }
      );
    }
    return Response.json(tweet);
  } catch (error) {
    return Response.json(
      { message: "Failed to fetch tweet", error: error.message },
      { status: 500 }
    );    
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    console.log("Deleting tweet with ID:", id);

    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return Response.json(
        { message: "Unauthorized" }, 
        { status: 401 }
      );
    }

    const tweet = await Tweet.findById(id);
    console.log("Found tweet:", tweet);

    if(!tweet) {
      return Response.json(
        { message: "Tweet not found" },
        { status: 404 }
      );
    }

    if(tweet.author.toString() !== session.user.id) {
      return Response.json(
        { message: "Not allowed" },
        { status: 403 }
      );
    }

    console.log("Deleting comments for tweet:", id);
    // Delete all comments associated with the tweet before deleting the tweet itself
    await Comment.deleteMany({ tweet: id });
    await Tweet.findByIdAndDelete(id);

    return Response.json(
      { message: "Tweet deleted" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: "Failed to delete tweet", error: error.message },
      { status: 500 }
    );    
  }
}