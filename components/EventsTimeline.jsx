"use client";

import { Calendar, ChevronRight, Clock } from 'lucide-react';
import Link from 'next/link';
import { EVENTS_DATA } from '@/lib/mock-data';

function EventCard({ event }) {
    return (
        <Link
            href={`/eventos/${event.id}`}
            className="flex-shrink-0 w-[80vw] sm:w-auto snap-center md:snap-align-none group bg-background-secondary border border-border-default-secondary rounded-xl overflow-hidden relative block focus-visible:ring-2 focus-visible:ring-brand-default/20 focus-visible:outline-none transition-all duration-300 md:col-span-3 h-64"
        >
            {/* Background Image */}
            <img 
                src={event.image} 
                alt={event.title}
                className="object-cover w-full h-full absolute inset-0 group-hover:scale-105 transition-transform duration-300"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background-default/90 via-background-default/20 to-transparent z-0" />

            {/* Content */}
            <div className="flex flex-col justify-end p-4 relative z-10 h-full">
                <div className="flex items-center gap-1.5 mb-2">
                    <span className="px-2 py-0.5 rounded bg-brand-default text-text-brand-on text-[8px] font-bold uppercase tracking-wider">
                        {event.game}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-background-tertiary text-text-default-default text-[8px] font-bold uppercase tracking-wider">
                        {event.type}
                    </span>
                </div>
                
                <h3 className="text-body-strong md:text-subheading-strong text-text-default-default transition-colors leading-tight mb-2">
                    {event.title}
                </h3>

                <div className="flex items-center gap-1.5 text-text-default-secondary">
                    <Clock className="w-3 h-3" />
                    <span className="text-body-small font-medium">{event.date}</span>
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
                <h2 className="text-heading text-text-default-default flex items-center gap-2">
                    <Calendar className="w-6 h-6 text-brand-default" />
                    Próximos Eventos
                </h2>
                <Link 
                    href="/eventos"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background-secondary hover:bg-background-secondary-hover text-text-default-default transition-colors text-body-small-strong w-fit order-last sm:order-none"
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
