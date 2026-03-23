"use client";

import Link from 'next/link';
import { Gamepad2, Monitor, Smartphone, ChevronRight } from 'lucide-react';
import { GAMES_DATA } from '@/lib/games-data';

/* ─── Helper: Icono de Plataforma ───────────────────────────────────── */
// Devuelve un icono distinto dependiendo si es PC/Consola o Móvil
function PlatformIcon({ platform }) {
    if (platform === 'PC' || platform.includes('PS')) {
        return <Monitor className="w-4 h-4" />;
    }
    return <Smartphone className="w-4 h-4" />;
}

/* ─── Componente: Tarjeta de Juego ──────────────────────────────────── */
function GameCard({ game }) {
    return (
        <Link
            href={`/juegos/${game.id}`}
            className="
                group flex flex-col 
                bg-background-secondary border border-border-default-secondary 
                rounded-2xl overflow-hidden 
                hover:border-border-default-default transition-all duration-300 
                shadow-100 hover:shadow-300
            "
        >
            {/* 1. Cabecera (Banner + Icono) */}
            <div className="relative h-36 w-full overflow-hidden bg-background-tertiary">
                {game.bannerUrl && (
                    <img
                        src={game.bannerUrl}
                        alt={game.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                )}
                {/* Degradado oscuro para garantizar lectura del texto blanco */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* Badge de versión */}
                <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-black/50 backdrop-blur-md border border-white/10 text-white text-body-small-strong">
                    v{game.currentVersion}
                </div>

                {/* Icono del juego y Título */}
                <div className="absolute bottom-3 left-3 flex items-center gap-3 pr-3">
                    {game.iconUrl && (
                        <img
                            src={game.iconUrl}
                            alt={`${game.name} icon`}
                            className="w-12 h-12 rounded-xl border-2 border-white/20 shadow-400 shrink-0 object-cover"
                        />
                    )}
                    <h2 className="text-white text-heading font-bold line-clamp-1 leading-tight shadow-black/50 drop-shadow-md">
                        {game.name}
                    </h2>
                </div>
            </div>

            {/* 2. Cuerpo de Información */}
            <div className="flex flex-col p-4 gap-3 flex-1">
                {/* Metadatos: Desarrollador y Plataformas */}
                <div className="flex items-center justify-between text-text-default-secondary">
                    <span className="text-body-small truncate pr-2">{game.developer}</span>
                    <div className="flex items-center gap-1.5 shrink-0">
                        {game.platforms.slice(0, 3).map(p => (
                            <span key={p} title={p}>
                                <PlatformIcon platform={p} />
                            </span>
                        ))}
                        {game.platforms.length > 3 && (
                            <span className="text-body-small">+{game.platforms.length - 3}</span>
                        )}
                    </div>
                </div>

                {/* Descripción Corta */}
                <p className="text-body-small text-text-default-secondary line-clamp-2 leading-relaxed">
                    {game.description}
                </p>

                {/* Botón de acción invisible (se activa visualmente al hacer hover en la tarjeta) */}
                <div className="mt-auto pt-4 flex items-center justify-between text-text-brand-default font-semibold text-body-small-strong transition-colors group-hover:text-text-brand-default">
                    Ver detalles
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
            </div>
        </Link>
    );
}

/* ─── Página Principal de Juegos ────────────────────────────────────── */
export default function Juegos() {
    // Convertimos el objeto GAMES_DATA en un array para poder iterarlo
    const gamesList = Object.values(GAMES_DATA);

    return (
        <main className="col-span-full space-y-8 pb-content-safe font-sans">
            
            {/* Encabezado de la página */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-brand-default/10 rounded-xl dark:bg-white/10">
                        <Gamepad2 className="w-6 h-6 text-text-brand-default" />
                    </div>
                    <h1 className="text-title-page text-text-default-default">
                        Directorio de Juegos
                    </h1>
                </div>
                <p className="text-body-base text-text-default-secondary max-w-2xl">
                    Explora todos los títulos disponibles en la plataforma. Accede a las últimas noticias, eventos activos y códigos de canje de tus gachas favoritos.
                </p>
            </div>

            {/* Cuadrícula (1 col en móvil, 2 en tablet, 3-4 en desktop) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {gamesList.map((game) => (
                    <GameCard key={game.id} game={game} />
                ))}
            </div>

        </main>
    );
}
