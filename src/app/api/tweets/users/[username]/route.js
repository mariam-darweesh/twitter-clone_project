import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(req, { params}) {
    try {
        await connectDB();
        const { username } = await params;
        console.log("Fetching user with username:", username);
        const user = await User.findOne({ username });
        console.log("Found user:", user);

        if(!user){
            return Response.json(
                { message: "User not found" },
                { status: 404 }
            );
        }
        return Response.json(user);         
    } catch(error) {
        return Response.json(
            { message: "Failed to fetch user", error: error.message },
            { status: 500 }
        );
    }
}