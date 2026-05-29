import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(req, { params}) {
    try {
        await connnectDB();
        const { username } = await params;
        const user = await User.findOne({ username });

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