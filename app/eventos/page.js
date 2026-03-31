"use client";

import { useState, useMemo, useCallback } from 'react';
import { CalendarDays, RotateCcw, Clock, ArrowDownAZ } from 'lucide-react';
import { EVENTS_DATA } from '@/lib/mock-data';
import { GAMES_DATA } from '@/lib/games-data';
import EventCard from '@/components/EventCard';
import EmptyState from '@/components/ui/EmptyState';
import FilterDropdown from '@/components/ui/FilterDropdown';
import PageControls from '@/components/PageControls';
import SectionHeader from '@/components/SectionHeader';
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
    // 1. Data Preparation
    const allTypes = useMemo(() => Array.from(new Set(EVENTS_DATA.map(e => e.type))).sort(), []);
    const gameOptions = useMemo(() => Object.values(GAMES_DATA).map(g => g.id), []);

    const sortOptions = [
        { id: 'pronto', label: 'Terminan pronto', icon: Clock },
        { id: 'reciente', label: 'Recientes', icon: CalendarDays },
        { id: 'az', label: 'A-Z', icon: ArrowDownAZ }
    ];

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

    const [viewMode, setViewMode] = useState('grid');

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
                            <EventCard key={`${event.gameId}-${event.id}`} event={event} viewMode={viewMode} />
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
                            className="bg-background-secondary border border-border-default-secondary px-8 py-3 rounded-xl text-body-strong text-text-default-default transition-all hover:bg-background-tertiary active:scale-95"
                        >
                            Ver más eventos
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
