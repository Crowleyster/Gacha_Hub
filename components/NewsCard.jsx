import { ArrowRight } from 'lucide-react';

/**
 * NewsCard Component
 * 
 * Modular component for the Bento Grid news tiles.
 * 
 * @param {string} title - The news headline
 * @param {string} tag - category/type of news (e.g. "EVENTO", "UPDATE")
 * @param {string} gameIconUrl - URL for the small circular game avatar
 * @param {string} imageUrl - Main background image URL
 * @param {boolean} isHero - Whether this is the main Card-1 (affects typography)
 * @param {boolean} isSmall - Whether this is a small card (affects typography)
 */
export default function NewsCard({
    title,
    tag,
    gameIconUrl,
    imageUrl,
    isHero = false,
    isSmall = false
}) {
    return (
        <article
            tabIndex={0}
            role="button"
            className="
                group relative w-full h-full rounded-[16px] overflow-hidden cursor-pointer
                border-2 border-transparent transition-all duration-300
                hover:border-border-default-default
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
            "
        >
            {/* 1. Imagen de Fondo */}
            <img
                src={imageUrl}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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
                p-6
                gap-[4px]
                transition-transform duration-300
                group-hover:-translate-y-2
            ">
                {/* Parte Inferior: Icono + Tag */}
                <div className="flex items-center gap-3">
                    {gameIconUrl && (
                        <div className="w-[32px] h-[32px] rounded-full overflow-hidden border border-border-default-default/20 shadow-400 shrink-0">
                            <img
                                src={gameIconUrl}
                                alt="Game Icon"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}
                    <span className="
                        bg-background-secondary 
                        text-white text-body-small-strong
                        p-1.5 px-2 rounded-md leading-none
                    ">
                        {tag}
                    </span>
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
            </div>
        </article>
    );
}
