"use client";

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Monitor, Smartphone, Filter, Check, X, ChevronDown, RotateCcw } from 'lucide-react';
import { GAMES_DATA } from '@/lib/games-data';

/* ─── Helper: Icono de Plataforma ─── */
function PlatformIcon({ platform }) {
    if (platform === 'PC' || platform.includes('PS')) {
        return <Monitor className="w-3.5 h-3.5 text-black" />;
    }
    return <Smartphone className="w-3.5 h-3.5 text-black" />;
}

/* ─── Componente: Tarjeta de Juego ─── */
function GameCard({ game }) {
    const displayPlatforms = game.platforms.slice(0, 2);
    const extraPlatforms = game.platforms.length > 2 ? game.platforms.length - 2 : 0;

    return (
        <Link
            href={`/juegos/${game.id}`}
            className="
                group relative flex flex-col justify-between
                aspect-[3/4] sm:aspect-[4/5]
                overflow-hidden rounded-2xl 
                border border-white/10 dark:border-white/5
                transition-all duration-300 
                shadow-200 hover:shadow-400
                focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30
            "
        >
            {game.bannerUrl && (
                <Image
                    src={game.bannerUrl}
                    alt={game.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
            )}

            <div className="absolute inset-0 bg-black/10 pointer-events-none" />

            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(circle at bottom left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0) 70%)'
                }}
            />

            <div className="relative z-10 flex flex-col items-start gap-1.5 p-3">
                {displayPlatforms.map(p => (
                    <div key={p} className="flex items-center justify-center w-7 h-7 bg-white/95 rounded-md shadow-sm">
                        <PlatformIcon platform={p} />
                    </div>
                ))}
                {extraPlatforms > 0 && (
                    <div className="flex items-center justify-center h-7 min-w-7 px-1.5 bg-white/95 rounded-md shadow-sm text-xs font-bold text-black">
                        +{extraPlatforms}
                    </div>
                )}
            </div>

            <div className="relative z-10 flex flex-col p-4 mt-auto">
                <span className="text-white/90 text-body-small mb-0.5 font-medium drop-shadow-lg">
                    {game.developer}
                </span>
                <h2 className="text-white text-heading leading-tight drop-shadow-xl">
                    {game.name}
                </h2>
            </div>
        </Link>
    );
}

/* ─── Componente: Select de Filtro ─── */
function FilterSelect({ label, options, value, onChange, defaultLabel = "Todos" }) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-body-base text-text-default-default">{label}</label>
            <div className="relative">
                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full appearance-none bg-background-tertiary border border-border-default-secondary rounded-lg pl-3 pr-10 py-2.5 text-body-base text-text-default-default focus:outline-none focus:border-border-default-default cursor-pointer"
                >
                    <option value="Todos">{defaultLabel}</option>
                    {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-default-default pointer-events-none" />
            </div>
        </div>
    );
}

/* ─── Página Principal de Juegos ───────────────────────── */
export default function Juegos() {
    const gamesList = Object.values(GAMES_DATA);

    const allGenres = useMemo(() => Array.from(new Set(gamesList.flatMap(g => g.genre))).sort(), [gamesList]);
    const allPlatforms = useMemo(() => Array.from(new Set(gamesList.flatMap(g => g.platforms))).sort(), [gamesList]);
    const allDevs = useMemo(() => Array.from(new Set(gamesList.map(g => g.developer))).sort(), [gamesList]);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSort, setSelectedSort] = useState('Nuevos');
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    const [filters, setFilters] = useState({
        region: 'Todos',
        estado: 'Todos',
        plataforma: 'Todos',
        genero: 'Todos',
        desarrollador: 'Todos',
        publisher: 'Todos'
    });

    const updateFilter = (key, value) => setFilters(prev => ({ ...prev, [key]: value }));

    const hasActiveFilters = Object.values(filters).some(val => val !== 'Todos');
    const clearAllFilters = () => {
        setFilters({
            region: 'Todos',
            estado: 'Todos',
            plataforma: 'Todos',
            genero: 'Todos',
            desarrollador: 'Todos',
            publisher: 'Todos'
        });
    };

    useEffect(() => {
        if (isMobileFilterOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'auto';
        return () => { document.body.style.overflow = 'auto'; };
    }, [isMobileFilterOpen]);

    const sortOptions = ['Nuevos', 'Populares', 'Actualizados', 'A-Z'];

    const filteredGames = useMemo(() => {
        return gamesList.filter(game => {
            const matchesSearch = game.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesGenre = filters.genero === 'Todos' || game.genre.includes(filters.genero);
            const matchesPlatform = filters.plataforma === 'Todos' || game.platforms.includes(filters.plataforma);
            const matchesDev = filters.desarrollador === 'Todos' || game.developer === filters.desarrollador;
            return matchesSearch && matchesGenre && matchesPlatform && matchesDev;
        });
    }, [gamesList, searchQuery, filters]);

    const FiltersContent = () => (
        <div className="flex flex-col gap-6">
            <FilterSelect label="Región" options={['Global', 'Asia', 'CN']} value={filters.region} onChange={(v) => updateFilter('region', v)} defaultLabel="Todas" />
            <FilterSelect label="Estado" options={['Lanzado', 'Beta', 'Próximamente']} value={filters.estado} onChange={(v) => updateFilter('estado', v)} defaultLabel="Todos" />
            <FilterSelect label="Plataforma" options={allPlatforms} value={filters.plataforma} onChange={(v) => updateFilter('plataforma', v)} defaultLabel="Todas" />
            <FilterSelect label="Género" options={allGenres} value={filters.genero} onChange={(v) => updateFilter('genero', v)} defaultLabel="Todos" />
            <FilterSelect label="Desarrollador" options={allDevs} value={filters.desarrollador} onChange={(v) => updateFilter('desarrollador', v)} defaultLabel="Todos" />
            <FilterSelect label="Publisher" options={allDevs} value={filters.publisher} onChange={(v) => updateFilter('publisher', v)} defaultLabel="Todos" />

            {hasActiveFilters && (
                <button
                    onClick={clearAllFilters}
                    className="flex items-center justify-center gap-2 w-full py-2.5 mt-2 bg-background-tertiary border border-border-default-secondary rounded-lg text-body-small-strong text-text-default-default hover:bg-background-secondary-hover transition-colors"
                >
                    <RotateCcw className="w-4 h-4" />
                    Limpiar filtros
                </button>
            )}
        </div>
    );

    return (
        <main className="col-span-full pb-content-safe font-sans flex flex-col gap-6">

            <h1 className="text-title-page text-text-default-default">Catálogo de juegos</h1>

            <div className="flex flex-col lg:flex-row gap-8 items-start">

                {/* SIDEBAR ESCRITORIO */}
                <aside className="hidden lg:flex flex-col w-64 shrink-0 sticky top-4">
                    <div className="bg-background-secondary border border-border-default-secondary rounded-2xl flex flex-col overflow-hidden">
                        <div className="px-4 py-4 border-b border-border-default-secondary">
                            <h3 className="text-body-strong text-text-default-default text-lg">Filtros de búsqueda</h3>
                        </div>
                        <div className="p-4">
                            <FiltersContent />
                        </div>
                    </div>
                </aside>

                {/* CONTENIDO PRINCIPAL */}
                <div className="flex-1 flex flex-col w-full gap-6 min-w-0">

                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">

                        {/* Buscador y Botón de Filtro Móvil */}
                        <div className="flex items-center gap-3 w-full lg:w-auto lg:flex-1 lg:max-w-sm xl:max-w-md shrink-0">
                            <button
                                onClick={() => setIsMobileFilterOpen(true)}
                                className="lg:hidden shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-background-secondary border border-border-default-secondary text-text-default-default hover:bg-background-secondary-hover relative"
                            >
                                <Filter className="w-5 h-5" />
                                {hasActiveFilters && (
                                    <span className="absolute top-0 right-0 w-3 h-3 bg-brand-default rounded-full border-2 border-background-default"></span>
                                )}
                            </button>

                            <div className="relative w-full">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-default-tertiary" />
                                <input
                                    type="text"
                                    placeholder="Buscar..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full h-12 pl-12 pr-12 rounded-full border border-border-default-secondary bg-background-tertiary text-text-default-default text-body-base focus:outline-none focus:border-border-default-default transition-all"
                                />
                                {searchQuery.length > 0 && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        aria-label="Borrar búsqueda"
                                        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-text-default-secondary hover:text-text-default-default transition-colors rounded-full"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Chips de Ordenamiento (Full-Bleed en Mobile/Tablet) */}
                        <div className="
                            flex items-center gap-2 overflow-x-auto scrollbar-none 
                            pb-2 lg:pb-0 
                            -mx-4 px-4 scroll-pl-4 
                            md:-mx-6 md:px-6 md:scroll-pl-6 
                            lg:mx-0 lg:px-0 lg:scroll-pl-0 
                            snap-x snap-mandatory
                            w-full lg:w-auto shrink-0
                        ">
                            {sortOptions.map(opt => {
                                const isActive = selectedSort === opt;
                                return (
                                    <button
                                        key={opt}
                                        onClick={() => setSelectedSort(opt)}
                                        className={`
                                            snap-start shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-body-small-strong transition-all
                                            ${isActive
                                                ? 'bg-text-default-default text-background-default'
                                                : 'bg-background-tertiary text-text-default-secondary border border-border-default-secondary hover:text-text-default-default'
                                            }
                                        `}
                                    >
                                        {isActive && <Check className="w-4 h-4 shrink-0" />}
                                        {opt}
                                    </button>
                                );
                            })}
                            {/* Espaciador para respetar el margen derecho al hacer scroll al máximo */}
                            <div className="w-px shrink-0 lg:hidden" aria-hidden="true" />
                        </div>
                    </div>

                    {/* Cuadrícula */}
                    {filteredGames.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredGames.map((game) => (
                                <GameCard key={game.id} game={game} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 gap-4 text-center border-2 border-dashed border-border-default-secondary rounded-2xl">
                            <p className="text-body-base text-text-default-secondary">No se encontraron juegos con esos filtros.</p>
                            <button
                                onClick={clearAllFilters}
                                className="mt-2 text-text-brand-default text-body-small-strong hover:underline"
                            >
                                Limpiar filtros
                            </button>
                        </div>
                    )}

                    {filteredGames.length > 0 && (
                        <button className="w-full py-4 mt-4 bg-background-secondary text-text-default-default text-body-strong rounded-xl hover:bg-background-secondary-hover transition-colors">
                            Cargar más juegos ↓
                        </button>
                    )}

                </div>
            </div>

            {/* MODAL MÓVIL */}
            {isMobileFilterOpen && (
                <div className="fixed inset-0 z-[100] lg:hidden flex justify-end">
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in"
                        onClick={() => setIsMobileFilterOpen(false)}
                    />
                    <aside className="relative w-[85%] max-w-sm h-full bg-background-default border-l border-border-default-secondary shadow-2xl flex flex-col animate-in slide-in-from-right-full duration-300">
                        <div className="flex items-center justify-between p-4 border-b border-border-default-secondary">
                            <h3 className="text-heading text-text-default-default">Filtros</h3>
                            <button
                                onClick={() => setIsMobileFilterOpen(false)}
                                className="p-2 text-text-default-secondary hover:text-text-default-default bg-background-secondary rounded-full"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                            <FiltersContent />
                        </div>
                        <div className="p-4 border-t border-border-default-secondary bg-background-default pb-safe">
                            <button
                                onClick={() => setIsMobileFilterOpen(false)}
                                className="w-full py-3 bg-brand-default text-text-brand-on rounded-xl text-body-strong"
                            >
                                Mostrar resultados
                            </button>
                        </div>
                    </aside>
                </div>
            )}

        </main>
    );
}