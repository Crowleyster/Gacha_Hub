"use client";

import { Star } from 'lucide-react';
import { useFavorites } from '@/hooks/useFavorites';

export default function FavoriteButton({ gameId }) {
    const { toggleFavorite, isFavorite } = useFavorites();
    const isFav = isFavorite(gameId);

    return (
        <button
            onClick={() => toggleFavorite(gameId)}
            className={`absolute top-4 sm:top-6 right-4 sm:right-6 p-2 backdrop-blur-md rounded-full transition-all duration-300 hover:scale-105 z-20 shadow-sm ${isFav ? 'bg-amber-500/80 text-white' : 'bg-black/40 text-white hover:bg-black/80'}`}
            aria-label={isFav ? "Quitar de favoritos" : "Añadir a favoritos"}
        >
            <Star className="w-6 h-6" fill={isFav ? "currentColor" : "none"} />
        </button>
    );
}
