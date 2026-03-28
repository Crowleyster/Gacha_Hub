"use client";

import { useState, useEffect } from 'react';
import { ThemeProvider } from 'next-themes';
import { usePathname } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import MobileNav from '@/components/MobileNav';
import SettingsSheet from '@/components/SettingsSheet';
import GlobalSearch from '@/components/GlobalSearch';

export default function ClientLayout({ children }) {
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
    const [isMobileSheetOpen, setIsMobileSheetOpen] = useState(false);
    const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState(false);
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

    // The Layout wrapper on desktop uses lg:ml-64 and sm:ml-16. Below sm, sidebar is hidden.
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

            <div className={`flex flex-col h-full flex-1 min-w-0 bg-background-default transition-all duration-300 ${isSidebarExpanded ? 'sm:ml-64 sm:w-[calc(100%-16rem)]' : 'sm:ml-16 sm:w-[calc(100%-4rem)]'}`}>
                <div className={`fixed top-0 right-0 z-40 transition-all duration-300 ${isSidebarExpanded ? 'left-64' : 'sm:left-[68px] left-0'}`}>
                    <Header
                        onToggleSidebar={() => setIsSidebarExpanded(!isSidebarExpanded)}
                        onOpenMobileSheet={() => setIsMobileSheetOpen(true)}
                        onOpenSearch={() => setIsGlobalSearchOpen(true)}
                    />
                </div>

                <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar pb-content-safe sm:pb-12 pt-[57px]">
                    <main className="w-full max-w-[3840px] mx-auto grid content-start grid-cols-4 sm:grid-cols-8 md:grid-cols-12 gap-4 sm:gap-6 p-6 xs:p-8 sm:p-12 md:px-24 md:py-12 2xl:px-40 2xl:py-12">
                        {children}
                    </main>
                </div>
            </div>

            <MobileNav />

            {/* Application Mobile Sheet (Settings & Help) */}
            {/* The BottomSheet component seems to be imported inside MobileNav currently, we should handle that correctly or create a quick SettingsSheet here if BottomSheet is generic */}
            <SettingsSheet isOpen={isMobileSheetOpen} onClose={() => setIsMobileSheetOpen(false)} />

            {/* Global Spotlight Search */}
            <GlobalSearch 
                isOpen={isGlobalSearchOpen} 
                onClose={() => setIsGlobalSearchOpen(false)} 
                onOpen={() => setIsGlobalSearchOpen(true)} 
            />
        </ThemeProvider>
    );
}
