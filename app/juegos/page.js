import { getAllGamesData } from '@/services/gamesService';
import JuegosClient from '@/components/views/JuegosClient';

export const metadata = {
    title: 'Catálogo de Juegos - Gacha Hub',
    description: 'Explora nuestra biblioteca completa de juegos Gacha. Encuentra nuevos lanzamientos, guías de personajes, y todo lo que necesitas para tu aventura.',
};

export default async function JuegosPage() {
    const gamesData = await getAllGamesData();

    return <JuegosClient initialGamesData={gamesData} />;
}