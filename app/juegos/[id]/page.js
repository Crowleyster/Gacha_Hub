import Link from 'next/link';
import Image from 'next/image';
import {
    ArrowLeft, Ticket, CalendarDays, Newspaper, Star,
    Info, Globe, Twitter, MessageSquare, Download, ChevronRight
} from 'lucide-react';
import { GAMES_DATA } from '@/lib/games-data';
import { newsData, EVENTS_DATA } from '@/lib/mock-data';
import PlatformIcon from '@/components/PlatformIcon';
import NewsCard from '@/components/NewsCard';
import EventCard from '@/components/EventCard';
import { getTimeInfo } from '@/lib/utils/date-utils';
import ActiveCodes from '@/components/ActiveCodes';
import FavoriteButton from '@/components/FavoriteButton';
import SectionCarousel from '@/components/ui/SectionCarousel';
import BannerCarousel from '@/components/BannerCarousel';
import GameSidebar from '@/components/GameSidebar';
import EmptyState from '@/components/ui/EmptyState';

/* ─────────────────────────────────────────────
   Componente: Section Header (Local/Compacto)
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

export default async function GameHub({ params }) {
    const { id } = await params;
    const game = GAMES_DATA[id];

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

    const genres = (game.genre || ['Acción', 'RPG']).slice(0, 2);

    // Lógica de datos (Server-side)
    const baseNews = newsData.filter(news => news.gameId === id).slice(0, 6);
    const gameNews = [...baseNews];
    let newsIdx = 1;
    while (gameNews.length < 4) {
        gameNews.push({
            id: `mock-news-${newsIdx}`,
            title: `[MOCK] Nueva Actualización de Contenido ${newsIdx}: Mejoras y Correcciones`,
            tag: "Actualización",
            date: "2026-03-31",
            imageUrl: game.bannerUrl,
            gameId: id
        });
        newsIdx++;
    }

    const baseEvents = EVENTS_DATA.filter(event => event.gameId === id);
    const gameEvents = baseEvents.filter(e => !getTimeInfo(e).expired);
    let eventIdx = 1;
    while (gameEvents.length < 3) {
        gameEvents.push({
            id: `mock-event-${eventIdx}`,
            title: `[MOCK] Temporada Abisal: Evento Especial ${eventIdx}`,
            description: "Compite con otros jugadores, farmea recompensas y desbloquea el nuevo material de ascensión de este mes.",
            gameId: id,
            imageUrl: game.bannerUrl || '/images/bgs/gacha-bg.webp',
            status: "active",
            type: "Misión",
            category: "General",
            startDate: "2026-03-01",
            endDate: "2026-04-15"
        });
        eventIdx++;
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
                <div className="absolute inset-0 bg-gradient-to-t from-background-default via-black/20 to-black/40" />

                <Link href="/juegos" className="absolute top-4 sm:top-6 left-4 sm:left-6 p-2 bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-black/80 transition-colors z-20">
                    <ArrowLeft className="w-6 h-6" />
                </Link>

                <FavoriteButton gameId={id} />
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
                        <h1 className="text-subheading-strong sm:text-heading lg:text-title-page text-text-default-default leading-tight drop-shadow-lg">{game.name}</h1>
                        <span className="text-body-small-strong sm:text-body-strong text-text-default-secondary">v{game.currentVersion}</span>
                    </div>
                </div>

                {/* Acciones y Tags Rápidos */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b border-border-default-secondary pb-6">
                    <a
                        href={game.officialSite || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto flex items-center justify-center gap-2 h-12 px-8 bg-brand-default text-text-brand-on rounded-2xl text-body-strong font-bold hover:opacity-90 transition-opacity whitespace-nowrap shadow-100"
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

            {/* ─── FASE 2: EL LAYOUT DE CONTENIDO ─── */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 px-4 md:px-8 mt-8 pb-12">

                <div className="flex-1 flex flex-col gap-12 min-w-0 order-1 lg:order-2">

                    {/* Códigos de Canje */}
                    <section className="flex flex-col gap-4">
                        <SectionHeader icon={Ticket} title="Códigos Activos" />
                        <ActiveCodes fixedGame={game.name} hideHeader={true} />
                    </section>

                    {/* Destacados / Gachapón */}
                    <section className="flex flex-col gap-4">
                        <SectionHeader icon={Star} title="Destacados y Gachapón" />
                        <BannerCarousel gameId={id} bannerUrl={game.bannerUrl} />
                    </section>

                    {/* Eventos Activos */}
                    <section className="flex flex-col gap-4">
                        <SectionHeader icon={CalendarDays} title="Cronograma de Eventos" />
                        {gameEvents.length > 0 ? (
                            <SectionCarousel>
                                {gameEvents.map(event => (
                                    <EventCard
                                        key={event.id}
                                        event={{ ...event, gameId: id }}
                                        className="w-[75vw] sm:w-[calc(50%-12px)]"
                                    />
                                ))}
                                <div className="w-1 shrink-0" aria-hidden="true" />
                            </SectionCarousel>
                        ) : (
                            <EmptyState
                                title="Sin eventos activos"
                                subtitle="No hay eventos activos en este momento. Revisa las noticias para próximos anuncios."
                            />
                        )}
                    </section>

                    {/* Últimas Noticias */}
                    {gameNews.length > 0 && (
                        <section className="flex flex-col gap-4">
                            <SectionHeader icon={Newspaper} title="Últimas Noticias" href={`/noticias?juego=${id}`} />
                            <SectionCarousel>
                                {gameNews.map(newsItem => (
                                    <NewsCard
                                        key={newsItem.id}
                                        id={newsItem.id}
                                        title={newsItem.title}
                                        tag={newsItem.tag}
                                        gameIconUrl={game.iconUrl}
                                        imageUrl={newsItem.imageUrl || game.bannerUrl}
                                        date={newsItem.date}
                                        isSmall={true}
                                        className="w-72 h-[380px] sm:w-80 sm:h-[420px]"
                                    />
                                ))}
                                <div className="w-1 shrink-0" aria-hidden="true" />
                            </SectionCarousel>
                        </section>
                    )}

                </div>

                <GameSidebar game={game} />

            </div>

        </main>
    );
}
