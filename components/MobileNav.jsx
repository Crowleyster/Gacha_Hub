"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Home, Gamepad2, Newspaper, Calendar } from 'lucide-react';

export default function MobileNav() {
    const pathname = usePathname();

    const navItems = [
        { name: 'Inicio', href: '/', icon: Home },
        { name: 'Noticias', href: '/noticias', icon: Newspaper },
        { name: 'Eventos', href: '/eventos', icon: Calendar },
        { name: 'Juegos', href: '/juegos', icon: Gamepad2 },
    ];

    return (
        <nav className="fixed bottom-0 left-0 w-full z-50 grid grid-cols-4 items-center px-[8px] py-[16px] bg-white/80 backdrop-blur-md border-t border-zinc-200 dark:bg-[#1A1A1A]/80 dark:border-white/10 sm:hidden pb-safe">
            {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="flex flex-col items-center justify-center relative h-12 w-full"
                        title={item.name}
                    >
                        {/* Active Indicator Top Line */}
                        {isActive && (
                            <div className="absolute -top-1 w-6 h-1 rounded-full bg-zinc-900 dark:bg-white z-10" />
                        )}

                        <div className={`
                            flex items-center justify-center transition-all duration-300
                            ${isActive
                                ? 'flex-row gap-2 px-4 py-2 rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 w-auto max-w-[95%]'
                                : 'text-zinc-500 dark:text-zinc-400 p-2 w-full'
                            }
                        `}>
                            <item.icon className={`shrink-0 ${isActive ? 'w-5 h-5' : 'w-6 h-6'}`} />

                            {isActive && (
                                <span className="text-sm font-bold truncate animate-in fade-in zoom-in duration-200">
                                    {item.name}
                                </span>
                            )}
                        </div>
                    </Link>
                );
            })}
        </nav>
    );
}
