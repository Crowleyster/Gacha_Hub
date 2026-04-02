import { getAllGamesData } from '@/services/gamesService';
import { getEvents } from '@/services/dataService';
import EventosClient from '@/components/views/EventosClient';

export const metadata = {
    title: 'Centro de Eventos - Gacha Hub',
    description: 'Sigue el cronograma de todos los eventos, misiones y recompensas de tus juegos favoritos.',
};

export default async function EventosPage() {
    const [eventsData, gamesData] = await Promise.all([
        getEvents(),
        getAllGamesData()
    ]);

    return <EventosClient initialEvents={eventsData} initialGames={gamesData} />;
}
