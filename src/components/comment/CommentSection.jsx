/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

export default function CommentSection({ tweetId, onCommentAdded, onCommentDeleted }) {
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchComments(){
            try {
                const res = await fetch(`/api/tweets/${tweetId}/comments`);
                if(!res.ok) return;

                const data = await res.json();
                setComments(data);
            } catch(error) {
                console.error("Error fetching comments:", error);
                setError("Failed to load comments");
            } finally {
                setLoading(false);
            }
        }
        fetchComments();
    }, [tweetId]);

    async function handleSubmit(e){
        e.preventDefault();

        if(!content.trim()) return;

        try {
            const res = await fetch(`/api/tweets/${tweetId}/comments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ content })
            });

            if(!res.ok) return;

            const newComment = await res.json();
            setComments(prev => [newComment, ...prev]);
            setContent("");
            onCommentAdded?.(tweetId);
        } catch(error) {
            console.error("Error adding comment:", error);
        }
    }

    //adding delete functionality for comments
    async function handleDeleteComment(commentId) {
        try {
            const res = await fetch(`/api/comments/${commentId}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                throw new Error("Failed to delete comment");
            }

            setComments(prev => prev.filter(comment => comment._id !== commentId));
            // Notify parent to update comment count
            onCommentDeleted(tweetId, "delete");
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    }

    return (
    <div className="mt-4 border-t border-[#2f3336] pt-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Post your reply"
          className="flex-1 rounded-full border border-[#2f3336] bg-black px-4 py-2 text-sm text-white outline-none placeholder:text-gray-500 focus:border-sky-500"
        />

        <button
          type="submit"
          className="rounded-full bg-sky-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-sky-600 disabled:opacity-50"
          disabled={!content.trim()}
        >
          Reply
        </button>
      </form>

      <div className="mt-4 space-y-4">
        {loading ? (
          <p className="text-sm text-gray-500">Loading replies...</p>
        ) : comments.length === 0 ? (
          <p className="text-sm text-gray-500">No replies yet.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment._id} className="flex gap-6 flex-row items-start relative">
              <img
                src={comment.user?.avatar || "/default-avatar.png"}
                alt={comment.user?.name || "User"}
                className="h-8 w-8 rounded-full object-cover"
              />

              <div className="flex-1">
                <div className="flex items-center gap-2 text-sm">
                  <p className="font-bold text-white">
                    {comment.user?.name}
                  </p>
                  <p className="text-gray-500">
                    @{comment.user?.username || "user"}
                  </p>
                </div>

                <p className="text-sm text-gray-200">{comment.content}</p>
              </div>

              <button
                onClick={() => handleDeleteComment(comment._id)}
                className="text-gray-500 transition hover:text-red-500"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>

    );
}