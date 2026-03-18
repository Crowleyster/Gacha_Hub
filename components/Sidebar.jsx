"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calendar, Home, Gamepad2, Newspaper, Settings, CircleHelp, Compass } from 'lucide-react';

export default function Sidebar({ isExpanded }) {
    const pathname = usePathname();

    const topNavItems = [
        { name: 'Inicio', href: '/', icon: Home },
        { name: 'Noticias', href: '/noticias', icon: Newspaper },
        { name: 'Eventos', href: '/eventos', icon: Calendar }, 
        { name: 'Juegos', href: '/juegos', icon: Gamepad2 },
    ];

    const bottomNavItems = [
        { name: 'Ajustes', href: '/ajustes', icon: Settings },
        { name: 'Ayuda', href: '/ayuda', icon: CircleHelp },
    ];

    return (
        <aside
            className={`
        fixed top-0 left-0 h-screen z-50 flex flex-col 
        bg-[#F4F4F5] dark:bg-[#27272A] border-r border-zinc-200 dark:border-white/5 
        transition-all duration-300 ease-in-out shadow-2xl shadow-black/10 dark:shadow-black/50
        hidden sm:flex p-2
        -translate-x-full sm:translate-x-0 ${isExpanded ? 'translate-x-0' : ''}
        w-[68px] ${isExpanded ? 'sm:w-64' : 'sm:w-[68px]'}
      `}
        >
            {/* Header / Logo */}
            <div
                className={`flex items-center transition-opacity rounded-xl ${isExpanded ? 'px-4 gap-4 justify-start' : 'justify-center w-full'}`}
                style={{ height: '66px' }}
            >
                <div className="shrink-0 flex items-center justify-center">
                    <Compass className="w-8 h-8 text-zinc-900 dark:text-white transition-transform duration-500 hover:rotate-180 text-purple-500" />
                </div>

                <div className={`flex flex-col overflow-hidden transition-all duration-300 ${!isExpanded ? 'w-0 opacity-0' : 'w-full opacity-100'}`}>
                    <span className="text-base font-semibold text-zinc-900 dark:text-white truncate whitespace-nowrap">
                        Gacha Hub
                    </span>
                    <span className="text-sm text-zinc-500 dark:text-zinc-400 truncate whitespace-nowrap">
                        Tu centro de juegos
                    </span>
                </div>
            </div>

            {/* Top Navigation Links */}
            <nav
                className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar flex flex-col pt-2 pb-4"
                style={{ marginTop: '6px' }}
            >
                {topNavItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`
                flex items-center rounded-xl w-full shrink-0
                transition-all duration-200 group relative
                ${isExpanded ? 'gap-4 px-4 justify-start' : 'justify-center'}
                ${isActive
                                    ? 'bg-[#27272A] text-white shadow-md dark:bg-white dark:text-zinc-900 font-semibold'
                                    : 'text-zinc-700 hover:bg-zinc-200 dark:text-zinc-100 dark:hover:bg-zinc-700 font-medium'
                                }
              `}
                            style={{ height: '54px' }}
                            title={!isExpanded ? item.name : undefined}
                        >
                            <item.icon className={`w-5 h-5 shrink-0 ${isActive ? 'scale-110' : 'group-hover:scale-110'} transition-transform`} />

                            <span className={`whitespace-nowrap transition-all duration-300 overflow-hidden ${!isExpanded ? 'w-0 opacity-0' : 'w-full opacity-100'}`}>
                                {item.name}
                            </span>
                        </Link>
                    )
                })}
            </nav>

            {/* Bottom Navigation Links */}
            <div className="flex flex-col border-t border-zinc-200 dark:border-white/5 pt-2 mt-auto">
                {bottomNavItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`
                flex items-center rounded-xl w-full shrink-0
                transition-all duration-200 group relative
                ${isExpanded ? 'gap-4 px-4 justify-start' : 'justify-center'}
                ${isActive
                                    ? 'bg-[#27272A] text-white shadow-md dark:bg-white dark:text-zinc-900 font-semibold'
                                    : 'text-zinc-700 hover:bg-zinc-200 dark:text-zinc-100 dark:hover:bg-zinc-700 font-medium'
                                }
              `}
                            style={{ height: '54px' }}
                            title={!isExpanded ? item.name : undefined}
                        >
                            <item.icon className={`w-5 h-5 shrink-0 ${isActive ? 'scale-110' : 'group-hover:scale-110'} transition-transform`} />

                            <span className={`whitespace-nowrap transition-all duration-300 overflow-hidden ${!isExpanded ? 'w-0 opacity-0' : 'w-full opacity-100'}`}>
                                {item.name}
                            </span>
                        </Link>
                    )
                })}
            </div>

        </aside>
    );
}
