import { getAllGamesData } from '@/services/gamesService';
import NoticiasClient from '@/components/views/NoticiasClient';

export const metadata = {
    title: 'Noticias y Actualizaciones - Gacha Hub',
    description: 'Mantente al día con las últimas noticias, eventos y actualizaciones de tus juegos Gacha favoritos.',
};

export default async function NoticiasPage() {
    const gamesData = await getAllGamesData();

    // Prepare allNews array simulating the client fallback
    const allNews = gamesData.flatMap(game => 
        (game.news || []).map(news => ({
            ...news,
            gameId: game.id,
            gameName: game.name,
            gameShortName: game.shortName,
            gameIconUrl: game.iconUrl
        }))
    );

    return <NoticiasClient initialNews={allNews} initialGames={gamesData} />;
}
