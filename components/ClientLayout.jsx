"use client";

import { useState, useEffect } from 'react';
import { ThemeProvider } from 'next-themes';
import { usePathname } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import MobileNav from '@/components/MobileNav';
import BottomSheet from '@/components/BottomSheet';
import { Settings, CircleHelp, Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from 'next-themes';

function SettingsSheet({ isOpen, onClose }) {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const menuItems = [
        { name: 'Ajustes', href: '/ajustes', icon: Settings },
        { name: 'Ayuda', href: '/ayuda', icon: CircleHelp },
    ];

    if (!mounted) return null;

    return (
        <BottomSheet isOpen={isOpen} onClose={onClose} title="Más opciones">
            <div className="flex flex-col w-full gap-4">
                {/* Navigation Links */}
                <div className="flex flex-col gap-2">
                    {menuItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={onClose}
                            className="flex items-center gap-4 w-full h-[54px] px-4 rounded-xl border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-[#27272A] dark:hover:bg-[#333333] transition-colors"
                        >
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-700/50 text-zinc-700 dark:text-zinc-300">
                                <item.icon className="w-5 h-5" />
                            </div>
                            <span className="text-base font-semibold text-zinc-900 dark:text-white">
                                {item.name}
                            </span>
                        </Link>
                    ))}
                </div>

                {/* Theme Section */}
                <div className="flex flex-col gap-2">
                    <span className="text-sm text-zinc-500 dark:text-zinc-400 font-medium ml-1">Preferencia</span>
                    <button
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="flex items-center gap-4 w-full h-[54px] px-4 rounded-xl border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-[#27272A] dark:hover:bg-[#333333] transition-colors"
                    >
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-700/50 text-zinc-700 dark:text-zinc-300">
                            {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                        </div>
                        <span className="text-base font-semibold text-zinc-900 dark:text-white">
                            {theme === 'dark' ? 'Modo Oscuro' : 'Modo Claro'}
                        </span>
                    </button>
                </div>

                {/* Version Details */}
                <div className="w-full text-center py-2">
                    <p className="text-xs text-zinc-400 dark:text-zinc-500 font-medium tracking-wide">GACHA HUB v1.0.0</p>
                </div>
            </div>
        </BottomSheet>
    );
}

export default function ClientLayout({ children }) {
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
    const [isMobileSheetOpen, setIsMobileSheetOpen] = useState(false);
    const pathname = usePathname();

    // Initialize sidebar state based on screen size
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1440) {
                setIsSidebarExpanded(false);
            } else {
                setIsSidebarExpanded(true);
            }
        };

        handleResize(); // run once on mount
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Close sidebar on tablet when navigating
    useEffect(() => {
        if (window.innerWidth < 1440) {
            setIsSidebarExpanded(false);
        }
    }, [pathname]);

    // The Layout wrapper on desktop uses lg:ml-64 and sm:ml-[68px]. Below sm, sidebar is hidden.
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Sidebar isExpanded={isSidebarExpanded} />

            {/* Tablet Overlay - Click to close */}
            {isSidebarExpanded && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsSidebarExpanded(false)}
                />
            )}

            <div className={`flex flex-col h-screen overflow-hidden w-full pb-20 sm:pb-0 transition-all duration-300 ${isSidebarExpanded ? 'sm:ml-64 sm:w-[calc(100%-16rem)]' : 'sm:ml-[68px] sm:w-[calc(100%-68px)]'}`}>
                <Header 
                    onToggleSidebar={() => setIsSidebarExpanded(!isSidebarExpanded)} 
                    onOpenMobileSheet={() => setIsMobileSheetOpen(true)}
                />

                <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden overflow-y-auto bg-background">
                    <main className="w-full max-w-[3840px] mx-auto grid content-start grid-cols-4 sm:grid-cols-8 md:grid-cols-12 gap-[16px] sm:gap-[24px] px-[24px] py-[24px] xs:px-[32px] xs:py-[32px] sm:px-[48px] sm:py-[48px] md:px-[64px] md:py-[64px] lg:px-[96px] lg:py-[96px] xl:px-[160px] xl:py-[160px]">
                        {children}
                    </main>
                </div>
            </div>

            <MobileNav />

            {/* Application Mobile Sheet (Settings & Help) */}
            {/* The BottomSheet component seems to be imported inside MobileNav currently, we should handle that correctly or create a quick SettingsSheet here if BottomSheet is generic */}
            <SettingsSheet isOpen={isMobileSheetOpen} onClose={() => setIsMobileSheetOpen(false)} />
        </ThemeProvider>
    );
}
