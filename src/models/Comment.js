import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
            maxlength: 280  
        },

        tweet: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tweet",
            required: true ,
            index: true
        },
        
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
    },
    { timestamps: true }
);

export default mongoose.models.Comment || mongoose.model("Comment", CommentSchema);