"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    Filter, Check, ChevronDown, RotateCcw, Star,
    Gamepad2, LayoutGrid, List, ChevronRight
} from 'lucide-react';
import { GAMES_DATA } from '@/lib/games-data';
import PlatformIcon from '@/components/PlatformIcon';
import { useFavorites } from '@/hooks/useFavorites';
import FilterDropdown from '@/components/ui/FilterDropdown';
import MobileFilterModal from '@/components/ui/MobileFilterModal';
import SectionHeader from '@/components/SectionHeader';
import EmptyState from '@/components/ui/EmptyState';

/* ─────────────────────────────────────────────
   GameCard — Tarjeta de Juego (Grid + List)
───────────────────────────────────────────── */
function GameCard({ game, viewMode = 'grid' }) {
    const { toggleFavorite, isFavorite } = useFavorites();
    const isFav = isFavorite(game.id);

    const handleFavoriteClick = (e) => {
        e.preventDefault();
        toggleFavorite(game.id);
    };

    /* ── Vista Lista ── */
    if (viewMode === 'list') {
        return (
            <Link
                href={`/juegos/${game.id}`}
                className="
                    group flex items-center gap-4 p-3 sm:p-4
                    bg-background-secondary border border-border-default-secondary
                    rounded-2xl hover:border-border-default-default
                    hover:shadow-md hover:-translate-y-0.5
                    transition-all duration-300
                "
            >
                {/* Thumbnail */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-xl overflow-hidden border border-white/10 shadow-sm">
                    {game.bannerUrl
                        ? <Image
                            src={game.bannerUrl}
                            alt={game.name}
                            fill
                            sizes="80px"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        : <div className="w-full h-full bg-background-tertiary" />
                    }
                </div>

                {/* Info central */}
                <div className="flex-1 min-w-0">
                    <p className="text-caption text-text-default-tertiary truncate">
                        {game.developer}
                    </p>
                    <h2 className="text-body-strong text-text-default-default leading-tight line-clamp-1 group-hover:text-brand-default transition-colors">
                        {game.name}
                    </h2>
                    <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                        {game.genre?.slice(0, 2).map(g => (
                            <span key={g} className="h-4 flex items-center px-1.5 bg-brand-default/10 text-brand-default rounded-full border border-brand-default/20 text-[10px] font-semibold uppercase tracking-wide">
                                {g}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Derecha: Plataformas + Favorito + Chevron */}
                <div className="flex items-center gap-3 shrink-0">

                    {/* Plataformas — responsivo: sm=2, md=3, lg=5 */}
                    <div className="hidden sm:flex items-center gap-1">
                        {/* sm: muestra hasta 2 */}
                        {game.platforms.slice(0, 2).map(p => (
                            <div key={p} className="flex md:hidden items-center justify-center w-6 h-6 bg-background-tertiary rounded-md border border-border-default-secondary">
                                <PlatformIcon platform={p} className="w-3.5 h-3.5 text-text-default-secondary" />
                            </div>
                        ))}
                        {game.platforms.length > 2 && (
                            <span className="flex md:hidden items-center justify-center h-6 min-w-6 px-1 rounded-md bg-background-tertiary border border-border-default-secondary text-[10px] font-bold text-text-default-tertiary">
                                +{game.platforms.length - 2}
                            </span>
                        )}

                        {/* md: muestra hasta 3 */}
                        {game.platforms.slice(0, 3).map(p => (
                            <div key={`md-${p}`} className="hidden md:flex lg:hidden items-center justify-center w-6 h-6 bg-background-tertiary rounded-md border border-border-default-secondary">
                                <PlatformIcon platform={p} className="w-3.5 h-3.5 text-text-default-secondary" />
                            </div>
                        ))}
                        {game.platforms.length > 3 && (
                            <span className="hidden md:flex lg:hidden items-center justify-center h-6 min-w-6 px-1 rounded-md bg-background-tertiary border border-border-default-secondary text-[10px] font-bold text-text-default-tertiary">
                                +{game.platforms.length - 3}
                            </span>
                        )}

                        {/* lg+: muestra hasta 5 */}
                        {game.platforms.slice(0, 5).map(p => (
                            <div key={`lg-${p}`} className="hidden lg:flex items-center justify-center w-6 h-6 bg-background-tertiary rounded-md border border-border-default-secondary">
                                <PlatformIcon platform={p} className="w-3.5 h-3.5 text-text-default-secondary" />
                            </div>
                        ))}
                        {game.platforms.length > 5 && (
                            <span className="hidden lg:flex items-center justify-center h-6 min-w-6 px-1 rounded-md bg-background-tertiary border border-border-default-secondary text-[10px] font-bold text-text-default-tertiary">
                                +{game.platforms.length - 5}
                            </span>
                        )}
                    </div>

                    <button
                        onClick={handleFavoriteClick}
                        title={isFav ? "Quitar de favoritos" : "Añadir a favoritos"}
                        className={`p-1.5 rounded-lg flex items-center justify-center transition-all duration-300 ${isFav ? 'text-amber-500' : 'text-text-default-tertiary hover:text-text-default-default'}`}
                    >
                        <Star className="w-4 h-4" fill={isFav ? "currentColor" : "none"} strokeWidth={isFav ? 2 : 1.5} />
                    </button>

                    <ChevronRight className="w-4 h-4 text-text-default-tertiary group-hover:text-text-default-default group-hover:translate-x-0.5 transition-all" />
                </div>
            </Link>
        );
    }

    /* ── Vista Cuadrícula (default) ── */
    return (
        <Link
            href={`/juegos/${game.id}`}
            className="
                group relative flex flex-col justify-between
                aspect-[3/4] sm:aspect-[4/5]
                overflow-hidden rounded-2xl
                border border-white/10 dark:border-white/5
                transition-all duration-300
                hover:shadow-lg hover:-translate-y-1
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
                style={{ background: 'radial-gradient(circle at bottom left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0) 70%)' }}
            />

            {/* Top: Plataformas + Favorito */}
            <div className="relative z-10 flex items-start justify-between p-3 w-full">
                <div className="flex flex-col items-start gap-1.5">
                    {game.platforms.slice(0, 2).map(p => (
                        <div key={p} className="flex items-center justify-center w-7 h-7 bg-white/95 rounded-md shadow-sm">
                            <PlatformIcon platform={p} className="w-4 h-4 text-black" />
                        </div>
                    ))}
                    {game.platforms.length > 2 && (
                        <div className="flex items-center justify-center h-7 min-w-7 px-1.5 bg-white/95 rounded-md shadow-sm text-xs font-bold text-black">
                            +{game.platforms.length - 2}
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

            {/* Bottom: Nombre */}
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

/* ─────────────────────────────────────────────
   FiltersContent — Barra Horizontal de Filtros
───────────────────────────────────────────── */
function FiltersContent({ filters, updateFilter, hasActiveFilters, clearAllFilters, allPlatforms, allGenres, allDevs }) {
    return (
        <div className="flex flex-col lg:flex-row items-stretch gap-3 w-full">
            <FilterDropdown label="Plataforma" options={allPlatforms} selected={filters.plataforma} onChange={(v) => updateFilter('plataforma', v)} />
            <FilterDropdown label="Género" options={allGenres} selected={filters.genero} onChange={(v) => updateFilter('genero', v)} />
            <FilterDropdown label="Desarrollador" options={allDevs} selected={filters.desarrollador} onChange={(v) => updateFilter('desarrollador', v)} />

            {hasActiveFilters && (
                <button
                    onClick={clearAllFilters}
                    className="flex items-center justify-center gap-2 h-[42px] px-4 shrink-0 bg-background-tertiary border border-border-default-secondary rounded-xl text-body-small-strong uppercase tracking-wider text-text-default-secondary hover:bg-background-secondary-hover hover:text-brand-default transition-all mt-auto"
                >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span className="lg:hidden">Limpiar filtros</span>
                </button>
            )}
        </div>
    );
}

/* ─────────────────────────────────────────────
   Página Principal de Juegos
───────────────────────────────────────────── */
export default function Juegos() {
    const gamesList = Object.values(GAMES_DATA);

    const allGenres = useMemo(() => Array.from(new Set(gamesList.flatMap(g => g.genre))).sort(), [gamesList]);
    const allPlatforms = useMemo(() => Array.from(new Set(gamesList.flatMap(g => g.platforms))).sort(), [gamesList]);
    const allDevs = useMemo(() => Array.from(new Set(gamesList.map(g => g.developer))).sort(), [gamesList]);

    const [selectedSort, setSelectedSort] = useState('Nuevos');
    const [viewMode, setViewMode] = useState('grid');   // 'grid' | 'list'
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const [visibleCount, setVisibleCount] = useState(12);

    const [filters, setFilters] = useState({
        plataforma: [],
        genero: [],
        desarrollador: [],
    });

    const updateFilter = (key, value) => setFilters(prev => ({ ...prev, [key]: value }));
    const hasActiveFilters = Object.values(filters).some(val => val.length > 0);
    const clearAllFilters = () => setFilters({ plataforma: [], genero: [], desarrollador: [] });

    const sortOptions = ['Nuevos', 'Populares', 'Actualizados', 'A-Z'];

    const filteredGames = useMemo(() => {
        return gamesList.filter(game => {
            const matchesGenre = filters.genero.length === 0 || filters.genero.some(g => game.genre.includes(g));
            const matchesPlatform = filters.plataforma.length === 0 || filters.plataforma.some(p => game.platforms.includes(p));
            const matchesDev = filters.desarrollador.length === 0 || filters.desarrollador.includes(game.developer);
            return matchesGenre && matchesPlatform && matchesDev;
        });
    }, [gamesList, filters]);

    const visibleGames = filteredGames.slice(0, visibleCount);

    return (
        <div className="col-span-full pb-content-safe font-sans flex flex-col gap-8">

            <SectionHeader
                variant="page"
                icon={Gamepad2}
                title="Catálogo de juegos"
                subtitle="Explora y descubre todos los títulos de tu biblioteca con guías detalladas."
            >
                {/* Barra de Controles */}
                <div className="flex flex-col lg:flex-row lg:items-end gap-3 bg-background-secondary border border-border-default-secondary p-4 rounded-2xl shadow-sm">

                    {/* --- CONTROLES MOBILE --- */}
                    <div className="lg:hidden flex flex-col gap-3 w-full">
                        {/* Botón Filtrar */}
                        <button
                            onClick={() => setIsMobileFilterOpen(true)}
                            className="flex items-center justify-center gap-2 h-[42px] px-4 w-full bg-background-tertiary border border-border-default-secondary rounded-xl shadow-sm text-body-small-strong text-text-default-default hover:bg-background-secondary-hover transition-colors relative"
                        >
                            <Filter className="w-5 h-5" /> Filtrar Juegos
                            {hasActiveFilters && (
                                <span className="w-2.5 h-2.5 bg-brand-default rounded-full border border-background-default absolute top-2 right-2"></span>
                            )}
                        </button>

                        {/* Sort & View Mobile */}
                        <div className="flex items-center justify-between gap-3 w-full">
                            {/* Sort Chips Scrollable */}
                            <div className="flex items-center bg-background-tertiary p-1 rounded-xl border border-border-default-secondary gap-1 overflow-x-auto scrollbar-none snap-x snap-mandatory flex-1">
                                {sortOptions.map(opt => {
                                    const isActive = selectedSort === opt;
                                    return (
                                        <button
                                            key={opt}
                                            onClick={() => setSelectedSort(opt)}
                                            className={`snap-start shrink-0 px-3 h-[34px] rounded-lg text-body-small-strong transition-all ${isActive ? 'bg-background-default text-text-default-default shadow-sm' : 'text-text-default-tertiary hover:text-text-default-default'}`}
                                        >
                                            {isActive && <Check className="inline w-3 h-3 mr-1" />}
                                            {opt}
                                        </button>
                                    );
                                })}
                            </div>
                            
                            {/* View Toggle Mobile */}
                            <div className="flex items-center bg-background-tertiary p-1 rounded-xl border border-border-default-secondary shrink-0">
                                <button onClick={() => setViewMode('grid')} className={`flex items-center justify-center w-[34px] h-[34px] rounded-lg transition-all ${viewMode === 'grid' ? 'bg-background-default text-text-default-default shadow-sm' : 'text-text-default-tertiary hover:text-text-default-default'}`}>
                                    <LayoutGrid className="w-4 h-4" />
                                </button>
                                <button onClick={() => setViewMode('list')} className={`flex items-center justify-center w-[34px] h-[34px] rounded-lg transition-all ${viewMode === 'list' ? 'bg-background-default text-text-default-default shadow-sm' : 'text-text-default-tertiary hover:text-text-default-default'}`}>
                                    <List className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Desktop: Filtros Horizontales */}
                    <div className="hidden lg:flex flex-col items-stretch flex-1">
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

                    {/* Separador vertical */}
                    <div className="hidden lg:block w-px self-stretch bg-border-default-secondary shrink-0" />

                    {/* Controles Desktop: Sort Chips + View Toggle */}
                    <div className="hidden lg:flex items-center gap-2 shrink-0">

                        {/* Sort Chips — scroll horizontal en mobile */}
                        <div className="
                            flex items-center gap-1.5 overflow-x-auto scrollbar-none
                            -mx-4 px-4 sm:-mx-0 sm:px-0
                            snap-x snap-mandatory
                        ">
                            {sortOptions.map(opt => {
                                const isActive = selectedSort === opt;
                                return (
                                    <button
                                        key={opt}
                                        onClick={() => setSelectedSort(opt)}
                                        className={`
                                            snap-start shrink-0 flex items-center gap-1.5 px-3 h-[34px] rounded-full text-body-small-strong transition-all
                                            ${isActive
                                                ? 'bg-text-default-default text-background-default'
                                                : 'bg-background-tertiary text-text-default-secondary border border-border-default-secondary hover:text-text-default-default'
                                            }
                                        `}
                                    >
                                        {isActive && <Check className="w-3.5 h-3.5 shrink-0" />}
                                        {opt}
                                    </button>
                                );
                            })}
                        </div>

                        {/* View Mode Toggle */}
                        <div className="flex items-center bg-background-tertiary p-1 rounded-xl border border-border-default-secondary shrink-0">
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
            </SectionHeader>

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

            {/* ── Content Area ── */}
            {filteredGames.length > 0 ? (
                <>
                    {viewMode === 'grid' ? (
                        /* Vista Cuadrícula */
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {visibleGames.map(game => (
                                <GameCard key={game.id} game={game} viewMode="grid" />
                            ))}
                        </div>
                    ) : (
                        /* Vista Lista */
                        <div className="flex flex-col gap-3">
                            {visibleGames.map(game => (
                                <GameCard key={game.id} game={game} viewMode="list" />
                            ))}
                        </div>
                    )}

                    {/* Botón Cargar Más */}
                    {visibleCount < filteredGames.length && (
                        <div className="flex flex-col items-center gap-4 pt-4">
                            <p className="text-body-small text-text-default-tertiary">
                                Mostrando {visibleGames.length} de {filteredGames.length} juegos
                            </p>
                            <button
                                onClick={() => setVisibleCount(prev => prev + 12)}
                                className="group w-full max-w-2xl bg-background-secondary border border-border-default-secondary rounded-xl py-3 text-body-small-strong text-text-default-default hover:bg-background-secondary-hover hover:border-brand-default/50 transition-all flex items-center justify-center gap-2 shadow-sm"
                            >
                                Cargar más juegos
                                <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <EmptyState onClear={clearAllFilters} />
            )}
        </div>
    );
}