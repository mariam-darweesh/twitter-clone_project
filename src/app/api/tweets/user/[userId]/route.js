import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Tweet from '@/models/Tweet';

export async function GET(req, { params }){
    try {
        await connectDB();
        const { userId } = await params;
        console.log("Fetching tweets for user ID:", userId);
        const tweets = await Tweet
            .find({ author: userId })
            .sort({ createdAt: -1 });
        console.log(`Found ${tweets.length} tweets for user ID ${userId}`);
            return NextResponse.json(tweets);
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to fetch user's tweets", error: error.message },
            { status: 500 }
        );
    }
}