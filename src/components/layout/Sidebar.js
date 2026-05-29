/* eslint-disable @next/next/no-img-element */
"use client";

import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Home,
  Search,
  Bell,
  Mail,
  User,
  Feather,
  Bookmark,
  BookHeart,
  CircleEllipsis,
} from "lucide-react";
import TwitterLogo from "../ui/TwitterLogo";


export default function Sidebar() {
  const { data: session } = useSession();
  const menuItems = [
    { label: "Home", icon: Home, href: "/" },
    { label: "Explore", icon: Search, href: "/explore" },
    { label: "Notifications", icon: Bell, href: "/notifications" },
    { label: "Messages", icon: Mail, href: "/messages" },
    { label: "Bookmarks", icon: Bookmark, href: "/bookmarks" },
    { label: "Likes", icon: BookHeart, href: "/likes" },
    { label: "More", icon: CircleEllipsis, href: "/more" },
    { 
      label: "Profile", 
      icon: User, 
      href: session?.user?.username
        ? `/profile/${session.user.username}`
        : "/login",
    },
];
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-screen w-64 border-r border-gray-800 px-4 py-5 text-white md:block">
      <div className="flex h-full flex-col">
        <h3 className="mb-8 flex items-center gap-2 text-xl font-bold">
          <TwitterLogo />
          Twitter
        </h3>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-4 rounded-full px-4 py-3 text-lg transition ${
                  isActive
                    ? "bg-gray-900 font-bold text-sky-400"
                    : "hover:bg-gray-900"
                }`}
              >
                <Icon size={24} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <button className="mt-6 flex w-full items-center justify-center rounded-full bg-sky-500 py-3 text-lg font-bold text-white transition hover:bg-sky-600">
          <Feather size={20} className="mr-2" />
          Tweet
        </button>

        {session?.user && (
          <div className="mt-auto">
            <div className="flex items-center justify-between rounded-full p-3 transition hover:bg-gray-900">
              <div className="flex min-w-0 items-center gap-3">
                <img
                  src={session.user.avatar || "/default-avatar.png"}
                  alt={session.user.name || "User avatar"}
                  className="h-10 w-10 rounded-full object-cover"
                />

                <div className="min-w-0">
                  <p className="truncate font-bold text-white">
                    {session.user.name}
                  </p>
                  <p className="truncate text-sm text-gray-500">
                    @{session.user.username || "username"}
                  </p>
                </div>
              </div>

              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="ml-2 text-sm text-red-400 hover:text-red-300"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}