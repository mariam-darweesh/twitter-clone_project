import TweetCard from "./TweetCard";

export default function TweetFeed({ tweets, onLike, onComment }) {
  if (tweets.length === 0) {
    return <p className="p-4 text-gray-500">No tweets yet.</p>;
  }

  return (
    <>
      {tweets.map((tweet) => (
        <TweetCard
          key={tweet._id}
          tweet={tweet}
          onLike={onLike}
          onComment={onComment}
        />
      ))}
    </>
  );
}