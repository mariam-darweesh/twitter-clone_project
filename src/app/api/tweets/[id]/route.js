import { connectDB } from "@/lib/mongodb";
import Tweet from "@/models/Tweet";

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