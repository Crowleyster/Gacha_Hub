"use client";

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import NewsCard from './NewsCard';

export default function NewsBentoGrid() {
    // Mock Data for demonstration (6 Diferentes Gachas)
    const newsData = [
        {
            id: 1,
            title: "Genshin Impact: La expedición a Natlan ya está disponible para todos",
            tag: "NUEVA REGIÓN",
            gameIconUrl: "https://api.dicebear.com/7.x/identicon/svg?seed=genshin",
            imageUrl: "https://images.unsplash.com/photo-1614728263952-84ea206f99b6?q=80&w=1200",
            isHero: true
        },
        {
            id: 2,
            title: "Honkai Star Rail: Ruan Mei y Blade regresan en los nuevos banners",
            tag: "BANNERS",
            gameIconUrl: "https://api.dicebear.com/7.x/identicon/svg?seed=starrail",
            imageUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1000",
            isHero: false
        },
        {
            id: 3,
            title: "ZZZ: ¿Cómo buildear a Jane Doe? Análisis de Anomalía Físico",
            tag: "GUÍA",
            gameIconUrl: "https://api.dicebear.com/7.x/identicon/svg?seed=zzz",
            imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000",
            isHero: false
        },
        {
            id: 4,
            title: "Blue Archive: ¡El Comité de Disciplina sale a la playa!",
            tag: "EVENTO",
            gameIconUrl: "https://api.dicebear.com/7.x/identicon/svg?seed=bluearchive",
            imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000",
            isHero: false
        },
        {
            id: 5,
            title: "Nikke: Colaboración con Evangelion: Recluta a Asuka y Rei",
            tag: "COLABORACIÓN",
            gameIconUrl: "https://api.dicebear.com/7.x/identicon/svg?seed=nikke",
            imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000",
            isHero: false
        },
        {
            id: 6,
            title: "Arknights: Nuevo Episodio: Una historia de Victoria disponible",
            tag: "HISTORIA",
            gameIconUrl: "https://api.dicebear.com/7.x/identicon/svg?seed=arknights",
            imageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1000",
            isHero: false
        }
    ];

    return (
        <section className="
            grid w-full font-sans
            /* Parent Grid Config (7 Breakpoints) */
            /* XXS (Base < 540px) */
            grid-cols-4 gap-4 grid-rows-[29px_repeat(5,240px)_46px]
            /* XS (540px - 767px) */
            xs:grid-rows-[29px_repeat(6,240px)_46px]
            /* S (768px - 1023px) */
            sm:grid-cols-8 sm:gap-6 sm:grid-rows-[46px_repeat(4,240px)]
            /* M (1024px - 1279px) */
            md:grid-cols-12 md:grid-rows-[46px_repeat(4,240px)]
            /* L (1280px - 1535px) */
            lg:grid-rows-[46px_repeat(3,240px)]
            /* XL (1536px - 1919px) */
            xl:grid-rows-[46px_repeat(3,240px)]
            /* XXL (>= 1920px) */
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
                {/* Botón visible solo en Tablet/Desktop en Fila 1 */}
                <Link
                    href="/noticias"
                    className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-background-secondary hover:bg-background-secondary-hover text-text-default-default transition-colors text-body-small-strong"
                >
                    Ver todas las noticias
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>

            {/* 2. 6 Tarjetas (Priority Order: Card-1 to Card-6) */}
            
            {/* Card-1 (Hero) */}
            <div className="
                col-start-1 col-span-4 row-start-2 row-span-2
                sm:col-span-8
                md:col-span-12
                lg:col-span-6 lg:row-start-2 lg:row-span-2
            ">
                <NewsCard {...newsData[0]} />
            </div>

            {/* Card-2 */}
            <div className="
                col-start-1 col-span-4 row-start-5 row-span-1
                xs:row-start-4
                sm:col-start-5 sm:col-span-4 sm:row-start-4
                md:col-start-7 md:col-span-6
                lg:col-start-1 lg:col-span-6 lg:row-start-4 lg:row-span-1
            ">
                <NewsCard {...newsData[1]} />
            </div>

            {/* Card-3 */}
            <div className="
                col-start-1 col-span-2 row-start-4 row-span-1
                xs:row-start-6 xs:row-span-2
                sm:row-start-4 sm:row-span-2
                md:col-span-3
                lg:col-start-7 lg:col-span-3 lg:row-start-3 lg:row-span-2
            ">
                <NewsCard {...newsData[2]} />
            </div>

            {/* Card-4 */}
            <div className="
                col-start-3 col-span-2 row-start-4 row-span-1
                xs:row-start-5 xs:row-span-2
                sm:row-start-4 sm:row-span-2
                md:col-start-4 md:col-span-3 md:row-start-4 md:row-span-2
                lg:col-start-10 lg:col-span-3 lg:row-start-2 lg:row-span-2
            ">
                <NewsCard {...newsData[3]} />
            </div>

            {/* Card-5 */}
            <div className="
                col-start-1 col-span-2 row-start-6 row-span-1
                xs:row-start-5
                sm:col-start-5 sm:row-start-5 sm:row-span-1
                md:col-start-7 md:col-span-3 md:row-start-5 md:row-span-1
                lg:col-start-7 lg:col-span-3 lg:row-start-2 lg:row-span-1
            ">
                <NewsCard {...newsData[4]} />
            </div>

            {/* Card-6 */}
            <div className="
                col-start-3 col-span-2 row-start-6 row-span-1
                xs:row-start-7
                sm:col-start-7 sm:row-start-5
                md:col-start-10 md:col-span-3
                lg:col-start-10 lg:col-span-3 lg:row-start-4 lg:row-span-1
            ">
                <NewsCard {...newsData[5]} />
            </div>

            {/* 3. Button (Mobile only at the end) */}
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
