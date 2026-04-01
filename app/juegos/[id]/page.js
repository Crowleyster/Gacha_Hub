"use client";

import { useMemo, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
    ArrowLeft, Globe, Twitter, MessageSquare, Download, Star, 
    Ticket, CalendarDays, Newspaper, Info, ChevronRight, ChevronLeft 
} from 'lucide-react';
import { GAMES_DATA } from '@/lib/games-data';
import { newsData, EVENTS_DATA } from '@/lib/mock-data';
import PlatformIcon from '@/components/PlatformIcon';
import NewsCard from '@/components/NewsCard';
import EventCard, { getTimeInfo } from '@/components/EventCard';
import ActiveCodes from '@/components/ActiveCodes';
import { useFavorites } from '@/hooks/useFavorites';

/* ─────────────────────────────────────────────
   Componente: Section Header
───────────────────────────────────────────── */
function SectionHeader({ icon: Icon, title, href }) {
    return (
        <div className="flex items-center justify-between mb-4 px-1">
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

/* ─────────────────────────────────────────────
   Componente: Carousel UI Wrapper
───────────────────────────────────────────── */
function SectionCarousel({ children }) {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: direction * 350, behavior: 'smooth' });
        }
    };

    return (
        <div className="relative group -mx-4 md:-mx-8 lg:mx-0">
            <button 
                onClick={() => scroll(-1)} 
                aria-label="Desplazar a la izquierda"
                className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-20 w-10 h-10 items-center justify-center rounded-full border border-border-default-default bg-background-default shadow-300 text-text-default-secondary hover:text-brand-default hover:border-brand-default transition-all duration-300 opacity-0 group-hover:opacity-100"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
                onClick={() => scroll(1)} 
                aria-label="Desplazar a la derecha"
                className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-20 w-10 h-10 items-center justify-center rounded-full border border-border-default-default bg-background-default shadow-300 text-text-default-secondary hover:text-brand-default hover:border-brand-default transition-all duration-300 opacity-0 group-hover:opacity-100"
            >
                <ChevronRight className="w-5 h-5" />
            </button>

            <div 
                ref={scrollRef} 
                className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 px-4 md:px-8 lg:px-0 scroll-pl-4 md:scroll-pl-8 lg:scroll-pl-0"
            >
                {children}
            </div>
        </div>
    );
}

export default function GameHub() {
    const { id } = useParams();
    const game = GAMES_DATA[id];
    const { toggleFavorite, isFavorite } = useFavorites();

    const isFav = isFavorite(id);

    // ── MOCKS DEFENSIVOS / TODO ─────────────────────
    // TODO: Estos campos vendrán del CMS oficial pronto.
    const publisher = game?.publisher || "Publisher Desconocido";
    const genres = game?.genre || ["RPG", "Gacha"]; // Mock fallback array
    const releaseDate = game?.releaseDate?.pc || game?.releaseDate || "TBA";
    
    // Mock de Banners Promocionales (Storefront Highlights)
    const activeBanners = [
        { id: 1, image: game?.bannerUrl, title: "Nuevo Personaje 5★" },
        { id: 2, image: game?.bannerUrl, title: "Evento de Temporada" }
    ];
    // ─────────────────────────────────────────────

    const baseNews = useMemo(() => newsData.filter(news => news.gameId === id).slice(0, 6), [id]);
    const gameNews = useMemo(() => {
        const news = [...baseNews];
        let i = 1;
        while (news.length < 4) {
            news.push({
                id: `mock-news-${i}`,
                title: `[MOCK] Nueva Actualización de Contenido ${i}: Mejoras y Correcciones`,
                tag: "Actualización",
                date: "2026-03-31",
                imageUrl: game?.bannerUrl,
                gameId: id
            });
            i++;
        }
        return news;
    }, [baseNews, game, id]);

    const baseEvents = useMemo(() => EVENTS_DATA.filter(event => event.gameId === id), [id]);
    const gameEvents = useMemo(() => {
        const events = baseEvents.filter(e => !getTimeInfo(e).expired);
        let i = 1;
        while (events.length < 3) {
            events.push({
                id: `mock-event-${i}`,
                title: `[MOCK] Temporada Abisal: Evento Especial ${i}`,
                description: "Compite con otros jugadores, farmea recompensas y desbloquea el nuevo material de ascensión de este mes.",
                gameId: id,
                imageUrl: game?.bannerUrl || '/images/bgs/gacha-bg.webp',
                status: "active",
                type: "Misión",
                category: "General",
                startDate: "2026-03-01",
                endDate: "2026-04-15"
            });
            i++;
        }
        return events;
    }, [baseEvents, game, id]);

    if (!game) {
        return (
            <main className="col-span-full py-20 text-center flex flex-col items-center justify-center gap-4">
                <h1 className="text-title-page text-text-default-default">Juego no encontrado</h1>
                <Link href="/juegos" className="px-6 py-2 bg-brand-default text-text-brand-on rounded-xl text-body-strong">
                    Volver al catálogo
                </Link>
            </main>
        );
    }

    return (
        <main className="col-span-full pb-content-safe font-sans flex flex-col">
            
            {/* ─── FASE 1: LA CABECERA (STOREFRONT) ─── */}
            
            {/* Hero Banner */}
            <section className="relative w-full h-48 sm:h-64 md:h-80 bg-background-tertiary border border-border-default-secondary rounded-[32px] sm:rounded-[48px] overflow-hidden">
                {game.bannerUrl && (
                    <Image 
                        src={game.bannerUrl} 
                        alt={game.name} 
                        fill 
                        priority 
                        className="object-cover" 
                    />
                )}
                {/* Gradiente oscuro que se funde con el fondo */}
                <div className="absolute inset-0 bg-gradient-to-t from-background-default via-black/20 to-black/40" />
                
                <Link href="/juegos" className="absolute top-4 sm:top-6 left-4 sm:left-6 p-2 bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-black/80 transition-colors z-20">
                    <ArrowLeft className="w-6 h-6" />
                </Link>

                <button
                    onClick={() => toggleFavorite(id)}
                    className={`absolute top-4 sm:top-6 right-4 sm:right-6 p-2 backdrop-blur-md rounded-full transition-all duration-300 hover:scale-105 z-20 shadow-sm ${isFav ? 'bg-amber-500/80 text-white' : 'bg-black/40 text-white hover:bg-black/80'}`}
                    aria-label={isFav ? "Quitar de favoritos" : "Añadir a favoritos"}
                >
                    <Star className="w-6 h-6" fill={isFav ? "currentColor" : "none"} />
                </button>
            </section>

            {/* Identidad Solapada */}
            <section className="-mt-8 sm:-mt-12 md:-mt-16 relative z-10 px-4 md:px-8 flex flex-col gap-6">
                
                <div className="flex flex-row items-end gap-3 sm:gap-4 md:gap-6">
                    {/* Izquierda: Ícono */}
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 shrink-0 rounded-2xl border-4 border-background-default shadow-300 bg-background-default overflow-hidden">
                        {game.iconUrl && (
                            <Image 
                                src={game.iconUrl} 
                                alt={`${game.name} icon`} 
                                fill 
                                sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, 96px"
                                className="object-cover" 
                            />
                        )}
                    </div>

                    {/* Derecha: Título y Versión */}
                    <div className="flex-1 flex flex-col gap-0.5 pb-1 md:pb-2">
                        <h1 className="text-subheading-strong sm:text-heading lg:text-title-page text-text-default-default leading-tight">{game.name}</h1>
                        <span className="text-body-small-strong sm:text-body-strong text-text-default-secondary">v{game.currentVersion}</span>
                    </div>
                </div>

                {/* Acciones y Tags Rápidos */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b border-border-default-secondary pb-6">
                    <a 
                        href={game.officialSite || '#'} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="w-full sm:w-auto flex items-center justify-center gap-2 h-12 px-8 bg-brand-default text-text-brand-on rounded-[16px] text-body-strong font-bold hover:opacity-90 transition-opacity whitespace-nowrap shadow-sm"
                    >
                        <Download className="w-5 h-5" /> Jugar Gratis
                    </a>

                    <div className="flex gap-2 overflow-x-auto scrollbar-none w-full pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0">
                        {game.platforms.map(p => (
                            <div key={p} className="flex items-center gap-2 px-3 py-1.5 bg-background-secondary border border-border-default-secondary rounded-lg text-body-small-strong text-text-default-default whitespace-nowrap shrink-0">
                                <PlatformIcon platform={p} className="w-4 h-4 text-text-default-secondary" /> {p}
                            </div>
                        ))}
                        <div className="w-px h-6 bg-border-default-secondary self-center mx-1 shrink-0" />
                        {genres.map(g => (
                            <span key={g} className="px-3 py-1.5 bg-background-tertiary border border-border-default-secondary rounded-lg text-badge tracking-wider text-text-default-secondary whitespace-nowrap shrink-0">
                                {g}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── FASE 2: EL LAYOUT DE CONTENIDO (FLEXBOX ASIMÉTRICO) ─── */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 px-4 md:px-8 mt-8 pb-12">
                
                {/* ─── FASE 3: COLUMNA DINÁMICA (ACCIÓN Y URGENCIA) ─── */}
                <div className="flex-1 flex flex-col gap-12 min-w-0 order-1 lg:order-2">
                    
                    {/* Códigos de Canje */}
                    <section>
                        <SectionHeader icon={Ticket} title="Códigos Activos" />
                        <div className="bg-background-secondary border border-border-default-secondary p-4 sm:p-6 rounded-3xl">
                             <ActiveCodes fixedGame={game.name} hideHeader={true} />
                        </div>
                    </section>

                    {/* Destacados / Gachapón (Carrusel Promocional) */}
                    <section className="flex flex-col gap-4">
                        <SectionHeader icon={Star} title="Destacados y Gachapón" />
                        <SectionCarousel>
                            {activeBanners.map(banner => (
                                <div key={banner.id} className="relative w-[85vw] sm:w-[400px] aspect-[21/9] shrink-0 snap-center rounded-[24px] overflow-hidden border border-border-default-secondary bg-background-tertiary group/banner">
                                    {banner.image && (
                                        <Image src={banner.image} alt={banner.title} fill sizes="(max-width: 768px) 85vw, 400px" className="object-cover transition-transform duration-500 group-hover/banner:scale-105" />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <h4 className="text-body-strong text-white uppercase tracking-wider line-clamp-2">{banner.title}</h4>
                                    </div>
                                </div>
                            ))}
                            <div className="w-1 shrink-0" aria-hidden="true" />
                        </SectionCarousel>
                    </section>

                    {/* Eventos Activos */}
                    {gameEvents.length > 0 && (
                        <section className="flex flex-col gap-4">
                            <SectionHeader icon={CalendarDays} title="Cronograma de Eventos" />
                            <SectionCarousel>
                                {gameEvents.map(event => (
                                    <div key={event.id} className="w-[85vw] md:w-80 lg:w-[340px] shrink-0 snap-center">
                                        <EventCard event={{...event, gameId: id}} />
                                    </div>
                                ))}
                                <div className="w-1 shrink-0" aria-hidden="true" />
                            </SectionCarousel>
                        </section>
                    )}

                    {/* Últimas Noticias (Carrusel) */}
                    {gameNews.length > 0 && (
                        <section className="flex flex-col gap-4">
                            <SectionHeader icon={Newspaper} title="Últimas Noticias" href={`/noticias?juego=${id}`} />
                            <SectionCarousel>
                                {gameNews.map(newsItem => (
                                    <div key={newsItem.id} className="w-[85vw] md:w-80 lg:w-[340px] shrink-0 snap-center h-[260px] sm:h-[280px]">
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
                                <div className="w-1 shrink-0" aria-hidden="true" />
                            </SectionCarousel>
                        </section>
                    )}

                </div>

                {/* ─── FASE 4: COLUMNA ESTÁTICA (CONTEXTO) ─── */}
                <div className="w-full lg:w-[320px] shrink-0 flex flex-col order-2 lg:order-1 lg:pt-2">
                    
                    <div className="flex-1 flex flex-col gap-10 bg-background-secondary border border-border-default-secondary rounded-[32px] p-6 sm:p-8">
                        {/* Acerca del Juego */}
                        <section className="flex flex-col gap-4">
                            <SectionHeader icon={Info} title="Acerca del juego" />
                            <p className="text-body-base text-text-default-secondary leading-relaxed whitespace-pre-line">
                                {game.description || 'No hay descripción disponible para este juego en este momento. Vuelve pronto para obtener más detalles.'}
                            </p>
                        </section>

                        {/* Ficha Técnica (Lista Tipográfica Limpia) */}
                        <section className="flex flex-col gap-5 pt-6 border-t border-border-default-secondary">
                            <h3 className="text-body-strong text-text-default-default uppercase tracking-wider">Ficha Técnica</h3>
                            
                            <div className="flex flex-col gap-4">
                                <div className="flex justify-between items-baseline gap-4">
                                    <span className="text-body-small-strong text-text-default-tertiary">Desarrollador</span>
                                    <span className="text-body-small-strong text-text-default-default text-right">{game.developer}</span>
                                </div>
                                <div className="flex justify-between items-baseline gap-4">
                                    <span className="text-body-small-strong text-text-default-tertiary">Publisher</span>
                                    <span className="text-body-small-strong text-text-default-default text-right">{publisher}</span>
                                </div>
                                <div className="flex justify-between items-baseline gap-4">
                                    <span className="text-body-small-strong text-text-default-tertiary">Lanzamiento Inicial</span>
                                    <span className="text-body-small-strong text-text-default-default text-right">{releaseDate}</span>
                                </div>
                            </div>
                        </section>

                        {/* Comunidades y Redes Sociales */}
                        <section className="flex flex-col gap-5 pt-6 border-t border-border-default-secondary">
                             <h3 className="text-body-strong text-text-default-default uppercase tracking-wider">Comunidad Oficial</h3>
                             <div className="flex flex-wrap gap-2">
                                {game.socialLinks?.twitter && (
                                    <a href={game.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-3 bg-background-tertiary border border-border-default-secondary rounded-xl text-text-default-secondary hover:text-brand-default hover:border-brand-default transition-all w-12 h-12" title="Twitter"><Twitter className="w-5 h-5" /></a>
                                )}
                                {game.socialLinks?.discord && (
                                    <a href={game.socialLinks.discord} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-3 bg-background-tertiary border border-border-default-secondary rounded-xl text-text-default-secondary hover:text-brand-default hover:border-brand-default transition-all w-12 h-12" title="Discord"><MessageSquare className="w-5 h-5" /></a>
                                )}
                                {game.officialSite && (
                                    <a href={game.officialSite} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-3 bg-background-tertiary border border-border-default-secondary rounded-xl text-text-default-secondary hover:text-brand-default hover:border-brand-default transition-all w-12 h-12" title="Sitio Oficial"><Globe className="w-5 h-5" /></a>
                                )}
                            </div>
                        </section>
                    </div>

                </div>

            </div>

        </main>
    );
}
