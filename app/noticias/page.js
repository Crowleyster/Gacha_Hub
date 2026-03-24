"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Newspaper, Search, FilterX, X } from 'lucide-react';
import { GAMES_DATA } from '@/lib/games-data';

/* ─── Placeholder: News Card (16:9 Uniforme) ─── */
function NewsCard({ news }) {
    const game = GAMES_DATA[news.gameId];
    const fallbackImage = news.imageUrl || game?.bannerUrl;

    return (
        <Link 
            href={`/noticias/${news.id}`}
            className="group flex flex-col bg-background-secondary border border-border-default-secondary rounded-2xl overflow-hidden hover:border-border-default-default transition-all shadow-100 hover:shadow-300"
        >
            <div className="relative aspect-video w-full overflow-hidden bg-background-tertiary">
                {fallbackImage && (
                    <Image src={fallbackImage} alt={news.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                )}
                <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-md border border-border-default-secondary rounded-md text-white text-body-small-strong drop-shadow-md">
                    {news.tag}
                </div>
            </div>
            <div className="flex flex-col p-4 gap-2 flex-1">
                <div className="flex items-center justify-between text-body-small text-text-default-tertiary">
                    <span className="font-medium text-text-brand-default">{game?.shortName || 'General'}</span>
                    <span>{new Date(news.date).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}</span>
                </div>
                <h3 className="text-body-strong text-text-default-default line-clamp-2 leading-tight group-hover:text-text-brand-default transition-colors">
                    {news.title}
                </h3>
            </div>
        </Link>
    );
}

export default function Noticias() {
    // Aplanar todas las noticias de todos los juegos
    const allNews = useMemo(() => {
        const newsArray = [];
        Object.values(GAMES_DATA).forEach(game => {
            if (game.news) {
                game.news.forEach(n => newsArray.push({ ...n, gameId: game.id }));
            }
        });
        // Ordenar de más nueva a más antigua
        return newsArray.sort((a, b) => new Date(b.date) - new Date(a.date));
    }, []);

    const [selectedGame, setSelectedGame] = useState('Todos');

    const filteredNews = useMemo(() => {
        return allNews.filter(news => selectedGame === 'Todos' || news.gameId === selectedGame);
    }, [allNews, selectedGame]);

    return (
        <main className="col-span-full space-y-8 pb-content-safe font-sans">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-background-secondary rounded-xl">
                        <Newspaper className="w-6 h-6 text-text-brand-default" />
                    </div>
                    <h1 className="text-title-page text-text-default-default">Portal de Noticias</h1>
                </div>
                <p className="text-body-base text-text-default-secondary max-w-2xl">
                    Mantente al día con las últimas actualizaciones, banners y anuncios oficiales.
                </p>
            </div>

            {/* Filtros rápidos por juego */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2">
                <button
                    onClick={() => setSelectedGame('Todos')}
                    className={`shrink-0 px-4 py-1.5 rounded-full text-body-small-strong transition-colors ${selectedGame === 'Todos' ? 'bg-brand-default text-text-brand-on' : 'bg-background-secondary text-text-default-secondary'}`}
                >
                    Todos
                </button>
                {Object.values(GAMES_DATA).map(game => (
                    <button
                        key={game.id}
                        onClick={() => setSelectedGame(game.id)}
                        className={`shrink-0 px-4 py-1.5 rounded-full text-body-small-strong transition-colors ${selectedGame === game.id ? 'bg-brand-default text-text-brand-on' : 'bg-background-secondary text-text-default-secondary'}`}
                    >
                        {game.shortName}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredNews.map(news => <NewsCard key={news.id} news={news} />)}
            </div>
        </main>
    );
}
