"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Gamepad2, Monitor, Smartphone, Search, FilterX, X } from 'lucide-react';
import { GAMES_DATA } from '@/lib/games-data';

/* ─── Helper: Icono de Plataforma ───────────────────────────────────── */
function PlatformIcon({ platform }) {
    if (platform === 'PC' || platform.includes('PS')) {
        return <Monitor className="w-4 h-4 text-white" />;
    }
    return <Smartphone className="w-4 h-4 text-white" />;
}

/* ─── Componente: Tarjeta de Juego ──────────────────────────────────── */
function GameCard({ game }) {
    return (
        <Link
            href={`/juegos/${game.id}`}
            className="
                group relative 
                aspect-[16/10] sm:aspect-[16/11] md:aspect-[16/10]
                overflow-hidden rounded-2xl 
                border border-border-default-secondary
                transition-all duration-300 
                shadow-200 hover:shadow-400
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-default
            "
        >
            {/* Imagen de Fondo */}
            {game.bannerUrl && (
                <img
                    src={game.bannerUrl}
                    alt={game.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
            )}

            {/* Scrim: Degradado oscuro para contraste */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

            {/* Capa de Contenido */}
            <div className="absolute inset-0 z-10 flex flex-col justify-between p-4">
                
                {/* Fila Superior */}
                <div className="flex items-center justify-between gap-3 text-white">
                    <span className="truncate pr-2 text-body-small">
                        {game.developer}
                    </span>
                    <div className="shrink-0 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-border-default-secondary text-body-code text-white">
                        v{game.currentVersion}
                    </div>
                </div>

                {/* Fila Inferior */}
                <div className="flex items-end justify-between gap-4 mt-auto">
                    <div className="flex items-center gap-3">
                        {game.iconUrl && (
                            <img
                                src={game.iconUrl}
                                alt={`${game.name} icon`}
                                className="w-11 h-11 rounded-xl shrink-0 object-cover shadow-400"
                            />
                        )}
                        <h2 className="text-white text-heading line-clamp-2 leading-tight">
                            {game.name}
                        </h2>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 pb-1">
                        {game.platforms.slice(0, 3).map(p => (
                            <span key={p} title={p}>
                                <PlatformIcon platform={p} />
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </Link>
    );
}

/* ─── Página Principal de Juegos con Filtros ───────────────────────── */
export default function Juegos() {
    // 1. Preparar los datos
    const gamesList = Object.values(GAMES_DATA);

    // 2. Extraer géneros y plataformas únicos automáticamente de los datos
    const allGenres = useMemo(() => {
        const genres = new Set();
        gamesList.forEach(game => game.genre.forEach(g => genres.add(g)));
        return ['Todos', ...Array.from(genres).sort()];
    }, [gamesList]);

    const allPlatforms = useMemo(() => {
        const platforms = new Set();
        gamesList.forEach(game => game.platforms.forEach(p => platforms.add(p)));
        return ['Todas', ...Array.from(platforms).sort()];
    }, [gamesList]);

    // 3. Estados para los filtros
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('Todos');
    const [selectedPlatform, setSelectedPlatform] = useState('Todas');

    // 4. Lógica de Filtrado (se ejecuta automáticamente cuando cambia un estado)
    const filteredGames = useMemo(() => {
        return gamesList.filter(game => {
            // Filtro por búsqueda de texto
            const matchesSearch = game.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                  game.shortName.toLowerCase().includes(searchQuery.toLowerCase());
            
            // Filtro por género
            const matchesGenre = selectedGenre === 'Todos' || game.genre.includes(selectedGenre);
            
            // Filtro por plataforma
            const matchesPlatform = selectedPlatform === 'Todas' || game.platforms.includes(selectedPlatform);

            return matchesSearch && matchesGenre && matchesPlatform;
        });
    }, [gamesList, searchQuery, selectedGenre, selectedPlatform]);

    // 5. Función para limpiar filtros
    const clearFilters = () => {
        setSearchQuery('');
        setSelectedGenre('Todos');
        setSelectedPlatform('Todas');
    };

    return (
        <main className="col-span-full space-y-8 pb-content-safe font-sans">
            
            {/* ─── Encabezado ─── */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-background-secondary rounded-xl">
                        <Gamepad2 className="w-6 h-6 text-text-brand-default" />
                    </div>
                    <h1 className="text-title-page text-text-default-default">
                        Catálogo de Juegos
                    </h1>
                </div>
                <p className="text-body-base text-text-default-secondary max-w-2xl">
                    Explora y filtra todos los títulos disponibles en la plataforma. Encuentra tu próximo gacha favorito según tu plataforma o estilo de juego.
                </p>
            </div>

            {/* ─── Barra de Herramientas: Búsqueda y Filtros ─── */}
            <section className="flex flex-col gap-4 sticky top-0 z-20 py-2 bg-background-default/80 backdrop-blur-md">
                
                {/* Buscador de texto */}
                <div className="relative w-full md:max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-default-tertiary" />
                    <input 
                        type="text" 
                        placeholder="Buscar por nombre o siglas..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-12 pl-12 pr-10 rounded-xl border border-border-default-default bg-background-tertiary text-text-default-default text-body-base focus:outline-none focus:ring-2 focus:ring-brand-default transition-all"
                    />
                    {searchQuery && (
                        <button 
                            onClick={() => setSearchQuery('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-text-default-tertiary hover:text-text-default-default transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    )}
                </div>

                {/* Contenedor de "Chips" (Géneros y Plataformas) */}
                <div className="flex flex-col gap-3">
                    
                    {/* Chips de Género */}
                    <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
                        <span className="text-body-small-strong text-text-default-secondary shrink-0 mr-2">Género:</span>
                        {allGenres.map(genre => (
                            <button
                                key={`genre-${genre}`}
                                onClick={() => setSelectedGenre(genre)}
                                className={`
                                    shrink-0 px-4 py-1.5 rounded-full text-body-small-strong transition-colors
                                    ${selectedGenre === genre 
                                        ? 'bg-brand-default text-text-brand-on' 
                                        : 'bg-background-secondary text-text-default-secondary hover:bg-background-secondary-hover'
                                    }
                                `}
                            >
                                {genre}
                            </button>
                        ))}
                    </div>

                    {/* Chips de Plataforma */}
                    <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
                        <span className="text-body-small-strong text-text-default-secondary shrink-0 mr-2">Plataforma:</span>
                        {allPlatforms.map(platform => (
                            <button
                                key={`plat-${platform}`}
                                onClick={() => setSelectedPlatform(platform)}
                                className={`
                                    shrink-0 px-4 py-1.5 rounded-full text-body-small-strong transition-colors
                                    ${selectedPlatform === platform 
                                        ? 'bg-brand-default text-text-brand-on' 
                                        : 'bg-background-secondary text-text-default-secondary hover:bg-background-secondary-hover'
                                    }
                                `}
                            >
                                {platform}
                            </button>
                        ))}
                    </div>

                </div>
            </section>

            {/* ─── Cuadrícula de Resultados ─── */}
            {filteredGames.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredGames.map((game) => (
                        <GameCard key={game.id} game={game} />
                    ))}
                </div>
            ) : (
                /* ─── Empty State (Sin Resultados) ─── */
                <div className="flex flex-col items-center justify-center py-20 gap-4 text-center border-2 border-dashed border-border-default-secondary rounded-2xl">
                    <div className="p-4 bg-background-secondary rounded-full">
                        <FilterX className="w-8 h-8 text-text-default-tertiary" />
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-heading text-text-default-default">No se encontraron juegos</h3>
                        <p className="text-body-base text-text-default-secondary">
                            Intenta ajustar los filtros de búsqueda o prueba con otro nombre.
                        </p>
                    </div>
                    <button 
                        onClick={clearFilters}
                        className="mt-2 px-6 py-2 rounded-lg bg-background-secondary text-text-default-default hover:bg-background-secondary-hover text-body-small-strong transition-colors"
                    >
                        Limpiar todos los filtros
                    </button>
                </div>
            )}

        </main>
    );
}
