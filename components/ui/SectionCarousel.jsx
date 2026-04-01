"use client";

import { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function SectionCarousel({ children }) {
    const scrollRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const [scrollProgess, setScrollProgress] = useState(0); // 0 to 1

    // Detectar si el carrusel puede desplazarse
    const checkScroll = useCallback(() => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 2);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 2);
            
            // Calcular progreso (0 a 1)
            const progress = scrollLeft / (scrollWidth - clientWidth);
            setScrollProgress(isNaN(progress) ? 0 : progress);
        }
    }, []);

    useEffect(() => {
        const el = scrollRef.current;
        if (el) {
            checkScroll();
            el.addEventListener('scroll', checkScroll, { passive: true });
            window.addEventListener('resize', checkScroll);
            return () => {
                el.removeEventListener('scroll', checkScroll);
                window.removeEventListener('resize', checkScroll);
            };
        }
    }, [checkScroll]);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { clientWidth } = scrollRef.current;
            // Desplazamiento inteligente: 80% del ancho visible para mantener contexto
            const scrollAmount = clientWidth * 0.8 * direction;
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="relative group/carousel -mx-4 md:-mx-8 lg:mx-0">
            {/* Controles Tablet/Desktop */}
            <button 
                onClick={() => scroll(-1)} 
                aria-label="Anterior"
                disabled={!canScrollLeft}
                className={`
                    hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-20 
                    w-11 h-11 items-center justify-center rounded-full 
                    border border-border-default-default bg-background-default shadow-300 
                    text-text-default-secondary transition-all duration-300 
                    opacity-0 group-hover/carousel:opacity-100 focus-visible:opacity-100
                    focus-visible:ring-2 focus-visible:ring-brand-default focus-visible:outline-none
                    hover:text-brand-default hover:border-brand-default disabled:cursor-not-allowed
                    ${!canScrollLeft && 'lg:hidden'}
                `}
            >
                <ChevronLeft className="w-5 h-5" />
            </button>

            <button 
                onClick={() => scroll(1)} 
                aria-label="Siguiente"
                disabled={!canScrollRight}
                className={`
                    hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-20 
                    w-11 h-11 items-center justify-center rounded-full 
                    border border-border-default-default bg-background-default shadow-300 
                    text-text-default-secondary transition-all duration-300 
                    opacity-0 group-hover/carousel:opacity-100 focus-visible:opacity-100
                    focus-visible:ring-2 focus-visible:ring-brand-default focus-visible:outline-none
                    hover:text-brand-default hover:border-brand-default disabled:cursor-not-allowed
                    ${!canScrollRight && 'lg:hidden'}
                `}
            >
                <ChevronRight className="w-5 h-5" />
            </button>

            {/* Contenedor de Scroll (Full Bleed) */}
            <div 
                ref={scrollRef} 
                className="
                    flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-6
                    px-4 md:px-8 lg:px-0 scroll-pl-4 md:scroll-pl-8 lg:scroll-pl-0
                "
            >
                {children}
            </div>

            {/* Indicador de Progreso (Dots/Pills) */}
            {canScrollRight || canScrollLeft ? (
                <div className="flex justify-center items-center gap-1.5 mt-1 lg:hidden">
                    <div className="relative w-16 h-1 bg-background-tertiary rounded-full overflow-hidden">
                        <div 
                            className="absolute top-0 left-0 h-full bg-brand-default transition-all duration-150 rounded-full"
                            style={{ 
                                width: '40%', 
                                transform: `translateX(${scrollProgess * 150}%)` 
                            }}
                        />
                    </div>
                </div>
            ) : null}
        </div>
    );
}
