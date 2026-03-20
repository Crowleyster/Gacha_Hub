"use client";

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import NewsCard from './NewsCard';

export default function NewsBentoGrid() {
    // Mock Data for demonstration (6 Diferentes Gachas)
    const newsData = [
        {
            id: 1,
            title: "¡Ya disponible la versión 3.2!",
            tag: "Nueva versión",
            gameIconUrl: "https://play-lh.googleusercontent.com/L0Dn7FRoGO0Ocxb3MidlNpv_DMehL8xlEkVJcnb2MaxtdhCKIBMOC0IfWmpr0okokXfwKKw-PSxcDnoJrJ2v",
            imageUrl: "https://i.ytimg.com/vi/aMAJhkp0hlc/maxresdefault.jpg",
            isHero: true
        },
        {
            id: 2,
            title: "¡Ya disponible la versión 3.2!",
            tag: "Nueva versión",
            gameIconUrl: "https://play-lh.googleusercontent.com/L0Dn7FRoGO0Ocxb3MidlNpv_DMehL8xlEkVJcnb2MaxtdhCKIBMOC0IfWmpr0okokXfwKKw-PSxcDnoJrJ2v",
            imageUrl: "https://i.ytimg.com/vi/aMAJhkp0hlc/maxresdefault.jpg",
            isHero: false
        },
        {
            id: 3,
            title: "¡Ya disponible la versión 3.2!",
            tag: "Nueva versión",
            gameIconUrl: "https://play-lh.googleusercontent.com/L0Dn7FRoGO0Ocxb3MidlNpv_DMehL8xlEkVJcnb2MaxtdhCKIBMOC0IfWmpr0okokXfwKKw-PSxcDnoJrJ2v",
            imageUrl: "https://i.ytimg.com/vi/aMAJhkp0hlc/maxresdefault.jpg",
            isHero: false
        },
        {
            id: 4,
            title: "¡Ya disponible la versión 3.2!",
            tag: "Nueva versión",
            gameIconUrl: "https://play-lh.googleusercontent.com/L0Dn7FRoGO0Ocxb3MidlNpv_DMehL8xlEkVJcnb2MaxtdhCKIBMOC0IfWmpr0okokXfwKKw-PSxcDnoJrJ2v",
            imageUrl: "https://i.ytimg.com/vi/aMAJhkp0hlc/maxresdefault.jpg",
            isHero: false
        },
        {
            id: 5,
            title: "¡Ya disponible la versión 3.2!",
            tag: "Nueva versión",
            gameIconUrl: "https://play-lh.googleusercontent.com/L0Dn7FRoGO0Ocxb3MidlNpv_DMehL8xlEkVJcnb2MaxtdhCKIBMOC0IfWmpr0okokXfwKKw-PSxcDnoJrJ2v",
            imageUrl: "https://i.ytimg.com/vi/aMAJhkp0hlc/maxresdefault.jpg",
            isHero: false
        },
        {
            id: 6,
            title: "¡Ya disponible la versión 3.2!",
            tag: "Nueva versión",
            gameIconUrl: "https://play-lh.googleusercontent.com/L0Dn7FRoGO0Ocxb3MidlNpv_DMehL8xlEkVJcnb2MaxtdhCKIBMOC0IfWmpr0okokXfwKKw-PSxcDnoJrJ2v",
            imageUrl: "https://i.ytimg.com/vi/aMAJhkp0hlc/maxresdefault.jpg",
            isHero: false
        }
    ];

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
        <section className="
            grid w-full font-sans
            grid-cols-4 sm:grid-cols-8 md:grid-cols-12
            grid-flow-row-dense gap-4 sm:gap-6 
            auto-rows-[240px]
        ">
            {/* 1. Header (Fila 1) */}
            <div className="
                col-span-full
                flex items-center justify-between
                h-[46px]
            ">
                <h2 className="text-heading text-text-default-default font-sans">
                    Noticias Destacadas
                </h2>
                <Link
                    href="/noticias"
                    className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-background-secondary hover:bg-background-secondary-hover text-text-default-default transition-colors text-body-small-strong"
                >
                    Ver todas las noticias
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>

            {/* 2. Dynamic Bento Content */}
            {newsData.slice(0, 6).map((news, index) => (
                <div key={news.id} className={BENTO_LAYOUT[index]}>
                    <NewsCard 
                        {...news} 
                        isHero={index === 0}
                        isSmall={index >= 2} 
                    />
                </div>
            ))}

            {/* 3. Mobile Button (at the end) */}
            <Link
                href="/noticias"
                className="
                    sm:hidden col-span-full flex items-center justify-center gap-2 
                    rounded-lg bg-background-secondary hover:bg-background-secondary-hover text-text-default-default 
                    transition-colors text-body-small-strong w-full h-full
                    h-[46px]
                "
            >
                Ver todas las noticias
                <ArrowRight className="w-4 h-4" />
            </Link>
        </section>
    );
}
