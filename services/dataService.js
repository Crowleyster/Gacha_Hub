import { CODES_DATA, newsData, EVENTS_DATA } from '@/lib/mock-data';

/**
 * Obtener los códigos activos, opcionalmente filtrados por juego.
 * @param {string} [gameId]
 */
export async function getActiveCodes(gameId = null) {
    if (gameId) {
        return CODES_DATA[gameId] || { codes: [], icon: null };
    }
    return CODES_DATA;
}

/**
 * Obtener todas las noticias o filtrar por un ID de juego.
 * @param {string} [gameId] 
 */
export async function getNews(gameId = null) {
    if (gameId) {
        return newsData.filter(news => news.gameId === gameId);
    }
    return newsData;
}

/**
 * Obtener la noticia por ID.
 * @param {number|string} id 
 */
export async function getNewsById(id) {
    return newsData.find(news => String(news.id) === String(id)) || null;
}

/**
 * Obtener todos los eventos activos, opcionalmente filtrados por juego.
 * @param {string} [gameId]
 */
export async function getEvents(gameId = null) {
    if (gameId) {
        return EVENTS_DATA.filter(event => event.gameId === gameId);
    }
    return EVENTS_DATA;
}
