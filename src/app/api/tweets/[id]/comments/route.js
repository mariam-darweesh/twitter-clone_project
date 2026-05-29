import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/auth";
import { connectDB } from "@/lib/mongodb";
import Tweet from "@/models/Tweet";
import Comment from "@/models/Comment";

export async function GET(req, { params }) {
    const { id } = await params;
  try {
    await connectDB();

    const comments = await Comment.find({ tweet: id })
      .populate("user", "name username avatar")
      .sort({ createdAt: -1 })
      .limit(10);

    return NextResponse.json(comments);
  } catch (error) {
    console.error("GET COMMENTS ERROR:", error);

    return NextResponse.json(
      { message: "Failed to fetch comments", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req, { params }) {
    const {id}  = await params;

    try {
        await connectDB();

    const session = await getServerSession(authOptions);
    console.log("SESSION:", session);

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    const { content } = await req.json();

    if (!content || !content.trim()) {
      return NextResponse.json(
        { message: "Comment cannot be empty" },
        { status: 400 }
      );
    }
    console.log("TWEET ID:", id);
    const tweet = await Tweet.findById(id);
    console.log("FOUND TWEET:", tweet);

    if (!tweet) {
      return NextResponse.json(
        { message: "Tweet not found", tweetId: id },
        { status: 404 }
      );
    }

    const comment = await Comment.create({
      content: content.trim(),
      tweet: id,
      user: session.user.id,
    });

    await Tweet.findByIdAndUpdate(id, {
      $inc: { commentsCount: 1 },
    });

    const populatedComment = await Comment.findById(comment._id).populate(
      "user",
      "name username avatar"
    );

    return NextResponse.json(populatedComment, { status: 201 });
  } catch (error) {
    console.error("CREATE COMMENT ERROR:", error);

    return NextResponse.json(
      { message: "Failed to create comment", error: error.message },
      { status: 500 }
    );
  }
}