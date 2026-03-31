"use client";

import { useState, useMemo } from 'react';
import {
    CalendarDays,
    RotateCcw,
    Filter,
    LayoutGrid,
    List,
    Clock,
    ArrowDownAZ,
    ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import { EVENTS_DATA } from '@/lib/mock-data';
import { GAMES_DATA } from '@/lib/games-data';
import EventCard, { getTimeInfo } from '@/components/EventCard';
import EmptyState from '@/components/ui/EmptyState';
import FilterDropdown from '@/components/ui/FilterDropdown';
import MobileFilterModal from '@/components/ui/MobileFilterModal';
import SectionHeader from '@/components/SectionHeader';

/* ─── Opciones de Filtro ─── */
const STATUS_OPTIONS     = ["Ultimas horas", "Últimos días", "Nuevos", "Próximos"];
const CATEGORY_OPTIONS   = ["Permanente", "Recurrente", "Limitado"];

const SORT_OPTIONS = [
    { id: 'pronto',   label: 'Terminan pronto', icon: Clock },
    { id: 'reciente', label: 'Recientes',        icon: CalendarDays },
    { id: 'az',       label: 'A–Z',              icon: ArrowDownAZ },
];

/* ─── EventRow: Fila Horizontal para Vista Lista ─── */
function EventRow({ event }) {
    const game = GAMES_DATA[event.gameId];
    const { label, color, expired } = getTimeInfo(event);
    if (expired) return null;

    return (
        <Link
            href={`/juegos/${event.gameId}`}
            className="
                group flex items-center gap-4 p-4
                bg-background-secondary border border-border-default-secondary
                rounded-2xl hover:border-border-default-default hover:shadow-md
                hover:-translate-y-0.5 transition-all duration-300
            "
        >
            {/* Ícono del juego */}
            <div className="relative w-12 h-12 shrink-0 rounded-xl overflow-hidden border border-white/10 shadow-sm">
                {game?.iconUrl
                    ? <img src={game.iconUrl} alt={game?.name} className="w-full h-full object-cover" />
                    : <div className="w-full h-full bg-background-tertiary" />
                }
            </div>

            {/* Info central */}
            <div className="flex-1 min-w-0">
                <p className="text-caption text-text-default-tertiary truncate">
                    {game?.shortName || game?.name}
                </p>
                <h3 className="text-body-strong text-text-default-default leading-tight line-clamp-1 group-hover:text-brand-default transition-colors">
                    {event.title}
                </h3>
                {event.type && (
                    <span className="inline-flex items-center mt-1 h-4 px-1.5 bg-brand-default/15 text-brand-default rounded-full border border-brand-default/25 text-[10px] font-semibold uppercase tracking-wide">
                        {event.type}
                    </span>
                )}
            </div>

            {/* Badges + Chevron — visibilidad progresiva */}
            <div className="flex items-center gap-2 shrink-0">

                {/* Tipo de evento — visible desde sm */}
                {event.type && (
                    <span className="hidden sm:inline-flex items-center h-6 px-2 bg-brand-default/15 text-brand-default rounded-full border border-brand-default/25 text-[10px] font-semibold uppercase tracking-wide whitespace-nowrap">
                        {event.type}
                    </span>
                )}

                {/* Categoría — visible desde md */}
                {event.category && (
                    <span className="hidden md:inline-flex items-center h-6 px-2 bg-background-tertiary text-text-default-secondary rounded-full border border-border-default-secondary text-[10px] font-semibold uppercase tracking-wide whitespace-nowrap">
                        {event.category}
                    </span>
                )}

                {/* Badge de tiempo — SIEMPRE visible */}
                <span className={`${color} h-6 flex items-center px-3 rounded-full text-badge font-semibold whitespace-nowrap shadow-sm shrink-0`}>
                    {label}
                </span>

                <ChevronRight className="w-4 h-4 text-text-default-tertiary group-hover:text-text-default-default group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>
        </Link>
    );
}

/* ─── Página Principal de Eventos ─── */
export default function Eventos() {
    const [selectedGames, setSelectedGames]           = useState([]);
    const [selectedTypes, setSelectedTypes]           = useState([]);
    const [selectedStatuses, setSelectedStatuses]     = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const [sortMode, setSortMode] = useState('pronto');  // 'pronto' | 'reciente' | 'az'
    const [viewMode, setViewMode] = useState('grid');    // 'grid' | 'list'

    const allTypes = useMemo(() => {
        const types = new Set(EVENTS_DATA.map(e => e.type));
        return Array.from(types).sort();
    }, []);

    const gameOptions = useMemo(() => Object.values(GAMES_DATA).map(g => g.id), []);
    const getGameName = (id) => GAMES_DATA[id]?.name || id;

    /* ─── Filtrado + Ordenamiento ─── */
    const filteredAndSortedEvents = useMemo(() => {
        let result = EVENTS_DATA.filter(event => {
            const matchesGame     = selectedGames.length === 0     || selectedGames.includes(event.gameId);
            const matchesType     = selectedTypes.length === 0     || selectedTypes.includes(event.type);
            const matchesStatus   = selectedStatuses.length === 0  || selectedStatuses.includes(event.statusLabel);
            const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(event.category);
            return matchesGame && matchesType && matchesStatus && matchesCategory;
        });

        if (sortMode === 'pronto') {
            result = [...result].sort((a, b) => {
                const dateA = a.endDate ? new Date(a.endDate) : new Date('9999-12-31');
                const dateB = b.endDate ? new Date(b.endDate) : new Date('9999-12-31');
                return dateA - dateB;
            });
        } else if (sortMode === 'reciente') {
            result = [...result].sort((a, b) => {
                const dateA = a.startDate ? new Date(a.startDate) : new Date(0);
                const dateB = b.startDate ? new Date(b.startDate) : new Date(0);
                return dateB - dateA;
            });
        } else if (sortMode === 'az') {
            result = [...result].sort((a, b) => a.title.localeCompare(b.title, 'es'));
        }

        return result;
    }, [selectedGames, selectedTypes, selectedStatuses, selectedCategories, sortMode]);

    const hasActiveFilters = selectedGames.length > 0 || selectedTypes.length > 0
        || selectedStatuses.length > 0 || selectedCategories.length > 0;

    const clearFilters = () => {
        setSelectedGames([]);
        setSelectedTypes([]);
        setSelectedStatuses([]);
        setSelectedCategories([]);
    };

    const FiltersContent = () => (
        <div className="flex flex-col lg:flex-row items-stretch gap-3 w-full">
            <FilterDropdown label="Juego"          options={gameOptions}      selected={selectedGames}      onChange={setSelectedGames}      displayFormatter={getGameName} />
            <FilterDropdown label="Tipo de Evento" options={allTypes}         selected={selectedTypes}      onChange={setSelectedTypes} />
            <FilterDropdown label="Estado"          options={STATUS_OPTIONS}   selected={selectedStatuses}   onChange={setSelectedStatuses} />
            <FilterDropdown label="Categoría"       options={CATEGORY_OPTIONS} selected={selectedCategories} onChange={setSelectedCategories} />

            {hasActiveFilters && (
                <button
                    onClick={clearFilters}
                    className="flex items-center justify-center gap-2 h-[42px] px-4 shrink-0 bg-background-tertiary border border-border-default-secondary rounded-xl text-body-small-strong uppercase tracking-wider text-text-default-secondary hover:bg-background-secondary-hover hover:text-brand-default transition-all mt-auto"
                >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span className="lg:hidden">Limpiar filtros</span>
                </button>
            )}
        </div>
    );

    return (
        <div className="col-span-full space-y-8 pb-content-safe font-sans text-text-default-default">

            <SectionHeader
                variant="page"
                icon={CalendarDays}
                title="Centro de Eventos"
                subtitle="Sigue el cronograma de todos los eventos, misiones y recompensas de tus juegos favoritos."
            >
                {/* Barra de Controles */}
                <div className="space-y-3">
                    <div className="flex flex-col lg:flex-row lg:items-end gap-3 bg-background-secondary border border-border-default-secondary p-4 rounded-2xl shadow-sm">

                        {/* Mobile: Botón Filtrar (deshabilitado) */}
                        <button
                            disabled
                            title="Próximamente"
                            className="lg:hidden flex items-center justify-center gap-2 h-[42px] px-4 w-full sm:w-auto bg-background-tertiary border border-border-default-secondary rounded-xl opacity-50 cursor-not-allowed text-body-small-strong text-text-default-secondary"
                        >
                            <Filter className="w-5 h-5" /> Filtrar Eventos
                        </button>

                        {/* Desktop: Filtros */}
                        <div className="hidden lg:flex flex-col items-stretch gap-4 flex-1">
                            <FiltersContent />
                        </div>

                        {/* Separador vertical */}
                        <div className="hidden lg:block w-px self-stretch bg-border-default-secondary shrink-0" />

                        {/* Controles: Sort + View */}
                        <div className="flex items-center gap-2 shrink-0">

                            {/* Sort Chips */}
                            <div className="flex items-center bg-background-tertiary p-1 rounded-xl border border-border-default-secondary gap-0.5">
                                {SORT_OPTIONS.map(({ id, label, icon: Icon }) => (
                                    <button
                                        key={id}
                                        onClick={() => setSortMode(id)}
                                        title={label}
                                        className={`
                                            flex items-center gap-1.5 px-3 h-[34px] rounded-lg text-body-small-strong transition-all shrink-0
                                            ${sortMode === id
                                                ? 'bg-background-default text-text-default-default shadow-sm'
                                                : 'text-text-default-tertiary hover:text-text-default-default'
                                            }
                                        `}
                                    >
                                        <Icon className="w-3.5 h-3.5 shrink-0" />
                                        <span className="hidden xl:inline">{label}</span>
                                    </button>
                                ))}
                            </div>

                            {/* View Mode Toggle */}
                            <div className="flex items-center bg-background-tertiary p-1 rounded-xl border border-border-default-secondary">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    title="Vista cuadrícula"
                                    className={`flex items-center justify-center w-[34px] h-[34px] rounded-lg transition-all ${viewMode === 'grid' ? 'bg-background-default text-text-default-default shadow-sm' : 'text-text-default-tertiary hover:text-text-default-default'}`}
                                >
                                    <LayoutGrid className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    title="Vista lista"
                                    className={`flex items-center justify-center w-[34px] h-[34px] rounded-lg transition-all ${viewMode === 'list' ? 'bg-background-default text-text-default-default shadow-sm' : 'text-text-default-tertiary hover:text-text-default-default'}`}
                                >
                                    <List className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionHeader>

            <MobileFilterModal isOpen={isMobileFilterOpen} onClose={() => setIsMobileFilterOpen(false)} title="Filtros de Eventos">
                <FiltersContent />
            </MobileFilterModal>

            {/* Content Display */}
            {filteredAndSortedEvents.length > 0 ? (
                viewMode === 'grid' ? (
                    /* Vista Cuadrícula */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                        {filteredAndSortedEvents.map(event => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>
                ) : (
                    /* Vista Lista */
                    <div className="flex flex-col gap-2">
                        {filteredAndSortedEvents.map(event => (
                            <EventRow key={event.id} event={event} />
                        ))}
                    </div>
                )
            ) : (
                <EmptyState onClear={clearFilters} />
            )}
        </div>
    );
}
