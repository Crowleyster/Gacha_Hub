"use client";

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Filter, Check, X, ChevronDown, RotateCcw, Star } from 'lucide-react';
import { GAMES_DATA } from '@/lib/games-data';
import PlatformIcon from '@/components/PlatformIcon';
import { useFavorites } from '@/hooks/useFavorites';
import FilterDropdown from '@/components/ui/FilterDropdown';
import MobileFilterModal from '@/components/ui/MobileFilterModal';

/* ─── Componente: Tarjeta de Juego ─── */
function GameCard({ game }) {
    const displayPlatforms = game.platforms.slice(0, 2);
    const extraPlatforms = game.platforms.length > 2 ? game.platforms.length - 2 : 0;
    const { toggleFavorite, isFavorite } = useFavorites();
    const isFav = isFavorite(game.id);

    const handleFavoriteClick = (e) => {
        e.preventDefault();
        toggleFavorite(game.id);
    };

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

            <div className="relative z-10 flex items-start justify-between p-3 w-full">
                <div className="flex flex-col items-start gap-1.5">
                    {displayPlatforms.map(p => (
                        <div key={p} className="flex items-center justify-center w-7 h-7 bg-white/95 rounded-md shadow-sm">
                            <PlatformIcon platform={p} className="w-4 h-4 text-black" />
                        </div>
                    ))}
                    {extraPlatforms > 0 && (
                        <div className="flex items-center justify-center h-7 min-w-7 px-1.5 bg-white/95 rounded-md shadow-sm text-xs font-bold text-black">
                            +{extraPlatforms}
                        </div>
                    )}
                </div>
                
                <button 
                    onClick={handleFavoriteClick}
                    className={`p-1.5 rounded-lg flex items-center justify-center transition-all duration-300 ${isFav ? 'bg-amber-500/90 text-white shadow-lg scale-105' : 'bg-black/30 backdrop-blur-md text-white/70 hover:bg-black/50 hover:text-white border border-white/10'}`}
                    title={isFav ? "Quitar de favoritos" : "Añadir a favoritos"}
                >
                    <Star className="w-5 h-5" fill={isFav ? "currentColor" : "none"} strokeWidth={isFav ? 2 : 1.5} />
                </button>
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

// Eliminado FilterSelect local en favor de FilterDropdown global

/* ─── Componente: Panel de Filtros ─── */
function FiltersContent({ filters, updateFilter, hasActiveFilters, clearAllFilters, allPlatforms, allGenres, allDevs }) {
    return (
        <div className="flex flex-col gap-6">
            <FilterDropdown label="Región" options={['Global', 'Asia', 'CN']} selected={filters.region} onChange={(v) => updateFilter('region', v)} />
            <FilterDropdown label="Estado" options={['Lanzado', 'Beta', 'Próximamente']} selected={filters.estado} onChange={(v) => updateFilter('estado', v)} />
            <FilterDropdown label="Plataforma" options={allPlatforms} selected={filters.plataforma} onChange={(v) => updateFilter('plataforma', v)} />
            <FilterDropdown label="Género" options={allGenres} selected={filters.genero} onChange={(v) => updateFilter('genero', v)} />
            <FilterDropdown label="Desarrollador" options={allDevs} selected={filters.desarrollador} onChange={(v) => updateFilter('desarrollador', v)} />
            <FilterDropdown label="Publisher" options={allDevs} selected={filters.publisher} onChange={(v) => updateFilter('publisher', v)} />

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
}

/* ─── Página Principal de Juegos ───────────────────────── */
export default function Juegos() {
    const gamesList = Object.values(GAMES_DATA);

    const allGenres = useMemo(() => Array.from(new Set(gamesList.flatMap(g => g.genre))).sort(), [gamesList]);
    const allPlatforms = useMemo(() => Array.from(new Set(gamesList.flatMap(g => g.platforms))).sort(), [gamesList]);
    const allDevs = useMemo(() => Array.from(new Set(gamesList.map(g => g.developer))).sort(), [gamesList]);

    const [selectedSort, setSelectedSort] = useState('Nuevos');
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    const [filters, setFilters] = useState({
        region: [],
        estado: [],
        plataforma: [],
        genero: [],
        desarrollador: [],
        publisher: []
    });

    const updateFilter = (key, value) => setFilters(prev => ({ ...prev, [key]: value }));

    const hasActiveFilters = Object.values(filters).some(val => val.length > 0);
    const clearAllFilters = () => {
        setFilters({
            region: [],
            estado: [],
            plataforma: [],
            genero: [],
            desarrollador: [],
            publisher: []
        });
    };

    const sortOptions = ['Nuevos', 'Populares', 'Actualizados', 'A-Z'];

    const filteredGames = useMemo(() => {
        return gamesList.filter(game => {
            const matchesGenre = filters.genero.length === 0 || filters.genero.some(g => game.genre.includes(g));
            const matchesPlatform = filters.plataforma.length === 0 || filters.plataforma.some(p => game.platforms.includes(p));
            const matchesDev = filters.desarrollador.length === 0 || filters.desarrollador.includes(game.developer);
            return matchesGenre && matchesPlatform && matchesDev;
        });
    }, [gamesList, filters]);

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
                            <FiltersContent
                                filters={filters}
                                updateFilter={updateFilter}
                                hasActiveFilters={hasActiveFilters}
                                clearAllFilters={clearAllFilters}
                                allPlatforms={allPlatforms}
                                allGenres={allGenres}
                                allDevs={allDevs}
                            />
                        </div>
                    </div>
                </aside>

                {/* CONTENIDO PRINCIPAL */}
                <div className="flex-1 flex flex-col w-full gap-6 min-w-0">

                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">

                        {/* Botón de Filtro Móvil */}
                        <div className="flex items-center lg:hidden shrink-0">
                            <button
                                onClick={() => setIsMobileFilterOpen(true)}
                                aria-label="Abrir filtros"
                                className="flex items-center justify-center gap-2 p-3 px-4 rounded-xl bg-background-secondary border border-border-default-secondary text-text-default-default hover:bg-background-secondary-hover relative text-body-small-strong"
                            >
                                <Filter className="w-5 h-5" /> Filtrar
                                {hasActiveFilters && (
                                    <span className="absolute top-0 right-0 w-3 h-3 bg-brand-default rounded-full border-2 border-background-default"></span>
                                )}
                            </button>
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

            <MobileFilterModal isOpen={isMobileFilterOpen} onClose={() => setIsMobileFilterOpen(false)} title="Filtros de Juegos">
                <FiltersContent
                    filters={filters}
                    updateFilter={updateFilter}
                    hasActiveFilters={hasActiveFilters}
                    clearAllFilters={clearAllFilters}
                    allPlatforms={allPlatforms}
                    allGenres={allGenres}
                    allDevs={allDevs}
                />
            </MobileFilterModal>

        </main>
    );
}