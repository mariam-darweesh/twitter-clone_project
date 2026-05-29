/* eslint-disable @next/next/no-img-element */
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Rightbar from "@/components/layout/Rightbar";
import MobileNav from "@/components/layout/MobileNav";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <main className="min-h-screen bg-black text-white">
        <p className="p-4 text-gray-500">Loading profile...</p>
      </main>
    );
  }

  if (!session?.user) return null;

  const user = session.user;

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-[1500px]">
        <Sidebar />

        <section className="min-h-screen flex-1 border-x border-[#2f3336]">
          <header className="sticky top-0 z-20 border-b border-[#2f3336] bg-black/80 px-4 py-3 backdrop-blur-md">
            <h1 className="text-xl font-bold">{user.name}</h1>
            <p className="text-sm text-gray-500">@{user.username}</p>
          </header>

          <div className="h-48 bg-[#1d9bf0]" />

          <div className="px-4 pb-4">
            <img
              src={user.avatar || "/default-avatar.png"}
              alt={user.name}
              className="-mt-16 h-32 w-32 rounded-full border-4 border-black object-cover"
            />

            <div className="mt-4">
              <h2 className="text-2xl font-extrabold">{user.name}</h2>
              <p className="text-gray-500">@{user.username || "username"}</p>

              <p className="mt-4 text-white">
                Building a Twitter clone with Next.js and MongoDB.
              </p>

              <div className="mt-4 flex gap-5 text-sm text-gray-500">
                <p>
                  <span className="font-bold text-white">0</span> Following
                </p>
                <p>
                  <span className="font-bold text-white">0</span> Followers
                </p>
              </div>
            </div>
          </div>
        </section>

        <aside className="hidden w-[350px] lg:block">
          <Rightbar />
        </aside>
      </div>

      <MobileNav />
    </main>
  );
}