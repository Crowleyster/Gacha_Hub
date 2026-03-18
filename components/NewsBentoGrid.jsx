"use client";

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const NEWS_DATA = [
    {
        id: 1,
        title: "Wuthering Waves 1.1: 'Thaw of Eons' - Nuevos Personajes y Región",
        category: "Actualización",
        image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=1200",
        isHero: true
    },
    {
        id: 2,
        title: "Dev Log: Mejoras en el sistema de Echoes",
        category: "Desarrollo",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800",
        isHero: false
    },
    {
        id: 3,
        title: "Guía: Mejores composiciones para el Abismo",
        category: "Guía",
        image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800",
        isHero: false
    }
];

function NewsCard({ news, className }) {
    return (
        <Link
            href={`/noticias/${news.id}`}
            className={`
                group bg-card border border-border rounded-xl overflow-hidden relative block 
                focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none transition-all duration-300
                h-full ${className}
            `}
        >
            {/* Background Image */}
            <img 
                src={news.image} 
                alt={news.title}
                className="object-cover w-full h-full absolute inset-0 group-hover:scale-105 transition-transform duration-300"
            />
            
            {/* Gradient Overlay for legibility */}
            <div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/20 to-transparent z-0" />

            {/* Content */}
            <div className="flex flex-col justify-end p-4 relative z-10 h-full">
                <span className="inline-block px-2 py-1 rounded bg-secondary text-secondary-foreground text-[10px] font-bold uppercase tracking-wider mb-2 w-fit">
                    {news.category}
                </span>
                <h3 className={`font-bold text-card-foreground leading-tight ${news.id === 1 ? 'text-lg md:text-2xl' : 'text-sm md:text-lg'}`}>
                    {news.title}
                </h3>
            </div>
        </Link>
    );
}

export default function NewsBentoGrid() {
    const heroCard = NEWS_DATA.find(n => n.id === 1);
    const secondaryCards = NEWS_DATA.filter(n => n.id !== 1);

    return (
        <section className="col-span-full space-y-6 font-sans">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-2xl font-bold text-foreground">
                    Noticias Destacadas
                </h2>
                <Link 
                    href="/noticias"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary hover:bg-accent text-secondary-foreground transition-colors font-medium text-sm w-fit order-last sm:order-none"
                >
                    Ver todas las noticias
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>

            {/* Layout Grid Wrapper */}
            <div className="grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 gap-4 md:gap-6 auto-rows-fr">
                {/* 1. Card Hero */}
                <NewsCard 
                    news={heroCard} 
                    className="col-span-4 md:col-span-8 xl:col-span-8 xl:row-span-2 min-h-[300px] md:min-h-[400px]" 
                />

                {/* 2. Card Secundaria 1 */}
                <NewsCard 
                    news={secondaryCards[0]} 
                    className="col-span-2 md:col-span-4 xl:col-span-4 xl:row-span-1 min-h-[180px] md:min-h-0" 
                />

                {/* 3. Card Secundaria 2 */}
                <NewsCard 
                    news={secondaryCards[1]} 
                    className="col-span-2 md:col-span-4 xl:col-span-4 xl:row-span-1 min-h-[180px] md:min-h-0" 
                />
            </div>
        </section>
    );
}
