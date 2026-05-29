import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        email:{
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        bio: {
            type: String,
            default: "",
        },
        avatar: {
            type: String,
            default: "https://i.pravatar.cc/150",
        },
        coverImage: {
            type: String,
            default: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        },
        followers:{
            type: Number,
            default: 0,
        }   
    },
   { timestamps: true }
);
// Check if the model already exists to avoid recompilation errors in development
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
   