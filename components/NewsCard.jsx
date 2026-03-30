import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

/**
 * NewsCard Component
 * 
 * Modular component for the Bento Grid news tiles.
 * 
 * @param {string} title - The news headline
 * @param {string} tag - category/type of news (e.g. "EVENTO", "UPDATE")
 * @param {string} gameIconUrl - URL for the small circular game avatar
 * @param {string} imageUrl - Main background image URL
 * @param {string} date - ISO date string for news metadata
 * @param {boolean} isHero - Whether this is the main Card-1 (affects typography)
 * @param {boolean} isSmall - Whether this is a small card (affects typography)
 * @param {string} href - Destination URL (defaults to /noticias)
 */
export default function NewsCard({
    title,
    tag,
    gameIconUrl,
    imageUrl,
    date,
    isHero = false,
    isSmall = false,
    href = "/noticias"
}) {
    return (
        <Link
            href={href}
            className="
                group relative block w-full h-full rounded-[16px] overflow-hidden cursor-pointer
                border-2 border-transparent transition-all duration-300
                hover:border-border-default-default hover:shadow-lg hover:-translate-y-1
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
            "
        >
            <article className="w-full h-full">
                {/* 1. Imagen de Fondo */}
                <img
                    src={imageUrl}
                    alt={title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* 2. Scrims (Gradientes) */}
                <div className="
                    absolute inset-0 
                    bg-gradient-to-t from-black/90 via-black/40 to-transparent
                    transition-opacity duration-500
                    group-hover:opacity-0
                " />

                <div className="
                    absolute inset-0 
                    bg-gradient-to-t from-black via-black/80 to-transparent
                    opacity-0 transition-opacity duration-500
                    group-hover:opacity-100
                " />

                {/* 3. Contenido (UI Layer) */}
                <div className="
                    relative h-full w-full flex flex-col justify-end
                    p-4 sm:p-5 md:p-6
                    gap-[4px]
                    transition-transform duration-300
                    group-hover:-translate-y-2
                ">
                    {/* Parte Inferior: Icono + Tag + Fecha */}
                    <div className="flex items-center gap-3">
                        {gameIconUrl && (
                            <div className="w-8 h-8 rounded-full overflow-hidden border border-border-default-default/20 shadow-400 shrink-0">
                                <img
                                    src={gameIconUrl}
                                    alt={`Icono de ${title}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}
                        <div className="flex items-center gap-2">
                            <span className="bg-black/50 backdrop-blur-sm text-white text-[10px] sm:text-body-small-strong p-1.5 px-2 rounded-md leading-none uppercase tracking-wider">
                                {tag}
                            </span>
                        </div>
                    </div>

                    {/* Parte Inferior: Titular (Máximo 2 líneas) */}
                    <h3 className={`
                        text-white transition-colors duration-300
                        line-clamp-2
                        ${isHero
                            ? 'text-heading md:text-subtitle lg:text-title-page'
                            : isSmall
                                ? 'text-body-strong lg:text-subheading-strong'
                                : 'text-body-strong md:text-subheading-strong'
                        }
                    `}>
                        {title}
                    </h3>
                    
                    {date && (
                        <div className="text-white/60 text-[10px] sm:text-body-small font-medium drop-shadow-sm mt-1">
                            {new Date(date).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'UTC' })}
                        </div>
                    )}
                </div>
            </article>
        </Link>
    );
}
