'use client';

import { useRef } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { EVENTS_DATA } from '@/lib/mock-data';
import EventCard from '@/components/EventCard';

// ── Helpers ──────────────────────────────────────────────

function getEndMs(dateStr) {
  if (!dateStr) return 0;
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d).getTime();
}

function sortedEvents() {
  return [...EVENTS_DATA].sort((a, b) => {
    // Próximamente siempre al final
    const aUpcoming = a.status === 'upcoming' || a.statusLabel === 'Próximos';
    const bUpcoming = b.status === 'upcoming' || b.statusLabel === 'Próximos';
    if (aUpcoming && !bUpcoming) return 1;
    if (bUpcoming && !aUpcoming) return -1;
    if (aUpcoming && bUpcoming) return 0;
    // Ascendente por tiempo restante
    return getEndMs(a.endDate) - getEndMs(b.endDate);
  });
}

// ── EventsTimeline ────────────────────────────────────────

export default function EventsTimeline() {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: 296 * dir, behavior: 'smooth' });
  };

  const events = sortedEvents();
  const hasMany = events.length > 3;

  return (
    <section className="col-span-full flex flex-col gap-6 font-sans">

      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <CalendarDays className="w-6 h-6 text-text-brand-default shrink-0" aria-hidden="true" />
          <h2 className="text-heading text-text-default-default">Eventos Activos</h2>
        </div>
        <Link
          href="/eventos"
          className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-background-secondary hover:bg-background-secondary-hover text-text-default-default hover:text-text-brand-default transition-colors text-body-small-strong"
        >
          Ver todos los eventos
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>

      {/* Contenedor responsive */}
      <div className="relative">

        {/* Flechas tablet */}
        {hasMany && (
          <>
            <button
              onClick={() => scroll(-1)}
              aria-label="Anterior"
              className="hidden md:flex lg:hidden absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10
                         w-9 h-9 items-center justify-center rounded-full
                         bg-background-default border border-border-default-default
                         text-text-default-secondary hover:text-text-default-default
                         shadow-300 transition-all duration-200"
            >
              <ChevronLeft className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              onClick={() => scroll(1)}
              aria-label="Siguiente"
              className="hidden md:flex lg:hidden absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10
                         w-9 h-9 items-center justify-center rounded-full
                         bg-background-default border border-border-default-default
                         text-text-default-secondary hover:text-text-default-default
                         shadow-300 transition-all duration-200"
            >
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </>
        )}

        {/* Carrusel alineado a la izquierda con sangrado completo (Full-Bleed) */}
        <div
          ref={scrollRef}
          className="
            flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4
            -mx-4 px-4 scroll-pl-4 md:-mx-6 md:px-6 md:scroll-pl-6
            lg:mx-0 lg:px-0 lg:scroll-pl-0 lg:grid lg:grid-cols-3 lg:pb-0 lg:overflow-x-visible
            xl:grid-cols-4
          "
        >
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
          {/* Espaciador invisible para el margen final */}
          <div className="w-1 shrink-0 lg:hidden" aria-hidden="true" />
        </div>
      </div>

      {/* Botón mobile */}
      <Link
        href="/eventos"
        className="sm:hidden flex items-center justify-center gap-2 rounded-lg
                   bg-background-secondary hover:bg-background-secondary-hover
                   text-text-default-default hover:text-text-brand-default
                   transition-colors text-body-small-strong w-full h-12"
      >
        Ver todos los eventos
        <ArrowRight className="w-4 h-4" aria-hidden="true" />
      </Link>

    </section>
  );
}
