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

    // Layout Configuration for the 6 Positions
    const BENTO_LAYOUT = [
        "col-start-1 col-span-4 row-start-2 row-span-2 sm:col-span-8 md:col-span-12 lg:col-span-6 lg:row-start-2 lg:row-span-2", // Card-1 (Hero)
        "col-start-1 col-span-4 row-start-5 row-span-1 xs:row-start-4 sm:col-start-5 sm:col-span-4 sm:row-start-4 md:col-start-7 md:col-span-6 lg:col-start-1 lg:col-span-6 lg:row-start-4 lg:row-span-1", // Card-2
        "col-start-1 col-span-2 row-start-4 row-span-1 xs:row-start-6 xs:row-span-2 sm:row-start-4 sm:row-span-2 md:col-span-3 lg:col-start-7 lg:col-span-3 lg:row-start-3 lg:row-span-2", // Card-3
        "col-start-3 col-span-2 row-start-4 row-span-1 xs:row-start-5 xs:row-span-2 sm:row-start-4 sm:row-span-2 md:col-start-4 md:col-span-3 md:row-start-4 md:row-span-2 lg:col-start-10 lg:col-span-3 lg:row-start-2 lg:row-span-2", // Card-4
        "col-start-1 col-span-2 row-start-6 row-span-1 xs:row-start-5 sm:col-start-5 sm:row-start-5 sm:row-span-1 md:col-start-7 md:col-span-3 md:row-start-5 md:row-span-1 lg:col-start-7 lg:col-span-3 lg:row-start-2 lg:row-span-1", // Card-5
        "col-start-3 col-span-2 row-start-6 row-span-1 xs:row-start-7 sm:col-start-7 sm:row-start-5 md:col-start-10 md:col-span-3 lg:col-start-10 lg:col-span-3 lg:row-start-4 lg:row-span-1" // Card-6
    ];

    return (
        <section className="
            grid w-full font-sans
            /* Parent Grid Config (7 Breakpoints) */
            grid-cols-4 gap-4 grid-rows-[29px_repeat(5,240px)_46px]
            xs:grid-rows-[29px_repeat(6,240px)_46px]
            sm:grid-cols-8 sm:gap-6 sm:grid-rows-[46px_repeat(4,240px)]
            md:grid-cols-12 md:grid-rows-[46px_repeat(4,240px)]
            lg:grid-rows-[46px_repeat(3,240px)]
            xl:grid-rows-[46px_repeat(3,240px)]
            2xl:grid-rows-[46px_repeat(3,240px)]
            grid-auto-rows-[240px]
        ">
            {/* 1. Header (Fila 1) */}
            <div className="
                row-start-1 col-start-1 col-span-4
                sm:col-span-8 
                md:col-span-12
                lg:col-span-12
                flex items-center justify-between
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
                    row-start-7 xs:row-start-8
                "
            >
                Ver todas las noticias
                <ArrowRight className="w-4 h-4" />
            </Link>
        </section>
    );
}
