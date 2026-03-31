"use client";

import { useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
    ArrowLeft, Globe, Twitter, MessageSquare, Download, Star, 
    Ticket, CalendarDays, Newspaper, Info, ChevronRight 
} from 'lucide-react';
import { GAMES_DATA } from '@/lib/games-data';
import { newsData, EVENTS_DATA } from '@/lib/mock-data';
import PlatformIcon from '@/components/PlatformIcon';
import NewsCard from '@/components/NewsCard';
import EventCard from '@/components/EventCard';
import ActiveCodes from '@/components/ActiveCodes';
import { useFavorites } from '@/hooks/useFavorites';

/* ─────────────────────────────────────────────
   Componente Base: BentoBox
───────────────────────────────────────────── */
function BentoBox({ children, className, noPadding = false, transparent = false }) {
    if (transparent) return <div className={className}>{children}</div>;
    
    return (
        <div className={`
            bg-background-secondary border border-border-default-secondary rounded-[32px] shadow-200 
            overflow-hidden relative flex flex-col
            ${!noPadding ? 'p-6 sm:p-8' : ''}
            ${className}
        `}>
            {children}
        </div>
    );
}

/* ─────────────────────────────────────────────
   Componente: SectionHeader (Bento version)
───────────────────────────────────────────── */
function BentoSectionHeader({ icon: Icon, title, href }) {
    return (
        <div className="flex items-center justify-between mb-6 px-2">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-default/10 text-brand-default flex items-center justify-center border border-brand-default/20">
                    <Icon className="w-4 h-4" />
                </div>
                <h3 className="text-body-strong text-text-default-default uppercase tracking-wider">{title}</h3>
            </div>
            {href && (
                <Link href={href} className="text-body-small-strong text-brand-default hover:underline flex items-center gap-1 group">
                    Ver todo
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
            )}
        </div>
    );
}

export default function GameHub() {
    const { id } = useParams();
    const game = GAMES_DATA[id];
    const { toggleFavorite, isFavorite } = useFavorites();

    const isFav = isFavorite(id);

    // ── MOCK DEFENSIVO / TODO ─────────────────────
    // TODO: Estos campos vendrán del CMS oficial pronto.
    const publisher = game?.publisher || "Publisher Desconocido";
    const genres = game?.genre || ["Categoría Pendiente"];
    const releaseDate = game?.releaseDate?.pc || game?.releaseDate?.android || "TBA";
    // ─────────────────────────────────────────────

    const gameNews = useMemo(() => newsData.filter(news => news.gameId === id).slice(0, 6), [id]);
    const gameEvents = useMemo(() => EVENTS_DATA.filter(event => event.gameId === id), [id]);

    // Mock de Banners Promocionales (Caja 3)
    const promoBanners = [
        { id: 1, image: game?.bannerUrl, title: "Nuevo Personaje 5★" },
        { id: 2, image: game?.bannerUrl, title: "Evento de Temporada" }
    ];

    if (!game) {
        return (
            <main className="col-span-full py-20 text-center">
                <h1 className="text-title-page">Juego no encontrado</h1>
                <Link href="/juegos" className="text-brand-default underline mt-4 block">Volver al catálogo</Link>
            </main>
        );
    }

    return (
        <main className="col-span-full pb-content-safe font-sans flex flex-col gap-6 md:gap-8">
            
            {/* GRID PRINCIPAL BENTO 12 COLUMNAS */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 auto-rows-min">

                {/* CAJA 1: HERO (8 COLS) */}
                <BentoBox noPadding className="md:col-span-8 h-[400px] md:h-[480px]">
                    <Image 
                        src={game.bannerUrl} 
                        alt={game.name} 
                        fill 
                        priority 
                        className="object-cover transition-transform duration-700 hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    
                    <Link href="/juegos" className="absolute top-6 left-6 p-2 bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-black/60 transition-colors z-20">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>

                    <div className="absolute bottom-0 left-0 w-full p-6 sm:p-10 flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                            <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0">
                                <Image 
                                    src={game.iconUrl} 
                                    alt={`${game.name} icon`} 
                                    fill 
                                    sizes="80px"
                                    className="rounded-2xl border-2 border-white/20 shadow-2xl object-cover" 
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <h1 className="text-title-page sm:text-title-hero text-white leading-tight">{game.name}</h1>
                                <div className="flex items-center gap-2">
                                    <span className="text-body-small-strong text-white/60 bg-white/10 px-2 py-0.5 rounded-md backdrop-blur-sm">v{game.currentVersion}</span>
                                    <button
                                        onClick={() => toggleFavorite(id)}
                                        className={`p-1.5 rounded-lg border transition-all ${isFav ? 'bg-amber-500 border-amber-500 text-white shadow-lg' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}`}
                                    >
                                        <Star className="w-4 h-4" fill={isFav ? "currentColor" : "none"} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </BentoBox>

                {/* CAJA 2: FICHA TÉCNICA (4 COLS) */}
                <BentoBox className="md:col-span-4 flex flex-col justify-between gap-8 h-[400px] md:h-[480px]">
                    <div className="flex flex-col gap-6">
                        <BentoSectionHeader icon={Info} title="Ficha Técnica" />
                        
                        <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                            <div className="flex flex-col gap-1">
                                <span className="text-caption text-text-default-tertiary uppercase tracking-widest">Desarrollador</span>
                                <span className="text-body-small-strong text-text-default-default">{game.developer}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-caption text-text-default-tertiary uppercase tracking-widest">Publisher</span>
                                <span className="text-body-small-strong text-text-default-default">{publisher}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-caption text-text-default-tertiary uppercase tracking-widest">Lanzamiento</span>
                                <span className="text-body-small-strong text-text-default-default">{releaseDate}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-caption text-text-default-tertiary uppercase tracking-widest">Plataformas</span>
                                <div className="flex items-center gap-2 mt-0.5">
                                    {game.platforms.map(p => (
                                        <PlatformIcon key={p} platform={p} className="w-3.5 h-3.5 text-text-default-secondary" />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-2">
                            {genres.map(g => (
                                <span key={g} className="px-2.5 py-1 bg-background-tertiary border border-border-default-secondary rounded-lg text-badge text-text-default-secondary">
                                    {g}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 pt-6 border-t border-border-default-secondary">
                        <div className="flex gap-2">
                            {game.socialLinks?.twitter && (
                                <a href={game.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="p-3 bg-background-default border border-border-default-default rounded-xl text-text-default-secondary hover:text-brand-default transition-colors"><Twitter className="w-5 h-5" /></a>
                            )}
                            {game.socialLinks?.discord && (
                                <a href={game.socialLinks.discord} target="_blank" rel="noopener noreferrer" className="p-3 bg-background-default border border-border-default-default rounded-xl text-text-default-secondary hover:text-brand-default transition-colors"><MessageSquare className="w-5 h-5" /></a>
                            )}
                            {game.officialSite && (
                                <a href={game.officialSite} target="_blank" rel="noopener noreferrer" className="p-3 bg-background-default border border-border-default-default rounded-xl text-text-default-secondary hover:text-brand-default transition-colors"><Globe className="w-5 h-5" /></a>
                            )}
                        </div>
                        <a href={game.officialSite || '#'} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 h-12 bg-brand-default text-text-brand-on rounded-2xl text-body-strong hover:brightness-110 shadow-lg transition-all active:scale-95">
                            <Download className="w-5 h-5" /> Visitar Juego
                        </a>
                    </div>
                </BentoBox>

                {/* CAJA 3: BANNERS / GACHAPÓN (8 COLS) - MOBILE FULL-BLEED */}
                <div className="md:col-span-8 flex flex-col gap-4">
                    <BentoSectionHeader icon={Star} title="Destacados" />
                    <div className="-mx-4 px-4 md:mx-0 md:px-0"> {/* Mobile Full-Bleed Magic */}
                        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4">
                            {promoBanners.map(banner => (
                                <div key={banner.id} className="relative w-[85vw] md:w-full md:aspect-[21/9] shrink-0 snap-start h-44 sm:h-56 md:h-auto rounded-[32px] overflow-hidden border border-border-default-secondary group">
                                    <Image src={banner.image} alt={banner.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                    <div className="absolute bottom-6 left-6">
                                        <h4 className="text-body-strong text-white uppercase tracking-wider">{banner.title}</h4>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* CAJA 4: CÓDIGOS (4 COLS) */}
                <BentoBox className="md:col-span-4 h-full">
                    <BentoSectionHeader icon={Ticket} title="Codes" />
                    <div className="flex-1 -mx-4 px-4 sm:mx-0 sm:px-0">
                         <ActiveCodes fixedGame={game.name} hideHeader={true} />
                    </div>
                </BentoBox>

                {/* CAJA 5: EVENTOS (12 COLS) - MOBILE FULL-BLEED */}
                <div className="md:col-span-12 flex flex-col gap-4 mt-4">
                    <BentoSectionHeader icon={CalendarDays} title="Eventos Activos" href="/eventos" />
                    <div className="-mx-4 px-4 md:mx-0 md:px-0"> {/* Mobile Full-Bleed Magic */}
                        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4">
                            {gameEvents.map(event => (
                                <div key={event.id} className="w-[80vw] sm:w-80 md:w-96 shrink-0 snap-start">
                                    <EventCard event={{...event, gameId: id}} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* CAJA 6: NOTICIAS (12 COLS) - TRANSPARENTE */}
                <div className="md:col-span-12 flex flex-col gap-2 mt-4">
                    <BentoSectionHeader icon={Newspaper} title="Noticias" href="/noticias" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {gameNews.map(newsItem => (
                            <div key={newsItem.id} className="h-[280px]">
                                <NewsCard 
                                    title={newsItem.title}
                                    tag={newsItem.tag}
                                    gameIconUrl={game.iconUrl}
                                    imageUrl={newsItem.imageUrl || game.bannerUrl}
                                    date={newsItem.date}
                                    isSmall={true}
                                    href={`/noticias/${newsItem.id}`}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* CAJA 7: ACERCA DE (12 COLS) */}
                <BentoBox className="md:col-span-12 mt-4">
                    <BentoSectionHeader icon={Info} title={`Acerca de ${game.name}`} />
                    <p className="text-body-base text-text-default-secondary leading-relaxed whitespace-pre-line max-w-4xl">
                        {game.description || 'No hay descripción disponible para este juego.'}
                    </p>
                </BentoBox>

            </div>

        </main>
    );
}
