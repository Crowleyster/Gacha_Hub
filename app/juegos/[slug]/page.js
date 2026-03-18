import data from '@/mock_data.json';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    return data.games.map((game) => ({
        slug: game.slug,
    }));
}

export default async function GamePage({ params }) {
    const { slug } = await params;
    const game = data.games.find(g => g.slug === slug);

    if (!game) {
        notFound();
    }

    return (
        <div className="flex flex-col w-full min-h-screen bg-background text-foreground font-sans p-4 md:p-6">
            <header className="mb-8">
                <h1 className="text-4xl font-extrabold">{game.name}</h1>
                <p className="text-muted-foreground">{game.developer}</p>
            </header>
            <main className="flex-1">
                {/* Detalles del juego aquí */}
                <p>Bienvenido a la página de {game.name}. El contenido será añadido pronto.</p>
            </main>
        </div>
    );
}

