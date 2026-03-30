"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, SlidersHorizontal, ChevronDown, Check, Calendar, RotateCcw, Filter, Newspaper } from 'lucide-react';
import { GAMES_DATA } from '@/lib/games-data';
import FilterDropdown from '@/components/ui/FilterDropdown';
import MobileFilterModal from '@/components/ui/MobileFilterModal';
import SectionHeader from '@/components/SectionHeader';

import NewsCard from '@/components/NewsCard';
import EmptyState from '@/components/ui/EmptyState';

export default function Noticias() {
    // 1. Estados
    const [selectedGames, setSelectedGames] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [viewMode, setViewMode] = useState('nuevos'); // 'nuevos' | 'populares'
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const [visibleCount, setVisibleCount] = useState(6);

    // 2. Data
    const allNews = useMemo(() => {
        const newsArray = [];
        Object.values(GAMES_DATA).forEach(game => {
            if (game.news) {
                game.news.forEach(n => newsArray.push({ ...n, gameId: game.id }));
            }
        });
        return newsArray;
    }, []);

    const allTags = useMemo(() => {
        const tags = new Set();
        allNews.forEach(news => {
            if (news.tag) tags.add(news.tag);
        });
        return Array.from(tags).sort();
    }, [allNews]);

    // 3. Filtrado y Ordenamiento
    const filteredAndSortedNews = useMemo(() => {
        let result = allNews.filter(news => {
            const matchesGame = selectedGames.length === 0 || selectedGames.includes(news.gameId);
            const matchesTag = selectedTags.length === 0 || selectedTags.includes(news.tag);
            return matchesGame && matchesTag;
        });

        // Ordenamiento
        if (viewMode === 'nuevos') {
            result.sort((a, b) => new Date(b.date) - new Date(a.date));
        } else {
            // Mock de populares: Orden determinista por longitud de título
            result.sort((a, b) => b.title.length - a.title.length);
        }

        return result;
    }, [allNews, selectedGames, selectedTags, viewMode]);

    const visibleNews = filteredAndSortedNews.slice(0, visibleCount);

    const clearFilters = () => {
        setSelectedGames([]);
        setSelectedTags([]);
    };

    const hasActiveFilters = selectedGames.length > 0 || selectedTags.length > 0;

    const getGameName = (id) => GAMES_DATA[id]?.name || id;
    const gameOptions = useMemo(() => Object.values(GAMES_DATA).map(g => g.id), []);

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
                label="Tipo de contenido"
                options={allTags}
                selected={selectedTags}
                onChange={setSelectedTags}
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
                icon={Newspaper}
                title="Todas las noticias"
                subtitle="Mantente al día con las últimas novedades, guías y parches de tus juegos favoritos."
            >
                {/* Barra de Filtros PREMIUM */}
                <div className="space-y-4">
                    {/* Desktop: Fila Única | Mobile: Grid */}
                    <div className="flex flex-col lg:flex-row lg:items-end gap-4 bg-background-secondary border border-border-default-secondary p-4 rounded-2xl transition-all shadow-sm">
                        {/* Mobile Filter Toggle Button */}
                        <button
                            disabled
                            title="Próximamente"
                            className="lg:hidden flex items-center justify-center gap-2 h-[42px] px-4 w-full sm:w-auto bg-background-tertiary border border-border-default-secondary rounded-xl shadow-sm opacity-50 cursor-not-allowed text-body-small-strong text-text-default-secondary relative"
                        >
                            <Filter className="w-5 h-5" /> Filtrar
                            {hasActiveFilters && (
                                <span className="w-2.5 h-2.5 bg-brand-default rounded-full border border-background-default absolute top-2 right-2"></span>
                            )}
                        </button>

                        {/* Filtros Expandibles (Desktop siempre visible) */}
                        <div className="hidden lg:flex flex-col items-stretch gap-4 flex-1">
                            <FiltersContent />
                        </div>

                        {/* Toggles Ordenamiento */}
                        <div className="flex items-center gap-3 mt-auto lg:mt-0 w-full lg:w-auto self-end">
                            <div className="flex flex-col gap-1.5 w-full">
                                <span className="hidden lg:block text-[10px] uppercase tracking-wider font-bold text-text-default-tertiary px-1">Orden</span>
                                <div className="flex items-center bg-background-tertiary p-1 rounded-xl border border-border-default-secondary h-[42px] flex-1 lg:flex-none">
                                    <button
                                        onClick={() => setViewMode('nuevos')}
                                        className={`flex items-center justify-center gap-2 flex-1 lg:flex-none px-4 h-full rounded-lg transition-all ${viewMode === 'nuevos' ? 'bg-background-default text-text-default-default shadow-sm' : 'text-text-default-tertiary hover:text-text-default-default'}`}
                                    >
                                        {viewMode === 'nuevos' && <Check className="w-3.5 h-3.5" />}
                                        <span className="text-body-small-strong">Nuevos</span>
                                    </button>
                                    <button
                                        onClick={() => setViewMode('populares')}
                                        className={`flex items-center justify-center gap-2 flex-1 lg:flex-none px-4 h-full rounded-lg transition-all ${viewMode === 'populares' ? 'bg-background-default text-text-default-default shadow-sm' : 'text-text-default-tertiary hover:text-text-default-default'}`}
                                    >
                                        {viewMode === 'populares' && <Check className="w-3.5 h-3.5" />}
                                        <span className="text-body-small-strong">Populares</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionHeader>

            <MobileFilterModal isOpen={isMobileFilterOpen} onClose={() => setIsMobileFilterOpen(false)} title="Filtros de Noticias">
                <FiltersContent />
            </MobileFilterModal>

            {/* Grid de Resultados */}
            {visibleNews.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[280px]">
                    {visibleNews.map(news => {
                        const game = GAMES_DATA[news.gameId];
                        return (
                            <NewsCard
                                key={`${news.gameId}-${news.id}`}
                                title={news.title}
                                tag={news.tag}
                                gameIconUrl={game?.iconUrl}
                                imageUrl={news.imageUrl || game?.bannerUrl}
                                date={news.date}
                                isSmall={true}
                                href={`/noticias/${news.id}`}
                            />
                        );
                    })}
                </div>
            ) : (
                <EmptyState onClear={clearFilters} />
            )}

            {/* Botón Cargar Más */}
            {visibleCount < filteredAndSortedNews.length && (
                <div className="flex flex-col items-center gap-4 pt-8">
                    <p className="text-body-small text-text-default-tertiary">
                        Mostrando {visibleNews.length} de {filteredAndSortedNews.length} noticias
                    </p>
                    <button
                        onClick={() => setVisibleCount(prev => prev + 6)}
                        className="group w-full max-w-2xl bg-background-secondary border border-border-default-secondary rounded-xl py-3 text-body-small-strong text-text-default-default hover:bg-background-secondary-hover hover:border-brand-default/50 transition-all flex items-center justify-center gap-2 shadow-sm"
                    >
                        Cargar más noticias
                        <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                    </button>
                </div>
            )}
        </div>
    );
}

