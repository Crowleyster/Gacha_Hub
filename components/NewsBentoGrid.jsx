"use client";

import SectionHeader from './SectionHeader';
import { Newspaper, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import NewsCard from './NewsCard';
export default function NewsBentoGrid({ newsData = [], gamesData = {} }) {
    // Layout Configuration (Optimized for Tablet & Desktop)
    // Hierarchy Configuration (1: Hero, 2: Relevant, 3+: Small)
    const BENTO_LAYOUT = [
        // Level 1: Card 1 (Most important) - Full wide always, double height
        "col-span-full row-span-2 lg:col-span-6 lg:row-span-2",
        // Level 2: Card 2 (Relevant) - Full wide always, normal height
        "col-span-full row-span-1 lg:col-span-6 lg:row-span-1",
        // Level 3: Cards 3-6 (Others) - 1 col (mobile), 1 col (sm), 2 col (md), 3 col (lg)
        "col-span-1 md:col-span-2 lg:col-span-3 lg:row-span-2",
        "col-span-1 md:col-span-2 lg:col-span-3 lg:row-span-2",
        "col-span-1 md:col-span-2 lg:col-span-3 lg:row-span-1",
        "col-span-1 md:col-span-2 lg:col-span-3 lg:row-span-1"
    ];

    return (
        <section className="flex flex-col gap-6 w-full font-sans">
            {/* 1. Header Unificado */}
            <SectionHeader
                icon={Newspaper}
                title="Noticias"
                subtitle="Destacadas"
                href="/noticias"
                ctaLabel="Ver todas"
            />

            {/* 2. Bento Grid con Jerarquía de 3 Niveles */}
            <div className="
    grid grid-cols-1 min-[480px]:grid-cols-2 sm:grid-cols-4 lg:grid-cols-12
    grid-flow-row-dense gap-4 sm:gap-6 
    auto-rows-[200px] sm:auto-rows-[240px]
">
                {newsData.slice(0, 6).map((news, index) => {

                    // 🛠️ LÓGICA DE RESPALDO (FALLBACK)
                    const fallbackImage = news.imageUrl || gamesData[news.gameId]?.bannerUrl;

                    return (
                        <div key={news.id} className={BENTO_LAYOUT[index]}>
                            <NewsCard
                                {...news}
                                imageUrl={fallbackImage}
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
