import { connectDB } from "@/lib/mongodb";
import Tweet from "@/models/Tweet";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export async function GET(){
    try {
        await connectDB();
        // Fetch tweets from the database, sorted by creation date (newest first)
        const tweets = await Tweet.find()
        // Populate the author field with the corresponding user data (name, username, avatar)
            .populate("author", "name username avatar")
            .sort({ createdAt: -1 });
        return Response.json(tweets);
    } catch(error) {
        //console.log("Error fetching tweets from DB:", error);
        return Response.json(
            { message: "Failed to fetch tweets" },
            { status: 500 }
        );
    };

    }


export async function POST(request) {
    try {
        await connectDB();
        const session = await getServerSession(authOptions);

        if(!session){
            return Response.json(
                { message: "You must be logged in to create a tweet" },
                { status: 401 }
            );
        }
        // Parse the incoming request body to get the content of the new tweet
        const body = await request.json();

        if (!body.content || !body.content.trim()) {
            return Response.json(
                { message: "Tweet content is required" },
                { status: 400 }
            );
        }

        const newTweet = await Tweet.create({
            content: body.content,
            author: session.user.id,
        });

        const populatedTweet = await newTweet.populate(
            "author",
            "name username avatar"
        )
        return Response.json(populatedTweet, { status: 201});
    } catch (error) {
        console.error("CREATE TWEET ERROR:", error);
        
        return Response.json(
            { 
                message: "Failed to create tweet",
                error: error.message},
            { status: 500 }
        );
    }
}
