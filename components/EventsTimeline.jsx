'use client';

import { Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { EVENTS_DATA } from '@/lib/mock-data';
import EventCard from '@/components/EventCard';
import SectionHeader from './SectionHeader';
import { useFavorites } from '@/hooks/useFavorites';
import SectionCarousel from './ui/SectionCarousel';

// ── Helpers ──────────────────────────────────────────────

function getEndMs(dateStr) {
  if (!dateStr) return 0;
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d).getTime();
}

function sortedEvents(favorites = []) {
  return [...EVENTS_DATA].sort((a, b) => {
    // 1. Prioridad: ¿Es favorito? (Aparecen primero)
    const aFav = favorites.includes(a.gameId);
    const bFav = favorites.includes(b.gameId);
    if (aFav && !bFav) return -1;
    if (!aFav && bFav) return 1;

    // 2. Prioridad: 'Próximamente' van al final
    const aUpcoming = a.status === 'upcoming' || a.statusLabel === 'Próximos';
    const bUpcoming = b.status === 'upcoming' || b.statusLabel === 'Próximos';
    if (aUpcoming && !bUpcoming) return 1;
    if (bUpcoming && !aUpcoming) return -1;

    // 3. Prioridad: Ascendente por tiempo restante (los que vencen antes van primero)
    return getEndMs(a.endDate) - getEndMs(b.endDate);
  });
}

// ── EventsTimeline ────────────────────────────────────────

export default function EventsTimeline() {
  const { favorites } = useFavorites();
  const events = sortedEvents(favorites);

  return (
    <section className="col-span-full flex flex-col gap-6 font-sans">

      {/* Encabezado Unificado */}
      <SectionHeader 
        icon={Calendar}
        title="Eventos"
        subtitle="Activos"
        href="/eventos"
        ctaLabel="Ver cronograma"
      />

      {/* Carrusel Unificado (Full-Bleed + Peek) — La lógica de scroll y flechas se delega a SectionCarousel */}
      <SectionCarousel>
        {events.map((event) => (
          <EventCard 
            key={event.id} 
            event={event} 
            className="w-[75vw] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-12px)] xl:w-[calc(25%-12px)]" 
          />
        ))}
        {/* Espaciador invisible para el margen final */}
        <div className="w-1 shrink-0 lg:hidden" aria-hidden="true" />
      </SectionCarousel>

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
