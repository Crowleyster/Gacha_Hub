"use client";

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import NewsCard from './NewsCard';
import { newsData } from '@/lib/mock-data';
import { GAMES_DATA } from '@/lib/games-data'; // <- Añadir esta línea arriba


export default function NewsBentoGrid() {
    // Layout Configuration (Optimized for Tablet & Desktop)
    const BENTO_LAYOUT = [
        "col-span-4 row-span-2 sm:col-span-8 md:col-span-12 lg:col-span-6 lg:row-span-2", // Card-1 (Hero)
        "col-span-4 row-span-1 sm:col-span-8 md:col-span-12 lg:col-span-6",                // Card-2
        "col-span-2 row-span-1 sm:col-span-4 md:col-span-6 lg:col-span-3 lg:row-span-2",   // Card-3
        "col-span-2 row-span-1 sm:col-span-4 md:col-span-6 lg:col-span-3 lg:row-span-2",   // Card-4
        "col-span-2 row-span-1 sm:col-span-4 md:col-span-6 lg:col-span-3 lg:row-span-1",   // Card-5
        "col-span-2 row-span-1 sm:col-span-4 md:col-span-6 lg:col-span-3 lg:row-span-1"    // Card-6
    ];

    return (
        <section className="flex flex-col gap-6 w-full font-sans">
            {/* 1. Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-heading text-text-default-default">
                    Noticias Destacadas
                </h2>
                <Link
                    href="/noticias"
                    className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-background-secondary hover:bg-background-secondary-hover text-text-default-default hover:text-text-brand-default transition-colors text-body-small-strong"
                >
                    Ver todas las noticias
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>

            {/* 2. Bento Grid (Solo para el contenido) */}
<div className="
    grid grid-cols-4 sm:grid-cols-8 md:grid-cols-12
    grid-flow-row-dense gap-4 sm:gap-6 
    auto-rows-[240px]
">
    {newsData.slice(0, 6).map((news, index) => {
        
        // 🛠️ LÓGICA DE RESPALDO (FALLBACK)
        // Si la noticia tiene imagen, la usa. Si no, busca el banner del juego.
        const fallbackImage = news.imageUrl || GAMES_DATA[news.gameId]?.bannerUrl;

        return (
            <div key={news.id} className={BENTO_LAYOUT[index]}>
                <NewsCard 
                    {...news} 
                    imageUrl={fallbackImage} // <- Sobrescribimos la imagen aquí
                    href="/noticias"
                    isHero={index === 0}
                    isSmall={index >= 2} 
                />
            </div>
        );
    })}
</div>


            {/* 3. Mobile Button (at the end) */}
            <Link
                href="/noticias"
                className="
                    sm:hidden flex items-center justify-center gap-2 
                    rounded-lg bg-background-secondary hover:bg-background-secondary-hover
                    text-text-default-default hover:text-text-brand-default
                    transition-colors text-body-small-strong w-full h-12
                "
            >
                Ver todas las noticias
                <ArrowRight className="w-4 h-4" />
            </Link>
        </section>
    );
}
