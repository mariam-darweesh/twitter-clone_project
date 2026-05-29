import mongoose from "mongoose";
// Define the Tweet schema
const tweetSchema = new mongoose.Schema(
    {
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true, 
    },
    content: {
        type: String,
        required: true,
        trim: true,
        maxlength: 280
    },
    likes: {
        type: Number,
        default: 0
    },
    replies: {
        type: Number,
        default: 0
    },
    retweets: {
        type: Number,
        default: 0
    },
    username: {
        type: String,
        required: true,
        default: "Anonymous"        
        },
    avatar: {
        type: String,
        default: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
    },
    comments: [
        {
            author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            },

            content: {
            type: String,
            required: true,
            trim: true,
            maxlength: 280,
            },

            createdAt: {
            type: Date,
            default: Date.now,
            },
        },
        ],
    },
    { timestamps: true }
);
// Check if the model already exists to avoid recompilation errors in development
const Tweet = mongoose.models.Tweet || mongoose.model("Tweet", tweetSchema);

export default Tweet;