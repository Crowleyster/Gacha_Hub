"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, SlidersHorizontal, ChevronDown, Check, Calendar, RotateCcw } from 'lucide-react';
import { GAMES_DATA } from '@/lib/games-data';

import NewsCard from '@/components/NewsCard';

export default function Noticias() {
    // 1. Estados
    const [selectedGame, setSelectedGame] = useState('Todos');
    const [selectedTag, setSelectedTag] = useState('Todas');
    const [viewMode, setViewMode] = useState('nuevos'); // 'nuevos' | 'populares'
    const [isFilterExpanded, setIsFilterExpanded] = useState(false);
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
        return ['Todas', ...Array.from(tags)];
    }, [allNews]);

    // 3. Filtrado y Ordenamiento
    const filteredAndSortedNews = useMemo(() => {
        let result = allNews.filter(news => {
            const matchesGame = selectedGame === 'Todos' || news.gameId === selectedGame;
            const matchesTag = selectedTag === 'Todas' || news.tag === selectedTag;
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
    }, [allNews, selectedGame, selectedTag, viewMode]);

    const visibleNews = filteredAndSortedNews.slice(0, visibleCount);

    const clearFilters = () => {
        setSelectedGame('Todos');
        setSelectedTag('Todas');
        setViewMode('nuevos');
    };

    const hasActiveFilters = selectedGame !== 'Todos' || selectedTag !== 'Todas' || viewMode !== 'nuevos';

    return (
        <main className="col-span-full space-y-8 pb-content-safe font-sans text-text-default-default">
            {/* Header */}
            <h1 className="text-title-page">Todas las noticias</h1>

            {/* Barra de Filtros PREMIUM */}
            <div className="space-y-4">
                {/* Desktop: Fila Única | Mobile: Grid */}
                <div className="flex flex-col lg:flex-row lg:items-end gap-4 bg-background-secondary border border-border-default-secondary p-4 rounded-2xl transition-all shadow-sm">
                    
                    {/* Mobile Filter Toggle Button */}
                    <button 
                        onClick={() => setIsFilterExpanded(!isFilterExpanded)}
                        className="lg:hidden flex items-center justify-center gap-2 h-[42px] px-4 w-full sm:w-auto bg-background-tertiary border border-border-default-secondary rounded-xl shadow-sm hover:bg-background-secondary-hover transition-colors text-body-small-strong text-text-default-secondary"
                    >
                        <SlidersHorizontal className="w-5 h-5" /> Combinar Filtros
                    </button>

                    {/* Filtros Expandibles (Desktop siempre visible, Mobile toggleable) */}
                    <div className={`${isFilterExpanded ? 'flex' : 'hidden'} lg:flex flex-col sm:flex-row items-stretch gap-4 flex-1`}>
                        {/* Selector de Juego */}
                        <div className="flex flex-col gap-1.5 flex-1 min-w-[140px]">
                            <span className="text-[10px] uppercase tracking-wider font-bold text-text-default-tertiary px-1">Juego</span>
                            <div className="relative">
                                <select
                                    value={selectedGame}
                                    onChange={(e) => setSelectedGame(e.target.value)}
                                    className="w-full h-[42px] appearance-none bg-background-tertiary border border-border-default-secondary rounded-xl px-3 text-body-small-strong outline-none cursor-pointer focus:border-border-default-default transition-all"
                                >
                                    <option value="Todos">Todos</option>
                                    {Object.values(GAMES_DATA).map(game => (
                                        <option key={game.id} value={game.id}>{game.name}</option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-default-tertiary pointer-events-none" />
                            </div>
                        </div>

                        {/* Selector de Tipo */}
                        <div className="flex flex-col gap-1.5 flex-1 min-w-[140px]">
                            <span className="text-[10px] uppercase tracking-wider font-bold text-text-default-tertiary px-1">Tipo de contenido</span>
                            <div className="relative">
                                <select
                                    value={selectedTag}
                                    onChange={(e) => setSelectedTag(e.target.value)}
                                    className="w-full h-[42px] appearance-none bg-background-tertiary border border-border-default-secondary rounded-xl px-3 text-body-small-strong outline-none cursor-pointer focus:border-border-default-default transition-all"
                                >
                                    {allTags.map(tag => (
                                        <option key={tag} value={tag}>{tag}</option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-default-tertiary pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* Toggles y Limpiar */}
                    <div className="flex items-center gap-3 mt-auto lg:mt-0 w-full lg:w-auto">
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
                <div className="flex flex-col items-center justify-center py-24 text-text-default-tertiary italic gap-4">
                    <p className="text-body-base">No se encontraron resultados para los filtros seleccionados.</p>
                    <button onClick={clearFilters} className="text-text-brand-default not-italic font-medium hover:underline">
                        Limpiar todos los filtros
                    </button>
                </div>
            )}

            {/* Botón Cargar Más */}
            {visibleCount < filteredAndSortedNews.length && (
                <div className="flex justify-center pt-8">
                    <button
                        onClick={() => setVisibleCount(prev => prev + 6)}
                        className="group w-full max-w-2xl bg-background-secondary border border-border-default-secondary rounded-xl py-3 text-body-small-strong hover:bg-background-tertiary transition-all flex items-center justify-center gap-2 shadow-sm"
                    >
                        Cargar más noticias
                        <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                    </button>
                </div>
            )}
        </main>
    );
}

