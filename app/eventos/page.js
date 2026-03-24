"use client";

import { useState } from 'react';
import Image from 'next/image';
import { CalendarDays, ChevronDown, Clock } from 'lucide-react';
import { EVENTS_DATA } from '@/lib/mock-data';
import { GAMES_DATA } from '@/lib/games-data';

/* ─── Placeholder: Event Card Simple ─── */
function EventCard({ event }) {
    const game = GAMES_DATA[event.gameId];
    return (
        <div className="flex flex-col p-4 bg-background-secondary border border-border-default-secondary rounded-2xl gap-3 shrink-0 w-72 sm:w-auto snap-start">
            <div className="flex items-center gap-2">
                {game?.iconUrl && <Image src={game.iconUrl} alt="" width={24} height={24} className="rounded-full" />}
                <span className="text-body-small-strong text-text-default-secondary">{game?.shortName}</span>
                <span className="ml-auto px-2 py-0.5 bg-background-tertiary rounded-md text-body-small">{event.type}</span>
            </div>
            <h3 className="text-body-strong text-text-default-default line-clamp-2">{event.title}</h3>
            <div className="flex items-center gap-2 text-body-small text-text-brand-default mt-auto">
                <Clock className="w-4 h-4" />
                <span>Termina: {event.endDate}</span>
            </div>
        </div>
    );
}

/* ─── Acordeón de Categoría ─── */
function EventSection({ title, events, isOpenDefault = true }) {
    const [isOpen, setIsOpen] = useState(isOpenDefault);
    if (!events || events.length === 0) return null;

    return (
        <div className="flex flex-col gap-4">
            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center justify-between w-full p-4 bg-background-secondary rounded-2xl hover:bg-background-secondary-hover transition-colors">
                <h2 className="text-heading text-text-default-default flex items-center gap-2">
                    {title} <span className="text-body-small bg-background-tertiary px-2 py-1 rounded-full">{events.length}</span>
                </h2>
                <ChevronDown className={`w-5 h-5 text-text-default-secondary transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isOpen && (
                <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {events.map(ev => <EventCard key={ev.id} event={ev} />)}
                </div>
            )}
        </div>
    );
}

export default function Eventos() {
    // Lógica básica de separación (Iteraremos esto para hacerlo más preciso con fechas reales)
    const upcoming = EVENTS_DATA.filter(e => e.status === 'upcoming');
    const active = EVENTS_DATA.filter(e => e.status !== 'upcoming');

    return (
        <main className="col-span-full space-y-8 pb-content-safe font-sans">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-background-secondary rounded-xl">
                        <CalendarDays className="w-6 h-6 text-text-brand-default" />
                    </div>
                    <h1 className="text-title-page text-text-default-default">Centro de Eventos</h1>
                </div>
                <p className="text-body-base text-text-default-secondary max-w-2xl">
                    No te pierdas ninguna recompensa. Sigue el cronograma de todos los eventos activos.
                </p>
            </div>

            <div className="flex flex-col gap-6">
                <EventSection title="Eventos en Curso" events={active} isOpenDefault={true} />
                <EventSection title="Próximamente" events={upcoming} isOpenDefault={false} />
            </div>
        </main>
    );
}
