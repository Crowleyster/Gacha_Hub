"use client";

import { useMemo } from 'react';
import Image from 'next/image';
import { useActiveEvent } from '@/context/ActiveEventContext';
import SectionCarousel from './ui/SectionCarousel';

export default function BannerCarousel({ gameId, bannerUrl }) {
    const { openEvent } = useActiveEvent();

    const activeBanners = useMemo(() => [
        { 
            id: `banner-${gameId}-1`, 
            gameId: gameId,
            title: 'Evento de Invocación Limited: "Vientos Cruzados"', 
            imageUrl: bannerUrl,
            description: "Aumenta la probabilidad de obtener personajes de 5 estrellas en este banner promocional de tiempo limitado.",
            type: "Banner",
            category: "Limitado",
            startDate: "2026-04-01",
            endDate: "2026-04-15"
        },
        { 
            id: `banner-${gameId}-2`, 
            gameId: gameId,
            title: 'Nuevos Aspectos: Colección Estelar de Verano', 
            imageUrl: bannerUrl,
            description: "Viste a tus héroes favoritos con los outfits más refrescantes de la temporada.",
            type: "Skin",
            category: "Tienda",
            startDate: "2026-04-01",
            endDate: "2026-04-30"
        }
    ], [gameId, bannerUrl]);

    return (
        <SectionCarousel>
            {activeBanners.map(banner => (
                <button 
                    key={banner.id} 
                    onClick={() => openEvent(banner)}
                    className="relative w-[75vw] sm:w-[calc(50%-8px)] aspect-[21/9] shrink-0 snap-start rounded-[24px] overflow-hidden border border-border-default-secondary bg-background-tertiary group/banner cursor-pointer text-left shadow-sm"
                >
                    {banner.imageUrl && (
                        <Image src={banner.imageUrl} alt={banner.title} fill sizes="(max-width: 768px) 85vw, 400px" className="object-cover transition-transform duration-500 group-hover/banner:scale-105" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-left">
                        <h4 className="text-body-strong text-white uppercase tracking-wider line-clamp-2">{banner.title}</h4>
                    </div>
                </button>
            ))}
            <div className="w-1 shrink-0" aria-hidden="true" />
        </SectionCarousel>
    );
}
