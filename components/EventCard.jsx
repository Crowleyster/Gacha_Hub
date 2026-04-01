"use client";

import Image from 'next/image';
import { CalendarDays } from 'lucide-react';
import { GAMES_DATA } from '@/lib/games-data';
import { useActiveEvent } from '@/context/ActiveEventContext';
import { formatDateShort, getTimeInfo } from '@/lib/utils/date-utils';

// ── EventCard ─────────────────────────────────────────────

export default function EventCard({ event, viewMode = 'grid', onClick, className }) {
  const { openEvent } = useActiveEvent();
  const { gameId, title, type, startDate, endDate, category } = event;
  const game = GAMES_DATA[gameId];
  const bannerUrl = game?.bannerUrl;
  const iconUrl = game?.iconUrl;
  const shortName = game?.shortName || event.gameName;

  const { label, color, expired } = getTimeInfo(event);

  if (expired) return null;

  // Manejador de clic: usa prop onClick o el global openEvent
  const handleInteraction = () => {
    if (onClick) {
      onClick(event);
    } else {
      openEvent(event);
    }
  };

  // Clases compartidas para el contenedor
  const commonClasses = "group relative overflow-hidden transition-all duration-500 cursor-pointer text-left shrink-0";
  const gridClasses = `rounded-3xl border-2 border-transparent hover:border-border-default-default hover:shadow-600 hover:-translate-y-1 aspect-[16/9] sm:aspect-[4/3] lg:aspect-auto h-56 lg:h-64 bg-background-secondary snap-center ${className || 'w-full'}`;
  const listClasses = "flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-background-secondary border border-border-default-secondary rounded-2xl hover:border-border-default-default hover:shadow-md w-full";

  const Content = () => {
    if (viewMode === 'list') {
      return (
        <>
            <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-border-default-secondary">
                    {iconUrl && (
                        <Image src={iconUrl} alt={shortName} fill sizes="48px" className="object-cover" />
                    )}
                </div>
                <div className="flex-1 min-w-0 text-left">
                    <p className="text-caption text-text-default-tertiary truncate">{shortName}</p>
                    <h3 className="text-body-strong text-text-default-default truncate drop-shadow-sm">{title}</h3>
                </div>
            </div>
            
            <div className="flex items-center gap-3 sm:shrink-0 justify-between sm:justify-end">
                <div className="flex items-center gap-2">
                    {type && <span className="hidden md:inline px-2 py-0.5 bg-brand-default/10 text-brand-default rounded-md text-badge font-bold uppercase tracking-wider">{type}</span>}
                    <span className={`${color} px-3 py-1 rounded-full text-badge font-bold shadow-100`}>{label}</span>
                </div>
                <CalendarDays className="w-4 h-4 text-text-default-tertiary group-hover:text-text-default-default transition-colors" />
            </div>
        </>
      );
    }

    return (
      <>
        <div className="absolute inset-0 bg-background-tertiary">
          {bannerUrl && (
              <Image src={bannerUrl} alt={title} fill sizes="(max-width: 768px) 75vw, (max-width: 1024px) 320px, 33vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
          )}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

        <div className="relative z-10 h-full w-full flex flex-col justify-end p-4 sm:p-6 gap-2 transition-transform duration-300 group-hover:-translate-y-2">
          <div className="flex items-center gap-3 mb-1">
              {iconUrl && (
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/20 shadow-lg shrink-0">
                      <Image src={iconUrl} alt={shortName} fill sizes="32px" className="object-cover" />
                  </div>
              )}
              <span className={`${color} px-2.5 py-0.5 rounded-full shadow-400 backdrop-blur-sm border border-white/10 text-badge font-bold uppercase tracking-wider whitespace-nowrap`}>
                {label}
              </span>
          </div>

          <h3 className="text-white text-body-strong font-bold line-clamp-2 leading-tight group-hover:text-amber-200 transition-colors text-left drop-shadow-md">
            {title}
          </h3>

          <div className="flex items-center gap-1.5 text-white/60 text-caption font-medium tracking-wide drop-shadow-sm">
            <CalendarDays className="w-3.5 h-3.5 shrink-0" />
            <span>{formatDateShort(startDate)} — {formatDateShort(endDate)}</span>
          </div>
        </div>
      </>
    );
  };

  return (
    <button 
        onClick={handleInteraction}
        className={`${commonClasses} ${viewMode === 'grid' ? gridClasses : listClasses}`}
    >
        <Content />
    </button>
  );
}
