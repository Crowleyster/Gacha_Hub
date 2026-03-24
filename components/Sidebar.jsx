"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calendar, Home, Gamepad2, Newspaper, Settings, CircleHelp, Compass } from 'lucide-react';

export default function Sidebar({ isExpanded }) {
    const pathname = usePathname();
    const [isLowHeight, setIsLowHeight] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsLowHeight(window.innerHeight < 600);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
                bg-background-secondary border-r border-border-default-secondary
                transition-all duration-300 ease-in-out shadow-600 dark:shadow-black/50
                hidden sm:flex p-2
                ${isExpanded ? 'sm:translate-x-0 w-64' : 'sm:translate-x-0 sm:w-[68px]'}
            `}
        >
            {/* Header / Logo */}
            <div
                className={`flex items-center transition-opacity shrink-0 rounded-xl ${isExpanded ? 'px-4 gap-4 justify-start' : 'justify-center w-full'}`}
                style={{ height: '66px' }}
            >
                <div className="shrink-0 flex items-center justify-center">
                    <Compass className="w-8 h-8 text-text-brand-default transition-transform duration-500 hover:rotate-180" />
                </div>

                <div className={`flex flex-col overflow-hidden transition-all duration-300 ${!isExpanded ? 'w-0 opacity-0' : 'w-full opacity-100'}`}>
                    <span className="text-body-strong text-text-default-default truncate whitespace-nowrap">
                        Gacha Hub
                    </span>
                    <span className="text-body-small text-text-default-secondary truncate whitespace-nowrap">
                        Tu centro de juegos
                    </span>
                </div>
            </div>

            {/* Top Navigation Links */}
            <nav
                className="flex-1 overflow-y-auto overflow-x-hidden min-h-0 custom-scrollbar flex flex-col pt-2 pb-4"
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
                                    ? 'bg-brand-default text-text-brand-on shadow-200'
                                    : 'text-text-default-secondary hover:bg-background-secondary-hover hover:text-text-default-default'
                                }
                            `}
                            style={{ height: '54px' }}
                            title={!isExpanded ? item.name : undefined}
                        >
                            <item.icon className={`w-5 h-5 shrink-0 ${isActive ? 'scale-110' : 'group-hover:scale-110'} transition-transform`} />

                            <span className={`text-body-strong whitespace-nowrap transition-all duration-300 overflow-hidden ${!isExpanded ? 'w-0 opacity-0' : 'w-full opacity-100'}`}>
                                {item.name}
                            </span>
                        </Link>
                    )
                })}
            </nav>

            {/* Bottom Navigation Links */}
            {!isLowHeight && (
                <div className="flex flex-col border-t border-border-default-secondary pt-2 mt-auto shrink-0">
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
                                        ? 'bg-brand-default text-text-brand-on shadow-200'
                                        : 'text-text-default-secondary hover:bg-background-secondary-hover hover:text-text-default-default'
                                    }
                                `}
                                style={{ height: '54px' }}
                                title={!isExpanded ? item.name : undefined}
                            >
                                <item.icon className={`w-5 h-5 shrink-0 ${isActive ? 'scale-110' : 'group-hover:scale-110'} transition-transform`} />

                                <span className={`text-body-strong whitespace-nowrap transition-all duration-300 overflow-hidden ${!isExpanded ? 'w-0 opacity-0' : 'w-full opacity-100'}`}>
                                    {item.name}
                                </span>
                            </Link>
                        )
                    })}
                </div>
            )}
        </aside>
    );
}
