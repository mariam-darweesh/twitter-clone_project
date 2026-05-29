import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const { name, username, email, password } = body;

    if (!name || !username || !email || !password) {
      return Response.json(
        {
          message: "All fields are required",
        },
        {
          status: 400,
        }
      );
    }

    const existingUser = await User.findOne({
        // Check if a user with the same email or username already exists
      $or: [
        { email: email.toLowerCase() },
        { username: username.toLowerCase() },
      ],
    });

    if (existingUser) {
      return Response.json(
        {
          message: "User already exists",
        },
        {
          status: 400,
        }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    return Response.json(
      {
        message: "User created successfully",
        user,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return Response.json(
      {
        message: "Failed to register user",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}