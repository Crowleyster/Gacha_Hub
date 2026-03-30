"use client";

import { useState, useMemo, useRef, useEffect } from 'react';
import Image from 'next/image';
import {
    CalendarDays,
    ChevronDown,
    Clock,
    Search,
    SlidersHorizontal,
    Check,
    RotateCcw,
    X,
    Filter
} from 'lucide-react';
import { EVENTS_DATA } from '@/lib/mock-data';
import { GAMES_DATA } from '@/lib/games-data';
import EventCard from '@/components/EventCard';
import EmptyState from '@/components/ui/EmptyState';

/* ─── Status & Category Options ─── */
const STATUS_OPTIONS = ["Ultimas horas", "Últimos días", "Nuevos", "Próximos"];
const CATEGORY_OPTIONS = ["Permanente", "Recurrente", "Limitado"];

import FilterDropdown from '@/components/ui/FilterDropdown';
import MobileFilterModal from '@/components/ui/MobileFilterModal';
import SectionHeader from '@/components/SectionHeader';

export default function Eventos() {
    const [selectedGames, setSelectedGames] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [selectedStatuses, setSelectedStatuses] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    // Get unique types from data
    const allTypes = useMemo(() => {
        const types = new Set(EVENTS_DATA.map(e => e.type));
        return Array.from(types).sort();
    }, []);

    // Get game options for multi-select
    const gameOptions = useMemo(() => {
        return Object.values(GAMES_DATA).map(game => game.id);
    }, []);

    const getGameName = (id) => GAMES_DATA[id]?.name || id;

    // Filter Logic
    const filteredEvents = useMemo(() => {
        return EVENTS_DATA.filter(event => {
            const matchesGame = selectedGames.length === 0 || selectedGames.includes(event.gameId);
            const matchesType = selectedTypes.length === 0 || selectedTypes.includes(event.type);
            const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(event.statusLabel);
            const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(event.category);

            return matchesGame && matchesType && matchesStatus && matchesCategory;
        });
    }, [selectedGames, selectedTypes, selectedStatuses, selectedCategories]);

    const hasActiveFilters = selectedGames.length > 0 || selectedTypes.length > 0 || selectedStatuses.length > 0 || selectedCategories.length > 0;

    const clearFilters = () => {
        setSelectedGames([]);
        setSelectedTypes([]);
        setSelectedStatuses([]);
        setSelectedCategories([]);
    };

    const FiltersContent = () => (
        <div className="flex flex-col lg:flex-row items-stretch gap-3 w-full">
            <FilterDropdown
                label="Juego"
                options={gameOptions}
                selected={selectedGames}
                onChange={setSelectedGames}
                displayFormatter={getGameName}
            />
            <FilterDropdown
                label="Tipo de Evento"
                options={allTypes}
                selected={selectedTypes}
                onChange={setSelectedTypes}
            />
            <FilterDropdown
                label="Estado"
                options={STATUS_OPTIONS}
                selected={selectedStatuses}
                onChange={setSelectedStatuses}
            />
            <FilterDropdown
                label="Categoría"
                options={CATEGORY_OPTIONS}
                selected={selectedCategories}
                onChange={setSelectedCategories}
            />

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
                {/* Barra de Filtros PREMIUM */}
                <div className="space-y-4">
                    <div className="flex flex-col lg:flex-row lg:items-end gap-3 bg-background-secondary border border-border-default-secondary p-4 rounded-2xl transition-all shadow-sm">
                        {/* Mobile Toggle Button */}
                        <button
                            disabled
                            title="Próximamente"
                            className="lg:hidden flex items-center justify-center gap-2 h-[42px] px-4 w-full sm:w-auto bg-background-tertiary border border-border-default-secondary rounded-xl shadow-sm opacity-50 cursor-not-allowed text-body-small-strong text-text-default-secondary"
                        >
                            <Filter className="w-5 h-5" /> Filtrar Eventos
                            {hasActiveFilters && (
                                <span className="w-2.5 h-2.5 bg-brand-default rounded-full border border-background-default absolute top-2 right-2"></span>
                            )}
                        </button>

                        {/* Desktop Contenedor */}
                        <div className="hidden lg:flex flex-col items-stretch gap-4 flex-1">
                            <FiltersContent />
                        </div>
                    </div>
                </div>
            </SectionHeader>

            <MobileFilterModal isOpen={isMobileFilterOpen} onClose={() => setIsMobileFilterOpen(false)} title="Filtros de Eventos">
                <FiltersContent />
            </MobileFilterModal>

            {/* Content Display */}
            <div className="flex flex-col gap-6">
                {filteredEvents.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                        {filteredEvents.map(event => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>
                ) : (
                    <EmptyState onClear={clearFilters} />
                )}
            </div>
        </div>
    );
}
