"use client";

import { useState, useEffect } from 'react';

export function useFavorites() {
  const [favorites, setFavorites] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('gachaHub_favorites');
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Error inicializando favoritos:', e);
    }
    setIsLoaded(true);
  }, []);

  const toggleFavorite = (gameId) => {
    setFavorites(prev => {
      const newFavs = prev.includes(gameId) 
        ? prev.filter(id => id !== gameId) 
        : [...prev, gameId];
      
      try {
        localStorage.setItem('gachaHub_favorites', JSON.stringify(newFavs));
      } catch (e) {
        console.error('Error guardando favoritos:', e);
      }
      
      // Dispatch evt para otros componentes montados
      window.dispatchEvent(new Event('gacha-favorites-updated'));
      return newFavs;
    });
  };

  const isFavorite = (gameId) => favorites.includes(gameId);

  useEffect(() => {
    const handleUpdate = () => {
      try {
        const stored = localStorage.getItem('gachaHub_favorites');
        if (stored) {
          setFavorites(JSON.parse(stored));
        }
      } catch (e) {}
    };

    window.addEventListener('gacha-favorites-updated', handleUpdate);
    return () => window.removeEventListener('gacha-favorites-updated', handleUpdate);
  }, []);

  return { favorites, toggleFavorite, isFavorite, isLoaded };
}
