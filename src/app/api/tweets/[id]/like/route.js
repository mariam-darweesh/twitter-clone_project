import { connectDB } from "@/lib/mongodb";
import Tweet from "@/models/Tweet";

export async function PATCH(req, { params }) {
  try {
    await connectDB();
    // Extract the tweet ID from the request parameters
    const { id } = await params;
   // Use the ID to find the tweet and increment its likes by 1
    const tweet = await Tweet.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!tweet) {
      return Response.json({ message: "Tweet not found" }, { status: 404 });
    }

    return Response.json(tweet);
  } catch (error) {
    return Response.json(
      { message: "Failed to like tweet", error: error.message },
      { status: 500 }
    );
  }
}

