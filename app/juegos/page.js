import Link from 'next/link';
import { Gamepad2, Monitor, Smartphone } from 'lucide-react';
import { GAMES_DATA } from '@/lib/games-data';

/* ─── Helper: Icono de Plataforma ─────────── */
function PlatformIcon({ platform }) {
    if (platform === 'PC' || platform.includes('PS')) {
        // En lugar de text-white/70, forzamos blanco base para overlays
        return <Monitor className="w-4 h-4 text-white" />;
    }
    return <Smartphone className="w-4 h-4 text-white" />;
}

/* ─── Componente: Tarjeta de Juego ─── */
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

            {/* Scrim: Usamos negro puro para garantizar contraste bajo texto blanco */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

            {/* Capa de Contenido */}
            <div className="absolute inset-0 z-10 flex flex-col justify-between p-4">
                
                {/* Fila Superior: Desarrollador y Versión */}
                <div className="flex items-center justify-between gap-3 text-white">
                    {/* Se eliminó font-medium arbitrario, se usa preset body-small */}
                    <span className="truncate pr-2 text-body-small">
                        {game.developer}
                    </span>
                    {/* Se eliminó font-mono, se usa text-body-code del SDS */}
                    <div className="shrink-0 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-border-default-secondary text-body-code text-white">
                        v{game.currentVersion}
                    </div>
                </div>

                {/* Fila Inferior: Icono, Título y Plataformas */}
                <div className="flex items-end justify-between gap-4 mt-auto">
                    
                    {/* Grupo Izquierdo: Icono + Título */}
                    <div className="flex items-center gap-3">
                        {game.iconUrl && (
                            <img
                                src={game.iconUrl}
                                alt={`${game.name} icon`}
                                /* Se reemplazó shadow-black por shadow-400 del SDS */
                                className="w-11 h-11 rounded-xl shrink-0 object-cover shadow-400"
                            />
                        )}
                        {/* Se eliminó font-bold, el preset text-heading ya lo cubre */}
                        <h2 className="text-white text-heading line-clamp-2 leading-tight">
                            {game.name}
                        </h2>
                    </div>

                    {/* Grupo Derecho: Plataformas */}
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

/* ─── Página Principal de Juegos ──────────────────────────────────── */
export default function Juegos() {
    const gamesList = Object.values(GAMES_DATA);

    return (
        <main className="col-span-full space-y-8 pb-content-safe font-sans">
            
            {/* Encabezado de la página */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    {/* Se eliminó el modificador bg-brand-default/10 y dark:bg-white/10 prohibidos */}
                    <div className="p-2 bg-background-secondary rounded-xl">
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

            {/* Cuadrícula Automatizada */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {gamesList.map((game) => (
                    <GameCard key={game.id} game={game} />
                ))}
            </div>

        </main>
    );
}
