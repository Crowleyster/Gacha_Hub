import { supabase } from '@/lib/supabase';

/**
 * Agrupa plataformas por ecosistema para evitar repetición de iconos.
 * Ejemplo: ["PS4", "PS5"] -> ["PS4/PS5"]
 * Ejemplo: ["iOS", "macOS"] -> ["iOS/macOS"]
 */
function mergePlatforms(platforms = []) {
    if (!platforms.length) return [];
    
    let merged = [...platforms];
    
    // ── PlayStation ──
    const hasPS4 = merged.some(p => p.toLowerCase() === 'ps4' || p.toLowerCase() === 'playstation 4');
    const hasPS5 = merged.some(p => p.toLowerCase() === 'ps5' || p.toLowerCase() === 'playstation 5');
    
    if (hasPS4 && hasPS5) {
        merged = merged.filter(p => !p.toLowerCase().includes('ps4') && !p.toLowerCase().includes('ps5') && !p.toLowerCase().includes('playstation'));
        merged.push('PS4/PS5');
    }

    // ── Apple ──
    const hasIOS = merged.some(p => p.toLowerCase() === 'ios' || p.toLowerCase() === 'iphone');
    const hasMacOS = merged.some(p => p.toLowerCase() === 'macos' || p.toLowerCase() === 'mac');

    if (hasIOS && hasMacOS) {
        merged = merged.filter(p => !['ios', 'macos', 'mac', 'iphone', 'ipad'].includes(p.toLowerCase()));
        merged.push('iOS/macOS');
    }

    // ── Xbox ── (Unificación simple)
    const hasXboxMultiple = merged.filter(p => p.toLowerCase().includes('xbox')).length > 1;
    if (hasXboxMultiple) {
        merged = merged.filter(p => !p.toLowerCase().includes('xbox'));
        merged.push('Xbox');
    }

    return merged;
}

/**
 * Función auxiliar para normalizar los datos de la base de datos (Supabase)
 * al formato esperado por el frontend (Adapter Pattern).
 * Mapea 'release_date' de la DB a 'releaseDate' para el frontend.
 */
function normalizeGame(game) {
    if (!game) return null;
    const { release_date, platforms, ...rest } = game;
    return {
        ...rest,
        releaseDate: release_date,
        platforms: mergePlatforms(platforms)
    };
}

/**
 * Obtener la lista reducida de todos los juegos (id, name).
 * Usado para catálogos iniciales y selectores.
 */
export async function getAllGamesList() {
    try {
        const { data, error } = await supabase
            .from('games')
            .select('id, name');

        if (error) throw error;
        
        // Normalizamos cada juego del array
        return (data || []).map(normalizeGame);
    } catch (error) {
        console.error('Error en getAllGamesList:', error.message);
        return [];
    }
}

/**
 * Obtener todos los datos detallados de todos los juegos.
 */
export async function getAllGamesData() {
    try {
        const { data, error } = await supabase
            .from('games')
            .select('*');

        if (error) throw error;

        // Normalizamos cada juego del array
        return (data || []).map(normalizeGame);
    } catch (error) {
        console.error('Error en getAllGamesData:', error.message);
        return [];
    }
}

/**
 * Obtener la información de un juego específico por ID.
 * @param {string} id 
 */
export async function getGameById(id) {
    try {
        const { data, error } = await supabase
            .from('games')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;

        // Normalizamos el objeto único
        return normalizeGame(data);
    } catch (error) {
        // Manejamos el caso de 'PGRST116' (no encontrado) o cualquier otro error
        console.error(`Error en getGameById (${id}):`, error.message);
        return null;
    }
}
