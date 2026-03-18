"use client";

import { Calendar, ChevronRight, Clock } from 'lucide-react';
import Link from 'next/link';

const EVENTS_DATA = [
    {
        id: 1,
        title: "Segunda fase: Thaw of Eons",
        game: "Wuthering Waves",
        date: "20 Jun - 10 Jul",
        type: "Versión",
        image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=400"
    },
    {
        id: 2,
        title: "Windtrace: Seekers",
        game: "Genshin Impact",
        date: "15 Jun - 30 Jun",
        type: "Mini-juego",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400"
    },
    {
        id: 3,
        title: "Stellar Shadow Hunt",
        game: "Honkai Star Rail",
        date: "22 Jun - 05 Jul",
        type: "Combate",
        image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=400"
    },
    {
        id: 4,
        title: "Retorno del Abismo",
        game: "Zenless Zone Zero",
        date: "Hoy - 12 Jul",
        type: "Especial",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=400"
    }
];

function EventCard({ event }) {
    return (
        <Link
            href={`/eventos/${event.id}`}
            className="flex-shrink-0 w-[80vw] sm:w-auto snap-center md:snap-align-none group bg-card border border-border rounded-xl overflow-hidden relative block focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none transition-all duration-300 md:col-span-3 h-64"
        >
            {/* Background Image */}
            <img 
                src={event.image} 
                alt={event.title}
                className="object-cover w-full h-full absolute inset-0 group-hover:scale-105 transition-transform duration-300"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/20 to-transparent z-0" />

            {/* Content */}
            <div className="flex flex-col justify-end p-4 relative z-10 h-full">
                <div className="flex items-center gap-1.5 mb-2">
                    <span className="px-2 py-0.5 rounded bg-primary text-primary-foreground text-[8px] font-bold uppercase tracking-wider">
                        {event.game}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-secondary text-secondary-foreground text-[8px] font-bold uppercase tracking-wider">
                        {event.type}
                    </span>
                </div>
                
                <h3 className="font-bold text-card-foreground text-sm md:text-md leading-tight mb-2">
                    {event.title}
                </h3>

                <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span className="text-[10px] font-medium">{event.date}</span>
                </div>
            </div>
        </Link>
    );
}

export default function EventsTimeline() {
    return (
        <section className="col-span-full space-y-6 font-sans">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                    <Calendar className="w-6 h-6 text-primary" />
                    Próximos Eventos
                </h2>
                <Link 
                    href="/eventos"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary hover:bg-accent text-secondary-foreground transition-colors font-medium text-xs w-fit order-last sm:order-none"
                >
                    Ver todos los eventos
                    <ChevronRight className="w-4 h-4" />
                </Link>
            </div>

            {/* Layout: Carousel for Mobile, Grid for Desktop */}
            <div 
                className="
                    flex md:grid md:grid-cols-12 gap-4 md:gap-6
                    overflow-x-auto snap-x snap-mandatory scrollbar-none 
                    -mx-4 px-4 md:mx-0 md:px-0 pb-4 md:pb-0
                "
            >
                {EVENTS_DATA.map(event => (
                    <EventCard key={event.id} event={event} />
                ))}
            </div>
        </section>
    );
}
