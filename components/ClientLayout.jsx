"use client";

import { useState, useEffect, useRef } from 'react';
import { ThemeProvider } from 'next-themes';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Info } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import MobileNav from '@/components/MobileNav';
import SettingsSheet from '@/components/SettingsSheet';
import GlobalSearch from '@/components/GlobalSearch';
import Footer from '@/components/Footer';
import RightSheet from '@/components/ui/RightSheet';
import { ActiveEventProvider, useActiveEvent } from '@/context/ActiveEventContext';
import { GAMES_DATA } from '@/lib/games-data';
import { getTimeInfo } from '@/lib/utils/date-utils';

function GlobalEventSheet() {
    const { selectedEvent, isOpen, closeEvent } = useActiveEvent();

    return (
        <RightSheet isOpen={isOpen} onClose={closeEvent} title={selectedEvent?.title}>
            {selectedEvent && (
                <div className="flex flex-col animate-in fade-in duration-500">
                    {/* 1. Imagen del Evento */}
                    <div className="relative aspect-video w-full bg-background-tertiary overflow-hidden">
                        {(selectedEvent.imageUrl || GAMES_DATA[selectedEvent.gameId]?.bannerUrl) && (
                            <Image 
                                src={selectedEvent.imageUrl || GAMES_DATA[selectedEvent.gameId]?.bannerUrl} 
                                alt={selectedEvent.title} 
                                fill 
                                className="object-cover" 
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-background-default via-transparent to-transparent" />
                    </div>

                    <div className="flex flex-col p-6 gap-8">
                        {/* 2. Cabecera del Juego */}
                        <div className="flex items-center gap-3">
                            {GAMES_DATA[selectedEvent.gameId]?.iconUrl && (
                                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-border-default-secondary shadow-sm">
                                    <Image 
                                        src={GAMES_DATA[selectedEvent.gameId].iconUrl} 
                                        alt={selectedEvent.gameName} 
                                        fill 
                                        className="object-cover" 
                                    />
                                </div>
                            )}
                            <span className="text-body-strong text-text-default-secondary">
                                {GAMES_DATA[selectedEvent.gameId]?.name || selectedEvent.gameName}
                            </span>
                        </div>

                        {/* 3. Título */}
                        <h2 className="text-heading text-text-default-default leading-tight">
                            {selectedEvent.title}
                        </h2>

                        {/* 4. Metadatos y Tags */}
                        <div className="flex flex-wrap gap-2">
                            {selectedEvent.type && (
                                <span className="px-3 py-1.5 bg-brand-default/10 text-brand-default rounded-lg text-badge tracking-wider font-bold border border-brand-default/20">
                                    {selectedEvent.type}
                                </span>
                            )}
                            {selectedEvent.category && (
                                <span className="px-3 py-1.5 bg-background-secondary text-text-default-secondary rounded-lg text-badge tracking-wider font-bold border border-border-default-secondary">
                                    {selectedEvent.category}
                                </span>
                            )}
                        </div>

                        {/* 5. Estado y Tiempo */}
                        <div className="flex flex-col gap-4 p-4 bg-background-secondary rounded-2xl border border-border-default-secondary">
                            <div className="flex justify-between items-center text-body-small">
                                <div className="flex flex-col">
                                    <span className="text-text-default-tertiary uppercase text-badge mb-1">Inicio</span>
                                    <span className="text-text-default-default font-medium">{selectedEvent.startDate}</span>
                                </div>
                                <div className="flex flex-col text-right">
                                    <span className="text-text-default-tertiary uppercase text-badge mb-1">Fin</span>
                                    <span className="text-text-default-default font-medium">{selectedEvent.endDate === '2099-12-31' ? 'Permanente' : selectedEvent.endDate}</span>
                                </div>
                            </div>
                            <hr className="border-border-default-secondary opacity-50" />
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-text-default-secondary">
                                    <Clock className="w-4 h-4" />
                                    <span className="text-body-base">Tiempo restante</span>
                                </div>
                                {(() => {
                                    const { label, color } = getTimeInfo(selectedEvent);
                                    return (
                                        <span className={`${color} px-4 py-1.5 rounded-full text-body-small-strong shadow-sm border border-black/10`}>
                                            {label}
                                        </span>
                                    );
                                })()}
                            </div>
                        </div>

                        {/* 6. Descripción */}
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2 text-text-default-tertiary">
                                <Info className="w-4 h-4" />
                                <span className="text-badge uppercase">Información</span>
                            </div>
                            <p className="text-body-base text-text-default-secondary leading-relaxed">
                                {selectedEvent.description || GAMES_DATA[selectedEvent.gameId]?.description || 'Este evento ofrece recompensas exclusivas por tiempo limitado. Asegúrate de completar los objetivos antes del cierre.'}
                            </p>
                        </div>

                        {/* 7. Redirección al Juego */}
                        <div className="pt-4 border-t border-border-default-secondary/50">
                            <Link 
                                href={`/juegos/${selectedEvent.gameId}`}
                                onClick={closeEvent}
                                className="flex items-center justify-center gap-2 w-full py-4 px-6 bg-brand-default text-text-brand-on rounded-2xl text-body-strong font-bold hover:shadow-lg hover:shadow-brand-default/20 transition-all active:scale-[0.98]"
                            >
                                Ver Hub del Juego
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </RightSheet>
    );
}

export default function ClientLayout({ children }) {
    return (
        <ActiveEventProvider>
            <LayoutContent>{children}</LayoutContent>
            <GlobalEventSheet />
        </ActiveEventProvider>
    );
}

function LayoutContent({ children }) {
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
    const [isMobileSheetOpen, setIsMobileSheetOpen] = useState(false);
    const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState(false);
    const pathname = usePathname();
    const scrollContainerRef = useRef(null);

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

    // Close sidebar on tablet when navigating and reset scroll position
    useEffect(() => {
        if (window.innerWidth < 1440) {
            setIsSidebarExpanded(false);
        }
        
        // Fix: Resetear la posicion del scroll al inicio en cada cambio de vista
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo(0, 0);
        }
    }, [pathname]);

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
                <div className={`fixed top-0 right-0 z-40 transition-all duration-300 ${isSidebarExpanded ? 'left-64' : 'sm:left-16 left-0'}`}>
                    <Header
                        onToggleSidebar={() => setIsSidebarExpanded(!isSidebarExpanded)}
                        onOpenMobileSheet={() => setIsMobileSheetOpen(true)}
                        onOpenSearch={() => setIsGlobalSearchOpen(true)}
                    />
                </div>

                <div ref={scrollContainerRef} className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar pb-content-safe sm:pb-12 pt-14">
                    <main className="w-full max-w-[3840px] mx-auto grid content-start grid-cols-4 sm:grid-cols-8 md:grid-cols-12 gap-4 sm:gap-6 p-6 xs:p-8 sm:p-12 md:px-24 md:py-12 2xl:px-40 2xl:py-12">
                        {children}
                    </main>
                    <Footer />
                </div>
            </div>

            <MobileNav />

            <SettingsSheet isOpen={isMobileSheetOpen} onClose={() => setIsMobileSheetOpen(false)} />

            <GlobalSearch
                isOpen={isGlobalSearchOpen}
                onClose={() => setIsGlobalSearchOpen(false)}
                onOpen={() => setIsGlobalSearchOpen(true)}
            />
        </ThemeProvider>
    );
}
