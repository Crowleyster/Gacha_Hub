"use client";

import { useState, useMemo, useCallback } from 'react';
import { Newspaper, RotateCcw, Sparkles, TrendingUp } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';
import FilterDropdown from '@/components/ui/FilterDropdown';
import PageControls from '@/components/PageControls';
import EmptyState from '@/components/ui/EmptyState';
import NewsCard from '@/components/NewsCard';
import { useFilters } from '@/hooks/useFilters';

/* ─────────────────────────────────────────────
   Componente de Filtros Interno
───────────────────────────────────────────── */
function FiltersContent({ filters, updateFilter, hasActiveFilters, clearFilters, allGames, allTags }) {
    return (
        <div className="flex flex-col lg:flex-row items-stretch gap-3 w-full">
            <FilterDropdown 
                label="Juego" 
                options={allGames.map(g => g.id)} 
                selected={filters.juego} 
                onChange={(v) => updateFilter('juego', v)}
                displayFormatter={(id) => {
                    const game = allGames.find(g => g.id === id);
                    return game ? game.shortName || id : id;
                }}
            />
            <FilterDropdown 
                label="Categoría" 
                options={allTags} 
                selected={filters.categoria} 
                onChange={(v) => updateFilter('categoria', v)} 
            />

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

export default function NoticiasClient({ initialNews, initialGames }) {
    // 1. Data Preparation
    const allNews = useMemo(() => initialNews, [initialNews]);
    const allGames = useMemo(() => initialGames, [initialGames]);
    const allTags = useMemo(() => Array.from(new Set(allNews.map(n => n.tag))).sort(), [allNews]);

    const sortOptions = [
        { id: 'nuevos', label: 'Nuevos', icon: Sparkles },
        { id: 'populares', label: 'Populares', icon: TrendingUp }
    ];

    // 2. Logic Hooks
    const filterFn = useCallback((news, filters) => {
        const matchesGame = filters.juego.length === 0 || filters.juego.includes(news.gameId);
        const matchesTag = filters.categoria.length === 0 || filters.categoria.includes(news.tag);
        return matchesGame && matchesTag;
    }, []);

    const sortFn = useCallback((a, b, mode) => {
        if (mode === 'nuevos') return new Date(b.date) - new Date(a.date);
        // 'populares' fallback to random/id for now as it's mock data
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
    } = useFilters(allNews, {
        filterFn,
        sortFn,
        initialSort: 'nuevos',
        initialFilters: { juego: [], categoria: [] },
        initialVisible: 11, // 1 Hero + 10 grid items
        pageSize: 6
    });

    const [viewMode, setViewMode] = useState('grid');

    return (
        <div className="col-span-full pb-content-safe font-sans flex flex-col gap-12 sm:gap-16">
            <SectionHeader
                variant="page"
                icon={Newspaper}
                title="Todas las noticias"
                subtitle="Mantente al día con las últimas actualizaciones, banners y guías de la industria."
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
                            allGames={allGames}
                            allTags={allTags}
                        />
                    }
                />
            </SectionHeader>

            <div className="flex flex-col gap-8">
                {visibleData.length > 0 ? (
                    <>
                        {/* 1. SECCIÓN HERO (Solo si hay noticias) */}
                        <div className="h-[420px] md:h-[520px]">
                            {(() => {
                                const hero = visibleData[0];
                                return (
                                    <NewsCard
                                        key={`hero-${hero.gameId}-${hero.id}`}
                                        title={hero.title}
                                        tag={hero.tag}
                                        gameIconUrl={hero.gameIconUrl}
                                        imageUrl={hero.imageUrl}
                                        date={hero.date}
                                        isHero={true}
                                        href={`/noticias/${hero.id}`}
                                    />
                                );
                            })()}
                        </div>

                        {/* 2. GRILLA / LISTA */}
                        <div className={`grid gap-4 sm:gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                            {visibleData.slice(1).map((news) => (
                                    <NewsCard
                                        key={`${news.gameId}-${news.id}`}
                                        title={news.title}
                                        tag={news.tag}
                                        gameIconUrl={news.gameIconUrl}
                                        imageUrl={news.imageUrl}
                                        date={news.date}
                                        viewMode={viewMode}
                                        href={`/noticias/${news.id}`}
                                        className="h-[280px] sm:h-[320px] lg:h-[340px]"
                                    />
                            ))}
                        </div>
                    </>
                ) : (
                    <EmptyState 
                        title="No se encontraron noticias"
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
                            Ver más noticias
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
