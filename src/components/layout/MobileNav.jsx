import Link from "next/link";
import { Home, Search, Bell, Mail, User } from "lucide-react";

const NavItems = [
    { href: '/', icone: Home, label: 'Home' },
    { href: '/explore', icone: Search, label: 'Explore' },
    { href: '/notifications', icone: Bell, label: 'Notifications' },
    { href: '/messages', icone: Mail, label: 'Messages' },
    { href: '/profile', icone: User, label: 'Profile' },
];

export default function MobileNav(){
    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black border-t border-gray-800 lg:hidden">
            <div className="flex item-center justify-around px-2py-3">
                {
                    NavItems.map((item) => {
                        const Icon = item.icone;

                        return (
                            <Link
                            key={item.href}
                            href={item.href}
                            className="flex flex-col items-center gap-1 text-gray-400 transition hover:text-white"
                        >
                            <Icon size={24} />
                            <span className="text-xs">{item.label}</span>
                        </Link> 
                    )
                })}
            </div>
        </nav>            
    )
}