/* eslint-disable @next/next/no-img-element */
import { Search } from "lucide-react";

const trends = [
    {
        category: 'Trending in Germany',
        title: 'Next.js',
        tweets: '18.2K Tweets'
    },
    {
        category: 'Technology Trending',
        title: 'MongoDB',
        tweets: '9.840K Tweets'
    },
    {
        category: 'Web Development',
        title: 'React',
        tweets: '42.1K Tweets'
    }
];

const suggestions = [
    {
    name: "Vercel",
    username: "vercel",
    avatar: "https://i.pravatar.cc/100?img=15",
  },
  {
    name: "React",
    username: "reactjs",
    avatar: "https://i.pravatar.cc/100?img=22",
  },
  {
    name: "MongoDB",
    username: "mongodb",
    avatar: "https://i.pravatar.cc/100?img=35",
  }
];

export default function Rightbar (){
    return (
        <aside className="sticky top-0 hidden h-screen over-flow-y-auto p-4 lg:block">
            <div className="relative mb-4">
                <Search 
                    size={20} 
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" 
                />
                <input 
                    type="text" 
                    placeholder="Search Twitter" 
                    className="w-full rounded-full bg-gray-900 py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>  

            <section className="mb-4 overflow-hidden rounded-2xl bg-gray-900">
                <h2 className="border-b border-gray-800 px-4 py-3 text-lg font-bold">
                    What&apos;s happening
                </h2>
                {trends.map((trend) => (
                    <div key={trend.title} className="border-b border-gray-800 px-4 py-3">
                        <p className="text-sm text-gray-500">{trend.category}</p>
                        <h3 className="text-md font-bold">{trend.title}</h3>
                        <p className="text-sm text-gray-500">{trend.tweets}</p>
                    </div>
                ))}
                 <button className="w-full px-4 py-3 text-left text-sky-500 transition hover:bg-gray-800">
                    Show more
                </button>
            </section>

            <section className="overflow-hidden rounded-2xl bg-gray-900">
                <h2 className="border-b border-gray-800 px-4 py-3 text-xl font-bold">
                Who to follow
                </h2>

                {suggestions.map((user) => (
                <div
                    key={user.username}
                    className="flex items-center justify-between border-b border-gray-800 px-4 py-3 transition hover:bg-gray-800"
                >
                    <div className="flex items-center gap-3">
                    <img
                        src={user.avatar}
                        alt={user.name}
                        className="h-10 w-10 rounded-full"
                    />

                    <div>
                        <h3 className="font-bold leading-tight">{user.name}</h3>
                        <p className="text-sm text-gray-500">@{user.username}</p>
                    </div>
                    </div>

                    <button className="rounded-full bg-white px-4 py-1.5 text-sm font-bold text-black transition hover:bg-gray-200">
                    Follow
                    </button>
                </div>
                ))}

                <button className="w-full px-4 py-3 text-left text-sky-500 transition hover:bg-gray-800">
                Show more
                </button>
            </section>
        </aside>
    )
}