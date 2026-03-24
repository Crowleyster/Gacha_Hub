'use client';

import { useRef } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { EVENTS_DATA } from '@/lib/mock-data';
import { GAMES_DATA } from '@/lib/games-data';

// ── Helpers ──────────────────────────────────────────────

function formatDateShort(dateStr) {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
  });
}

function getEndMs(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d).getTime();
}

function getTimeInfo(event) {
  const { status, endDate } = event;

  if (status === 'upcoming') {
    return { label: 'Próximamente', color: 'bg-black/50 backdrop-blur-sm text-white' };
  }

  const end = new Date(...endDate.split('-').map((n, i) => i === 1 ? Number(n) - 1 : Number(n)));
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const diffMs = end - now;
  const diffHours = Math.ceil(diffMs / (1000 * 60 * 60));
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  // Nivel 1: 24h o menos → Últimas horas
  if (diffHours <= 24) {
    return {
      label: `${diffHours} ${diffHours === 1 ? 'Hora' : 'Hrs'}`,
      color: 'bg-red-500 text-white',
    };
  }
  // Nivel 2: 7 días o menos → Últimos días
  if (diffDays <= 7) {
    return {
      label: `${diffDays} ${diffDays === 1 ? 'Día' : 'Días'}`,
      color: 'bg-amber-500 text-white',
    };
  }
  // Nivel 3: 8+ días → Nuevo evento
  return {
    label: `${diffDays} Días`,
    color: 'bg-emerald-500 text-white',
  };
}

function sortedEvents() {
  return [...EVENTS_DATA].sort((a, b) => {
    // Próximamente siempre al final
    if (a.status === 'upcoming' && b.status !== 'upcoming') return 1;
    if (b.status === 'upcoming' && a.status !== 'upcoming') return -1;
    if (a.status === 'upcoming' && b.status === 'upcoming') return 0;
    // Ascendente por tiempo restante
    return getEndMs(a.endDate) - getEndMs(b.endDate);
  });
}

// ── EventCard ─────────────────────────────────────────────

function EventCard({ event }) {
  const { gameId, gameIconUrl, gameName, title, type, startDate, endDate } = event;
  const bannerUrl = GAMES_DATA[gameId]?.bannerUrl;
  const { label, color } = getTimeInfo(event);

  return (
    <article className="
      group
      flex-shrink-0 snap-start
      w-72 sm:w-auto
      relative rounded-2xl overflow-hidden
      border border-white/10 hover:border-white/30
      transition-all duration-300
      cursor-pointer
      h-56
    ">
      {/* Banner background */}
      {bannerUrl && (
        <img
          src={bannerUrl}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      )}

      {/* Scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30" />

      {/* Contenido */}
      <div className="relative h-full w-full flex flex-col p-4 gap-2">

        {/* Fila superior: ícono + badge */}
        <div className="flex items-start justify-between">
          {gameIconUrl && (
            <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white/20 shrink-0 shadow-400">
              <img
                src={gameIconUrl}
                alt={gameName}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <span className={`${color} text-body-small-strong px-3 py-1 rounded-full shadow-400 ml-auto`}>
            {label}
          </span>

        </div>

        {/* Título */}
        <h3 className="text-white text-heading font-bold line-clamp-2 leading-snug mt-1">
          {title}
        </h3>

        {/* Tipo / descripción */}
        <p className="text-white/60 text-body-small line-clamp-2 leading-snug flex-1">
          {type}
        </p>

        {/* Fechas */}
        <div className="flex items-center gap-1.5 text-white/50 mt-auto">
          <CalendarDays className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span className="text-body-small">
            {formatDateShort(startDate)} — {formatDateShort(endDate)}
          </span>
        </div>
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
            lg:mx-0 lg:px-0 lg:scroll-pl-0 lg:grid lg:grid-cols-2 lg:pb-0 lg:overflow-x-visible
            xl:grid-cols-3
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
