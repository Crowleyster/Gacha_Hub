import { GAMES_DATA, GAMES_LIST } from '@/lib/games-data';

/**
 * Obtener la lista reducida de todos los juegos.
 * Usado para catálogos iniciales y selectores.
 */
export async function getAllGamesList() {
    // Simulando delay de red (opcional, para desarrollo)
    // await new Promise(resolve => setTimeout(resolve, 100));
    return GAMES_LIST;
}

/**
 * Obtener todos los datos detallados de los juegos.
 */
export async function getAllGamesData() {
    return Object.values(GAMES_DATA);
}

/**
 * Obtener la información de un juego específico por ID.
 * @param {string} id 
 */
export async function getGameById(id) {
    const game = GAMES_DATA[id];
    if (!game) return null;
    return game;
}
