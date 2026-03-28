'use client';

import { CalendarDays } from 'lucide-react';
import { GAMES_DATA } from '@/lib/games-data';

// ── Helpers ──────────────────────────────────────────────

function formatDateShort(dateStr) {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
  });
}

export function getTimeInfo(event) {
  const { endDate, statusLabel } = event;

  // Próximamente — evento aún no iniciado
  if (statusLabel === 'Próximos' || event.status === 'upcoming') {
    return { label: 'Próximamente', color: 'bg-black/50 backdrop-blur-sm text-white border-white/10', expired: false };
  }

  if (!endDate) {
    return { label: 'Evento', color: 'bg-emerald-500 text-white border-emerald-400/20', expired: false };
  }

  const [ey, em, ed] = endDate.split('-').map(Number);
  const end = new Date(ey, em - 1, ed);
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const diffMs    = end - now;
  const diffHours = Math.ceil(diffMs / (1000 * 60 * 60));
  const diffDays  = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  // Expirado
  if (diffMs < 0) {
    return { label: 'Finalizado', color: 'bg-white/10 text-white/50 border-white/10', expired: true };
  }

  // Permanente
  if (diffDays > 365 || event.category === 'Permanente') {
    return { label: 'Permanente', color: 'bg-indigo-500 text-white border-indigo-400/20', expired: false };
  }

  // Últimas horas (≤ 24h)
  if (diffHours <= 24) {
    return { label: `${diffHours} ${diffHours === 1 ? 'Hora' : 'Hrs'}`, color: 'bg-red-500 text-white border-red-400/20', expired: false };
  }

  // Últimos días (> 24h y ≤ 7 días)
  if (diffDays <= 7) {
    return { label: `${diffDays} ${diffDays === 1 ? 'Día' : 'Días'}`, color: 'bg-amber-500 text-white border-amber-400/20', expired: false };
  }

  // Activo con tiempo
  return { label: `${diffDays} Días`, color: 'bg-emerald-500 text-white border-emerald-400/20', expired: false };
}

// ── EventCard ─────────────────────────────────────────────

export default function EventCard({ event }) {
  const { gameId, title, type, startDate, endDate, category } = event;
  const game      = GAMES_DATA[gameId];
  const bannerUrl = game?.bannerUrl;
  const iconUrl   = game?.iconUrl;
  const shortName = game?.shortName || event.gameName;

  const { label, color, expired } = getTimeInfo(event);

  // No renderizar eventos expirados en el inicio
  // (en la página /eventos se pueden mostrar con distinción)
  if (expired) return null;

  return (
    <article className="
      group flex-shrink-0 relative rounded-2xl overflow-hidden
      border border-white/10 hover:border-white/30
      transition-all duration-300 cursor-pointer
      h-56 w-full min-w-[280px] sm:min-w-0 bg-background-secondary
    ">
      {/* Banner */}
      {bannerUrl
        ? <img src={bannerUrl} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        : <div className="absolute inset-0 bg-background-tertiary" />
      }

      {/* Scrims */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent transition-opacity duration-500 group-hover:opacity-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Contenido */}
      <div className="relative h-full w-full flex flex-col justify-end p-4 sm:p-5 gap-2 transition-transform duration-300 group-hover:-translate-y-2">

        {/* Fila de metadatos */}
        <div className="flex flex-col gap-1.5 h-11 justify-end">
          <div className="flex items-center gap-2">
            {iconUrl && (
              <div className="w-7 h-7 rounded-full overflow-hidden border border-white/20 shrink-0 shadow-lg">
                <img src={iconUrl} alt={shortName} className="w-full h-full object-cover" />
              </div>
            )}
            <span className={`${color} h-5 flex items-center px-2.5 rounded-full shadow-lg backdrop-blur-sm border text-[9px] font-bold uppercase tracking-wider whitespace-nowrap`}>
              {label}
            </span>
          </div>

          {(type || category) && (
            <div className="flex items-center gap-1.5">
              {type && (
                <span className="h-4.5 flex items-center px-1.5 bg-text-brand-default/20 backdrop-blur-sm text-text-brand-default rounded-full border border-text-brand-default/30 text-[8px] font-bold uppercase tracking-widest whitespace-nowrap">
                  {type}
                </span>
              )}
              {category && (
                <span className="h-4.5 flex items-center px-1.5 bg-white/10 backdrop-blur-sm text-white/80 rounded-full border border-white/20 text-[8px] font-bold uppercase tracking-widest whitespace-nowrap">
                  {category}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Título */}
        <h3 className="h-10 text-white text-body-strong font-bold line-clamp-2 leading-tight group-hover:text-amber-200 transition-colors">
          {title}
        </h3>

        {/* Fechas */}
        <div className="flex items-center gap-1.5 text-white/50 mt-1">
          <CalendarDays className="w-3 h-3 shrink-0" aria-hidden="true" />
          <span className="text-[10px] font-medium tracking-wide">
            {formatDateShort(startDate)} — {formatDateShort(endDate)}
          </span>
        </div>
      </div>
    </article>
  );
}
