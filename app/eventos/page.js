"use client";

import { useState, useMemo, useCallback } from 'react';
import Image from 'next/image';
import { CalendarDays, RotateCcw, Clock, ArrowDownAZ, Info } from 'lucide-react';
import { EVENTS_DATA } from '@/lib/mock-data';
import { GAMES_DATA } from '@/lib/games-data';
import EventCard, { getTimeInfo } from '@/components/EventCard';
import EmptyState from '@/components/ui/EmptyState';
import FilterDropdown from '@/components/ui/FilterDropdown';
import PageControls from '@/components/PageControls';
import SectionHeader from '@/components/SectionHeader';
import RightSheet from '@/components/ui/RightSheet';
import { useFilters } from '@/hooks/useFilters';

const STATUS_OPTIONS = ["Ultimas horas", "Últimos días", "Nuevos", "Próximos"];
const CATEGORY_OPTIONS = ["Permanente", "Recurrente", "Limitado"];

/* ─────────────────────────────────────────────
   Componente de Filtros Interno
───────────────────────────────────────────── */
function FiltersContent({ filters, updateFilter, hasActiveFilters, clearFilters, allTypes, gameOptions }) {
    return (
        <div className="flex flex-col lg:flex-row items-stretch gap-3 w-full">
            <FilterDropdown 
                label="Juego" 
                options={gameOptions} 
                selected={filters.juego} 
                onChange={(v) => updateFilter('juego', v)} 
                displayFormatter={(id) => GAMES_DATA[id]?.shortName || id} 
            />
            <FilterDropdown 
                label="Tipo de Evento" 
                options={allTypes} 
                selected={filters.tipo} 
                onChange={(v) => updateFilter('tipo', v)} 
            />
            <FilterDropdown 
                label="Estado" 
                options={STATUS_OPTIONS} 
                selected={filters.estado} 
                onChange={(v) => updateFilter('estado', v)} 
            />
            <FilterDropdown 
                label="Categoría" 
                options={CATEGORY_OPTIONS} 
                selected={filters.categoria} 
                onChange={(v) => updateFilter('categoria', v)} 
            />

            {hasActiveFilters && (
                <button
                    onClick={clearFilters}
                    className="flex items-center justify-center gap-2 h-[42px] px-4 shrink-0 bg-background-tertiary border border-border-default-secondary rounded-xl text-body-small-strong uppercase tracking-wider text-text-default-secondary hover:bg-background-secondary-hover hover:text-brand-default transition-all mt-auto"
                >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span className="lg:hidden text-[10px]">Limpiar filtros</span>
                </button>
            )}
        </div>
    );
}

export default function Eventos() {
    // 1. Data & State
    const allTypes = useMemo(() => Array.from(new Set(EVENTS_DATA.map(e => e.type))).sort(), []);
    const gameOptions = useMemo(() => Object.values(GAMES_DATA).map(g => g.id), []);

    const sortOptions = [
        { id: 'pronto', label: 'Terminan pronto', icon: Clock },
        { id: 'reciente', label: 'Recientes', icon: CalendarDays },
        { id: 'az', label: 'A-Z', icon: ArrowDownAZ }
    ];

    const [viewMode, setViewMode] = useState('grid');
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    // 2. Logic Hooks
    const filterFn = useCallback((event, filters) => {
        const matchesGame = filters.juego.length === 0 || filters.juego.includes(event.gameId);
        const matchesType = filters.tipo.length === 0 || filters.tipo.includes(event.type);
        const matchesStatus = filters.estado.length === 0 || filters.estado.includes(event.statusLabel);
        const matchesCategory = filters.categoria.length === 0 || filters.categoria.includes(event.category);
        return matchesGame && matchesType && matchesStatus && matchesCategory;
    }, []);

    const sortFn = useCallback((a, b, mode) => {
        if (mode === 'pronto') {
            const dateA = a.endDate ? new Date(a.endDate) : new Date('9999-12-31');
            const dateB = b.endDate ? new Date(b.endDate) : new Date('9999-12-31');
            return dateA - dateB;
        }
        if (mode === 'reciente') {
            const dateA = a.startDate ? new Date(a.startDate) : new Date(0);
            const dateB = b.startDate ? new Date(b.startDate) : new Date(0);
            return dateB - dateA;
        }
        if (mode === 'az') {
            return a.title.localeCompare(b.title, 'es');
        }
        return 0;
    }, []);

    const {
        filters,
        updateFilter,
        clearFilters,
        sortMode,
        setSortMode,
        visibleData,
        loadMore,
        hasMore,
        hasActiveFilters
    } = useFilters(EVENTS_DATA, {
        filterFn,
        sortFn,
        initialSort: 'pronto',
        initialFilters: { juego: [], tipo: [], estado: [], categoria: [] },
        initialVisible: 12,
        pageSize: 4
    });

    const handleEventClick = (event) => {
        setSelectedEvent(event);
        setIsSheetOpen(true);
    };

    return (
        <div className="col-span-full pb-content-safe font-sans text-text-default-default flex flex-col gap-12 sm:gap-16">
            <SectionHeader
                variant="page"
                icon={CalendarDays}
                title="Centro de Eventos"
                subtitle="Sigue el cronograma de todos los eventos, misiones y recompensas de tus juegos favoritos."
            >
                <PageControls 
                    sortOptions={sortOptions}
                    sortMode={sortMode}
                    onSortChange={setSortMode}
                    viewMode={viewMode}
                    onViewChange={setViewMode}
                    hasActiveFilters={hasActiveFilters}
                    filters={
                        <FiltersContent 
                            filters={filters}
                            updateFilter={updateFilter}
                            hasActiveFilters={hasActiveFilters}
                            clearFilters={clearFilters}
                            allTypes={allTypes}
                            gameOptions={gameOptions}
                        />
                    }
                />
            </SectionHeader>

            <div className="flex flex-col gap-8">
                {visibleData.length > 0 ? (
                    <div className={`grid gap-4 sm:gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
                        {visibleData.map(event => (
                            <EventCard 
                                key={`${event.gameId}-${event.id}`} 
                                event={event} 
                                viewMode={viewMode} 
                                onClick={handleEventClick}
                            />
                        ))}
                    </div>
                ) : (
                    <EmptyState 
                        title="No se encontraron eventos"
                        message="Intenta ajustar los filtros para encontrar lo que buscas."
                        onClear={clearFilters}
                    />
                )}

                {hasMore && (
                    <div className="flex justify-center pt-8">
                        <button
                            onClick={loadMore}
                            className="bg-background-secondary border border-border-default-secondary px-8 py-3 rounded-xl text-body-strong text-text-default-default transition-all hover:bg-background-tertiary active:scale-95 flex items-center gap-2"
                        >
                            Ver más eventos
                        </button>
                    </div>
                )}
            </div>

            {/* RightSheet — Detalle del Evento */}
            <RightSheet isOpen={isSheetOpen} onClose={() => setIsSheetOpen(false)}>
                {selectedEvent && (
                    <div className="flex flex-col animate-in fade-in duration-500">
                        {/* 1. Imagen del Evento */}
                        <div className="relative aspect-video w-full bg-background-tertiary overflow-hidden">
                            {(selectedEvent.imageUrl || GAMES_DATA[selectedEvent.gameId]?.bannerUrl) && (
                                <Image 
                                    src={selectedEvent.imageUrl || GAMES_DATA[selectedEvent.gameId]?.bannerUrl} 
                                    alt={selectedEvent.title} 
                                    fill 
                                    className="object-cover" 
                                />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-background-default via-transparent to-transparent" />
                        </div>

                        <div className="flex flex-col p-6 gap-8">
                            {/* 2. Cabecera del Juego */}
                            <div className="flex items-center gap-3">
                                {GAMES_DATA[selectedEvent.gameId]?.iconUrl && (
                                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-border-default-secondary shadow-sm">
                                        <Image 
                                            src={GAMES_DATA[selectedEvent.gameId].iconUrl} 
                                            alt={selectedEvent.gameName} 
                                            fill 
                                            className="object-cover" 
                                        />
                                    </div>
                                )}
                                <span className="text-body-strong text-text-default-secondary">
                                    {GAMES_DATA[selectedEvent.gameId]?.name || selectedEvent.gameName}
                                </span>
                            </div>

                            {/* 3. Título */}
                            <h2 className="text-heading text-text-default-default leading-tight">
                                {selectedEvent.title}
                            </h2>

                            {/* 4. Metadatos y Tags */}
                            <div className="flex flex-wrap gap-2">
                                {selectedEvent.type && (
                                    <span className="px-3 py-1.5 bg-brand-default/10 text-brand-default rounded-lg text-badge tracking-wider font-bold border border-brand-default/20">
                                        {selectedEvent.type}
                                    </span>
                                )}
                                {selectedEvent.category && (
                                    <span className="px-3 py-1.5 bg-background-secondary text-text-default-secondary rounded-lg text-badge tracking-wider font-bold border border-border-default-secondary">
                                        {selectedEvent.category}
                                    </span>
                                )}
                            </div>

                            {/* 5. Estado y Tiempo */}
                            <div className="flex flex-col gap-4 p-4 bg-background-secondary rounded-2xl border border-border-default-secondary">
                                <div className="flex justify-between items-center text-body-small">
                                    <div className="flex flex-col">
                                        <span className="text-text-default-tertiary uppercase text-[10px] font-bold tracking-widest mb-1">Inicio</span>
                                        <span className="text-text-default-default font-medium">{selectedEvent.startDate}</span>
                                    </div>
                                    <div className="flex flex-col text-right">
                                        <span className="text-text-default-tertiary uppercase text-[10px] font-bold tracking-widest mb-1">Fin</span>
                                        <span className="text-text-default-default font-medium">{selectedEvent.endDate === '2099-12-31' ? 'Permanente' : selectedEvent.endDate}</span>
                                    </div>
                                </div>
                                <hr className="border-border-default-secondary opacity-50" />
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-text-default-secondary">
                                        <Clock className="w-4 h-4" />
                                        <span className="text-body-base">Tiempo restante</span>
                                    </div>
                                    {(() => {
                                        const { label, color } = getTimeInfo(selectedEvent);
                                        return (
                                            <span className={`${color} px-4 py-1.5 rounded-full text-body-small-strong shadow-sm border border-black/10`}>
                                                {label}
                                            </span>
                                        );
                                    })()}
                                </div>
                            </div>

                            {/* 6. Descripción */}
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-2 text-text-default-tertiary">
                                    <Info className="w-4 h-4" />
                                    <span className="text-[10px] uppercase font-bold tracking-widest">Información</span>
                                </div>
                                <p className="text-body-base text-text-default-secondary leading-relaxed">
                                    {selectedEvent.description || GAMES_DATA[selectedEvent.gameId]?.description || 'Este evento ofrece recompensas exclusivas por tiempo limitado. Asegúrate de completar los objetivos antes del cierre.'}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </RightSheet>
        </div>
    );
}
