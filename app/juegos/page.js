import Link from 'next/link';
import { Gamepad2, Monitor, Smartphone } from 'lucide-react';
import { GAMES_DATA } from '@/lib/games-data';

/* ─── Helper: Icono de Plataforma (Versión Minimalista) ─────────── */
// Devuelve iconos simplificados para integrarse sobre la imagen
function PlatformIcon({ platform }) {
    if (platform === 'PC' || platform.includes('PS')) {
        return <Monitor className="w-4 h-4 text-white/70" />;
    }
    return <Smartphone className="w-4 h-4 text-white/70" />;
}

/* ─── Componente: Tarjeta de Juego (Rediseño Altamente Visual) ─── */
function GameCard({ game }) {
    return (
        <Link
            href={`/juegos/${game.id}`}
            className="
                group relative 
                aspect-[16/10] sm:aspect-[16/11] md:aspect-[16/10]
                overflow-hidden rounded-2xl 
                border border-white/10 dark:border-white/5
                transition-all duration-300 
                shadow-200 hover:shadow-400
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-default
            "
        >
            {/* 1. Imagen de Fondo (Cubre el 100% de la tarjeta) */}
            {game.bannerUrl && (
                <img
                    src={game.bannerUrl}
                    alt={game.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
            )}

            {/* 2. Scrim (Degradado oscuro inferior para garantizar lectura) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

            {/* 3. Capa de Contenido (Superpuesta sobre la imagen) */}
            <div className="absolute inset-0 z-10 flex flex-col justify-between p-4">
                
                {/* Fila Superior: Desarrollador y Versión */}
                <div className="flex items-center justify-between gap-3 text-white/90 text-body-small">
                    <span className="truncate pr-2 font-medium drop-shadow-md">
                        {game.developer}
                    </span>
                    <div className="shrink-0 px-2 py-0.5 rounded-md bg-black/50 backdrop-blur-md border border-white/10 text-body-small-strong font-mono drop-shadow-md">
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
                                className="w-11 h-11 rounded-xl shrink-0 object-cover border-2 border-white/20 shadow-black/50 drop-shadow-lg"
                            />
                        )}
                        <h2 className="text-white text-heading font-bold line-clamp-2 leading-tight drop-shadow-xl shadow-black/80">
                            {game.name}
                        </h2>
                    </div>

                    {/* Grupo Derecho: Plataformas Simplificadas */}
                    <div className="flex items-center gap-2 shrink-0 pb-1">
                        {game.platforms.slice(0, 3).map(p => (
                            <span key={p} title={p} className="drop-shadow-lg">
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

            {/* Cuadrícula Automatizada (Diferentes columnas según tamaño de pantalla) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {gamesList.map((game) => (
                    <GameCard key={game.id} game={game} />
                ))}
            </div>

        </main>
    );
}
