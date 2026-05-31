import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/auth';
import { connectDB } from '@/lib/mongodb';
import Comment from "@/models/Comment";
import Tweet from "@/models/Tweet";

export async function DELETE(request, { params }) {
    try {
        await connectDB();
        
        const { commentId } = await params;
        console.log("Deleting comment with ID:", commentId);

        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json(
                { message: "Not authenticated" }, 
                { status: 401 }
            );
        }

        const comment = await Comment.findById(commentId);
        console.log("Found comment:", comment);

        if(!comment) {
            return NextResponse.json(
                { message: "Comment not found" },
                { status: 404 }
            );
        }

        if(comment.user.toString() !== session.user.id) {
            return NextResponse.json(
                { message: "Not allowed" },
                { status: 403 }
            );
        }
        await Comment.findByIdAndDelete(commentId);

        await Tweet.findByIdAndUpdate(comment.tweet, {
            // Decrement commentsCount and replies count if it's a reply
            $inc: {
                commentsCount: -1,
                replies: -1,
            },
        });

        return NextResponse.json(
            { message: "Comment deleted" },
        );
    } catch (error) {
        console.error("Error deleting comment:", error);
        return NextResponse.json(
            { message: "Failed to delete comment", error: error.message },
            { status: 500 }
        );
    }

}
