import Image from 'next/image';
import { CalendarDays } from 'lucide-react';
import Link from 'next/link';
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
    return { label: 'Evento', color: 'bg-status-success text-white border-status-success/20', expired: false };
  }

  const [ey, em, ed] = endDate.split('-').map(Number);
  const end = new Date(ey, em - 1, ed);
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const diffMs = end - now;
  const diffHours = Math.ceil(diffMs / (1000 * 60 * 60));
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  // Expirado
  if (diffMs < 0) {
    return { label: 'Finalizado', color: 'bg-white/10 text-white/50 border-white/10', expired: true };
  }

  // Permanente
  if (diffDays > 365 || event.category === 'Permanente') {
    return { label: 'Permanente', color: 'bg-status-info text-white border-status-info/20', expired: false };
  }

  // Últimas horas (≤ 24h)
  if (diffHours <= 24) {
    return { label: `${diffHours} ${diffHours === 1 ? 'Hora' : 'Hrs'}`, color: 'bg-status-danger text-white border-status-danger/20', expired: false };
  }

  // Últimos días (> 24h y ≤ 7 días)
  if (diffDays <= 7) {
    return { label: `${diffDays} ${diffDays === 1 ? 'Día' : 'Días'}`, color: 'bg-status-warning text-white border-status-warning/20', expired: false };
  }

  // Activo con tiempo
  return { label: `${diffDays} Días`, color: 'bg-status-success text-white border-status-success/20', expired: false };
}

// ── EventCard ─────────────────────────────────────────────

export default function EventCard({ event, viewMode = 'grid' }) {
  const { gameId, title, type, startDate, endDate, category } = event;
  const game = GAMES_DATA[gameId];
  const bannerUrl = game?.bannerUrl;
  const iconUrl = game?.iconUrl;
  const shortName = game?.shortName || event.gameName;

  const { label, color, expired } = getTimeInfo(event);

  if (expired) return null;

  if (viewMode === 'list') {
    return (
        <Link
            href={`/juegos/${gameId}`}
            className="group flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-background-secondary border border-border-default-secondary rounded-2xl hover:border-border-default-default transition-all hover:shadow-md"
        >
            <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-border-default-secondary">
                    {iconUrl && (
                        <Image src={iconUrl} alt={shortName} fill sizes="48px" className="object-cover" />
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-caption text-text-default-tertiary truncate">{shortName}</p>
                    <h3 className="text-body-strong text-text-default-default truncate">{title}</h3>
                </div>
            </div>
            
            <div className="flex items-center gap-3 sm:shrink-0 justify-between sm:justify-end">
                <div className="flex items-center gap-2">
                    {type && <span className="hidden md:inline px-2 py-0.5 bg-brand-default/10 text-brand-default rounded-md text-[10px] font-bold uppercase tracking-wider">{type}</span>}
                    <span className={`${color} px-3 py-1 rounded-full text-[10px] font-bold shadow-sm`}>{label}</span>
                </div>
                <CalendarDays className="w-4 h-4 text-text-default-tertiary group-hover:text-text-default-default transition-colors" />
            </div>
        </Link>
    );
  }

  return (
    <Link
      href={`/juegos/${gameId}`}
      className="
        group relative rounded-[24px] overflow-hidden block
        border-2 border-transparent hover:border-border-default-default hover:shadow-2xl hover:-translate-y-1
        transition-all duration-500 cursor-pointer
        aspect-[16/9] sm:aspect-[4/3] lg:aspect-auto h-56 w-full bg-background-secondary
      "
    >
      <div className="absolute inset-0 bg-background-tertiary">
        {bannerUrl && (
            <Image src={bannerUrl} alt={title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
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
            <span className={`${color} px-2.5 py-0.5 rounded-full shadow-lg backdrop-blur-sm border border-white/10 text-[10px] font-bold uppercase tracking-wider whitespace-nowrap`}>
              {label}
            </span>
        </div>

        <h3 className="text-white text-body-strong font-bold line-clamp-2 leading-tight group-hover:text-amber-200 transition-colors">
          {title}
        </h3>

        <div className="flex items-center gap-1.5 text-white/60 text-[10px] font-medium tracking-wide">
          <CalendarDays className="w-3.5 h-3.5 shrink-0" />
          <span>{formatDateShort(startDate)} — {formatDateShort(endDate)}</span>
        </div>
      </div>
    </Link>
  );
}
