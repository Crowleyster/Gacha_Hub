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

/* ─── Status & Category Options ─── */
const STATUS_OPTIONS = ["Ultimas horas", "Últimos días", "Nuevos", "Próximos"];
const CATEGORY_OPTIONS = ["Permanente", "Recurrente", "Limitado"];

/* ─── Multi-select Dropdown Component ─── */
function MultiSelectDropdown({ label, options, selected, onChange, displayFormatter }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleOption = (option) => {
        const newSelected = selected.includes(option)
            ? selected.filter(item => item !== option)
            : [...selected, option];
        onChange(newSelected);
    };

    return (
        <div className="flex flex-col gap-1.5 flex-1 min-w-[140px] relative" ref={dropdownRef}>
            <span className="text-[10px] uppercase tracking-wider font-bold text-text-default-tertiary px-1">{label}</span>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full h-[42px] flex items-center justify-between bg-background-tertiary border rounded-xl px-3 transition-all ${isOpen ? 'border-border-default-default ring-1 ring-border-default-default/20' : 'border-border-default-secondary'}`}
            >
                <span className={`text-body-small-strong truncate ${selected.length > 0 ? 'text-text-default-default' : 'text-text-default-tertiary'}`}>
                    {selected.length === 0 ? "Todos" : `${label} (${selected.length})`}
                </span>
                <ChevronDown className={`w-4 h-4 text-text-default-tertiary transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-background-secondary border border-border-default-secondary rounded-xl shadow-xl z-50 p-2 overflow-hidden animate-in fade-in zoom-in duration-150">
                    <div className="space-y-1 max-h-60 overflow-y-auto pr-1">
                        {options.map(option => (
                            <button
                                key={option}
                                onClick={() => toggleOption(option)}
                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-background-tertiary transition-colors text-left group"
                            >
                                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${selected.includes(option) ? 'bg-text-brand-default border-text-brand-default' : 'border-border-default-secondary group-hover:border-text-default-tertiary'}`}>
                                    {selected.includes(option) && <Check className="w-3 h-3 text-white" strokeWidth={4} />}
                                </div>
                                <span className={`text-body-small font-medium ${selected.includes(option) ? 'text-text-default-default' : 'text-text-default-secondary'}`}>
                                    {displayFormatter ? displayFormatter(option) : option}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default function Eventos() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedGames, setSelectedGames] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [selectedStatuses, setSelectedStatuses] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [isFilterExpanded, setIsFilterExpanded] = useState(false);

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
            const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesGame = selectedGames.length === 0 || selectedGames.includes(event.gameId);
            const matchesType = selectedTypes.length === 0 || selectedTypes.includes(event.type);
            const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(event.statusLabel);
            const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(event.category);
            
            return matchesSearch && matchesGame && matchesType && matchesStatus && matchesCategory;
        });
    }, [searchQuery, selectedGames, selectedTypes, selectedStatuses, selectedCategories]);

    const hasActiveFilters = searchQuery !== '' || selectedGames.length > 0 || selectedTypes.length > 0 || selectedStatuses.length > 0 || selectedCategories.length > 0;

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedGames([]);
        setSelectedTypes([]);
        setSelectedStatuses([]);
        setSelectedCategories([]);
    };

    return (
        <main className="col-span-full space-y-8 pb-content-safe font-sans text-text-default-default">
            {/* Header */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-background-secondary rounded-xl border border-border-default-secondary/50 shadow-sm">
                        <CalendarDays className="w-6 h-6 text-text-brand-default" />
                    </div>
                    <h1 className="text-title-page">Centro de Eventos</h1>
                </div>
                <p className="text-body-base text-text-default-secondary max-w-2xl">
                    Sigue el cronograma de todos los eventos, misiones y recompensas de tus juegos favoritos.
                </p>
            </div>

            {/* Barra de Filtros PREMIUM */}
            <div className="space-y-4">
                <div className="flex flex-col lg:flex-row lg:items-end gap-3 bg-background-secondary border border-border-default-secondary p-4 rounded-2xl transition-all shadow-sm">
                    
                    {/* Buscador & Mobile Toggle */}
                    <div className="flex items-center gap-3 flex-1 lg:max-w-xs">
                        <button 
                            onClick={() => setIsFilterExpanded(!isFilterExpanded)}
                            className="lg:hidden p-2.5 bg-background-tertiary border border-border-default-secondary rounded-xl shadow-sm hover:bg-background-secondary-hover transition-colors"
                        >
                            <SlidersHorizontal className="w-5 h-5" />
                        </button>
                        
                        <div className="relative flex-1 group">
                            <input
                                type="text"
                                placeholder="Search events..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full h-[42px] bg-background-tertiary border border-border-default-secondary rounded-xl px-4 text-body-base focus:border-border-default-default outline-none transition-all placeholder:text-text-default-tertiary"
                            />
                            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-default-tertiary group-focus-within:text-text-default-default transition-colors" />
                        </div>
                    </div>

                    {/* Filtros Expandibles (TODOS Multi-select) */}
                    <div className={`${isFilterExpanded ? 'flex' : 'hidden'} lg:flex flex-col lg:flex-row items-stretch gap-3 flex-1`}>
                        {/* Selector de Juego */}
                        <MultiSelectDropdown 
                            label="Juego" 
                            options={gameOptions} 
                            selected={selectedGames} 
                            onChange={setSelectedGames}
                            displayFormatter={getGameName}
                        />

                        {/* Selector de Tipo */}
                        <MultiSelectDropdown 
                            label="Tipo de Evento" 
                            options={allTypes} 
                            selected={selectedTypes} 
                            onChange={setSelectedTypes} 
                        />

                        {/* Selector de Estado */}
                        <MultiSelectDropdown 
                            label="Estado" 
                            options={STATUS_OPTIONS} 
                            selected={selectedStatuses} 
                            onChange={setSelectedStatuses} 
                        />

                        {/* Selector de Categoría */}
                        <MultiSelectDropdown 
                            label="Categoría" 
                            options={CATEGORY_OPTIONS} 
                            selected={selectedCategories} 
                            onChange={setSelectedCategories} 
                        />
                    </div>

                    {/* Limpiar */}
                    <div className="flex items-center gap-3 mt-auto lg:mt-0 w-full lg:w-auto self-end">
                        {hasActiveFilters && (
                            <button
                                onClick={clearFilters}
                                className="flex items-center justify-center gap-2 h-[42px] px-4 bg-background-tertiary border border-border-default-secondary rounded-xl text-body-small-strong hover:bg-background-secondary-hover transition-all flex-1 sm:flex-none"
                            >
                                <RotateCcw className="w-4 h-4" />
                                <span>Limpiar</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Content Display */}
            <div className="flex flex-col gap-6">
                {filteredEvents.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                        {filteredEvents.map(event => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 bg-background-secondary border border-dashed border-border-default-secondary rounded-3xl gap-4">
                        <div className="p-4 bg-background-tertiary rounded-full">
                            <X className="w-8 h-8 text-text-default-tertiary" />
                        </div>
                        <div className="text-center">
                            <h3 className="text-heading text-text-default-default">No se encontraron eventos</h3>
                            <p className="text-body-base text-text-default-tertiary">Intenta ajustar los filtros de búsqueda</p>
                        </div>
                        <button 
                            onClick={clearFilters}
                            className="flex items-center gap-2 px-6 py-2 bg-background-default border border-border-default-secondary rounded-xl text-body-small-strong hover:bg-background-secondary-hover transition-all shadow-sm"
                        >
                            <RotateCcw className="w-4 h-4" />
                            Reiniciar filtros
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
}
