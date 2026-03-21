use client';

import { useRef } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { EVENTS_DATA } from '@/lib/mock-data';

// ── Helpers ──────────────────────────────────────────────

function formatDate(dateStr) {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function getDaysLeft(endDateStr) {
  const [year, month, day] = endDateStr.split('-').map(Number);
  const end = new Date(year, month - 1, day);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const diff = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
  return diff;
}

function StatusBadge({ status, endDate }) {
  const daysLeft = getDaysLeft(endDate);

  if (status === 'upcoming') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-body-small bg-background-tertiary text-text-default-secondary border border-border-default-secondary">
        Próximamente
      </span>
    );
  }

  if (daysLeft <= 3) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-body-small bg-red-500/10 text-red-500 border border-red-500/20">
        <Clock className="w-3 h-3" aria-hidden="true" />
        {daysLeft === 0 ? 'Termina hoy' : `${daysLeft}d restante${daysLeft > 1 ? 's' : ''}`}
      </span>
    );
  }

  if (daysLeft <= 7) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-body-small bg-amber-500/10 text-amber-500 border border-amber-500/20">
        <Clock className="w-3 h-3" aria-hidden="true" />
        {`${daysLeft}d restantes`}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-body-small bg-brand-default/10 text-text-brand-default border border-brand-default/20">
      En curso
    </span>
  );
}

// ── EventCard ─────────────────────────────────────────────

function EventCard({ event }) {
  const { gameIconUrl, gameName, title, type, startDate, endDate, status } = event;

  return (
    <article className="
      flex-shrink-0 snap-start
      w-[280px] sm:w-auto
      bg-background-secondary border border-border-default-secondary rounded-xl
      p-4 flex flex-col gap-3
      hover:bg-background-secondary-hover hover:border-border-default-default
      transition-all duration-200
    ">
      {/* Header: ícono + juego + tipo */}
      <div className="flex items-center gap-3">
        {gameIconUrl && (
          <div className="w-9 h-9 rounded-lg overflow-hidden border border-border-default-secondary shrink-0 bg-background-tertiary">
            <img
              src={gameIconUrl}
              alt={gameName}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="flex flex-col min-w-0">
          <span className="text-body-small-strong text-text-default-default truncate">{gameName}</span>
          <span className="text-body-small text-text-default-tertiary truncate">{type}</span>
        </div>
      </div>

      {/* Título del evento */}
      <h3 className="text-body-strong text-text-default-default line-clamp-2 leading-snug">
        {title}
      </h3>

      {/* Footer: fechas + badge */}
      <div className="flex items-center justify-between gap-2 mt-auto pt-3 border-t border-border-default-secondary">
        <div className="flex items-center gap-1.5 text-text-default-tertiary min-w-0">
          <CalendarDays className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span className="text-body-small truncate">
            {formatDate(startDate)} — {formatDate(endDate)}
          </span>
        </div>
        <StatusBadge status={status} endDate={endDate} />
      </div>
    </article>
  );
}

// ── EventsTimeline ────────────────────────────────────────

export default function EventsTimeline() {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: 296 * dir, behavior: 'smooth' });
  };

  const hasMany = EVENTS_DATA.length > 3;

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

      {/* Contenedor: carrusel en mobile, grid en M+ */}
      <div className="relative">

        {/* Flechas de navegación — solo visibles en md (tablet) */}
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

        {/*
          Mobile (< sm): carrusel horizontal con snap
          sm–md: carrusel horizontal (scroll natural con grid implícito)
          lg+: grid 2 columnas
          xl+: grid 3 columnas
        */}
        <div
          ref={scrollRef}
          className="
            flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-none
            -mx-4 px-4 pb-2
            lg:grid lg:grid-cols-2 lg:mx-0 lg:px-0 lg:pb-0 lg:overflow-x-visible
            xl:grid-cols-3
          "
        >
          {EVENTS_DATA.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {/* Fade gradient derecha — solo en mobile/tablet */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-background-default to-transparent lg:hidden" />
      </div>

      {/* Botón "Ver todos" mobile */}
      <Link
        href="/eventos"
        className="sm:hidden flex items-center justify-center gap-2 rounded-lg
                   bg-background-secondary hover:bg-background-secondary-hover
                   text-text-default-default hover:text-text-brand-default
                   transition-colors text-body-small-strong w-full h-[48px]"
      >
        Ver todos los eventos
        <ArrowRight className="w-4 h-4" aria-hidden="true" />
      </Link>

    </section>
  );
}