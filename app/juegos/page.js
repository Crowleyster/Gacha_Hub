"use client";

import { useState, useMemo, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    Filter, Check, ChevronDown, RotateCcw, Star,
    Gamepad2, LayoutGrid, List, ChevronRight,
    Sparkles, TrendingUp, Calendar, ArrowDownAZ
} from 'lucide-react';
import { GAMES_DATA } from '@/lib/games-data';
import PlatformIcon from '@/components/PlatformIcon';
import FilterDropdown from '@/components/ui/FilterDropdown';
import MobileFilterModal from '@/components/ui/MobileFilterModal';
import SectionHeader from '@/components/SectionHeader';
import EmptyState from '@/components/ui/EmptyState';
import PageControls from '@/components/PageControls';
import { useFilters } from '@/hooks/useFilters';

/* ─────────────────────────────────────────────
   GameCard Component
───────────────────────────────────────────── */
function GameCard({ game, viewMode }) {
    const [isFav, setIsFav] = useState(false);
    useEffect(() => {
        const favs = JSON.parse(localStorage.getItem('gacha_favs') || '[]');
        setIsFav(favs.includes(game.id));
    }, [game.id]);

    const handleFavoriteClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const favs = JSON.parse(localStorage.getItem('gacha_favs') || '[]');
        let newFavs;
        if (favs.includes(game.id)) {
            newFavs = favs.filter(id => id !== game.id);
        } else {
            newFavs = [...favs, game.id];
        }
        localStorage.setItem('gacha_favs', JSON.stringify(newFavs));
        setIsFav(!isFav);
    };

    if (viewMode === 'list') {
        return (
            <Link
                href={`/juegos/${game.id}`}
                className="group flex items-center gap-4 p-3 bg-background-secondary border border-border-default-secondary rounded-2xl hover:border-border-default-default transition-all hover:shadow-md"
            >
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 border border-border-default-secondary">
                    {game.bannerUrl && (
                        <Image src={game.bannerUrl} alt={game.name} fill sizes="80px" className="object-cover transition-transform group-hover:scale-110" />
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="text-body-strong text-text-default-default truncate">{game.name}</h3>
                        <div className="flex items-center gap-1">
                            {game.platforms.slice(0, 2).map(p => (
                                <PlatformIcon key={p} platform={p} className="w-3 h-3 text-text-default-tertiary" />
                            ))}
                        </div>
                    </div>
                    <p className="text-body-small text-text-default-secondary truncate">{game.developer} • {game.genre.slice(0, 2).join(', ')}</p>
                </div>
                <div className="hidden sm:flex flex-col items-end gap-1 shrink-0">
                    <span className="text-[10px] font-bold text-text-default-tertiary uppercase tracking-wider">Versión</span>
                    <span className="text-body-small-strong text-text-default-default bg-background-tertiary px-2 py-0.5 rounded-md border border-border-default-secondary">
                        {game.currentVersion}
                    </span>
                </div>
                <button onClick={handleFavoriteClick} className={`p-2 rounded-xl transition-colors ${isFav ? 'text-amber-500' : 'text-text-default-tertiary hover:text-text-default-default'}`}>
                    <Star className="w-5 h-5" fill={isFav ? "currentColor" : "none"} />
                </button>
            </Link>
        );
    }

    return (
        <Link
            href={`/juegos/${game.id}`}
            className="
                group relative flex flex-col aspect-[4/5] rounded-3xl overflow-hidden bg-background-tertiary
                border border-border-default-secondary transition-all duration-500
                hover:border-border-default-default hover:shadow-lg hover:-translate-y-1
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
   FiltersContent Component
───────────────────────────────────────────── */
function FiltersContent({ filters, updateFilter, hasActiveFilters, clearFilters, allPlatforms, allGenres, allDevs }) {
    return (
        <div className="flex flex-col 2xl:flex-row items-stretch gap-3 w-full">
            <FilterDropdown label="Plataforma" options={allPlatforms} selected={filters.plataforma} onChange={(v) => updateFilter('plataforma', v)} />
            <FilterDropdown label="Género" options={allGenres} selected={filters.genero} onChange={(v) => updateFilter('genero', v)} />
            <FilterDropdown label="Desarrollador" options={allDevs} selected={filters.desarrollador} onChange={(v) => updateFilter('desarrollador', v)} />

            {hasActiveFilters && (
                <button
                    onClick={clearFilters}
                    className="flex items-center justify-center gap-2 h-11 px-4 shrink-0 bg-background-tertiary border border-border-default-secondary rounded-xl text-body-small-strong uppercase tracking-wider text-text-default-secondary hover:bg-background-secondary-hover hover:text-brand-default transition-all mt-auto"
                >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span className="lg:hidden text-badge">Limpiar filtros</span>
                </button>
            )}
        </div>
    );
}

/* ─────────────────────────────────────────────
   Página Principal de Juegos
───────────────────────────────────────────── */
export default function Juegos() {
    const gamesList = useMemo(() => Object.values(GAMES_DATA), []);

    const allGenres = useMemo(() => Array.from(new Set(gamesList.flatMap(g => g.genre))).sort(), [gamesList]);
    const allPlatforms = useMemo(() => Array.from(new Set(gamesList.flatMap(g => g.platforms))).sort(), [gamesList]);
    const allDevs = useMemo(() => Array.from(new Set(gamesList.map(g => g.developer))).sort(), [gamesList]);

    const [viewMode, setViewMode] = useState('grid');
    
    const sortOptions = [
        { id: 'Nuevos', label: 'Nuevos', icon: Sparkles },
        { id: 'Populares', label: 'Populares', icon: TrendingUp },
        { id: 'Actualizados', label: 'Actualizados', icon: Calendar },
        { id: 'A-Z', label: 'A-Z', icon: ArrowDownAZ }
    ];

    const filterFn = useCallback((game, filters) => {
        const matchesGenre = filters.genero.length === 0 || filters.genero.some(g => game.genre.includes(g));
        const matchesPlatform = filters.plataforma.length === 0 || filters.plataforma.some(p => game.platforms.includes(p));
        const matchesDev = filters.desarrollador.length === 0 || filters.desarrollador.includes(game.developer);
        return matchesGenre && matchesPlatform && matchesDev;
    }, []);

    const sortFn = useCallback((a, b, mode) => {
        if (mode === 'A-Z') return a.name.localeCompare(b.name);
        if (mode === 'Nuevos') return new Date(b.releaseDate.pc || b.releaseDate.android) - new Date(a.releaseDate.pc || a.releaseDate.android);
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
    } = useFilters(gamesList, {
        filterFn,
        sortFn,
        initialSort: 'Nuevos',
        initialFilters: { plataforma: [], genero: [], desarrollador: [] },
        initialVisible: 12,
        pageSize: 4
    });

    return (
        <div className="col-span-full pb-content-safe font-sans flex flex-col gap-12 sm:gap-16">
            <SectionHeader
                variant="page"
                icon={Gamepad2}
                title="Catálogo de juegos"
                subtitle="Explora y descubre todos los títulos de tu biblioteca con guías detalladas."
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
                            allPlatforms={allPlatforms}
                            allGenres={allGenres}
                            allDevs={allDevs}
                        />
                    }
                />
            </SectionHeader>

            <div className="flex flex-col gap-8">
                {visibleData.length > 0 ? (
                    <div className={`grid gap-4 sm:gap-6 ${viewMode === 'grid' ? 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5' : 'grid-cols-1'}`}>
                        {visibleData.map(game => (
                            <GameCard key={game.id} game={game} viewMode={viewMode} />
                        ))}
                    </div>
                ) : (
                    <EmptyState 
                        title="No se encontraron juegos"
                        message="Intenta ajustar los filtros para encontrar lo que buscas."
                        onClear={clearFilters}
                    />
                )}

                {hasMore && (
                    <div className="flex justify-center pt-8">
                        <button
                            onClick={loadMore}
                            className="group bg-background-secondary border border-border-default-secondary px-8 py-3 rounded-xl text-body-strong text-text-default-default transition-all hover:bg-background-tertiary active:scale-95 flex items-center gap-2"
                        >
                            Ver más juegos
                            <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}