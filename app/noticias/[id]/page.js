import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, Calendar } from 'lucide-react';
import { GAMES_DATA } from '@/lib/games-data';

// Al ser un Server Component, Next.js inyecta los "params" directamente
export default function NewsArticle({ params }) {
    const { id } = params;

    // Buscar la noticia específica (sin necesidad de hooks)
    let article = null;
    for (const game of Object.values(GAMES_DATA)) {
        const newsItem = game.news?.find(n => n.id === id);
        if (newsItem) {
            article = { ...newsItem, gameId: game.id, gameName: game.name, gameShort: game.shortName };
            break;
        }
    }

    if (!article) {
        return (
            <main className="col-span-full flex flex-col items-center justify-center py-20 gap-4 font-sans">
                <h1 className="text-title-page text-text-default-default">Noticia no encontrada</h1>
                <Link href="/noticias" className="px-6 py-2 bg-brand-default text-text-brand-on rounded-xl text-body-strong">
                    Volver al portal
                </Link>
            </main>
        );
    }

    const fallbackImage = article.imageUrl || GAMES_DATA[article.gameId]?.bannerUrl;

    return (
        <main className="col-span-full pb-content-safe font-sans flex flex-col items-center">
            
            {/* ─── Breadcrumbs (Migas de pan) ─── */}
            <div className="w-full max-w-4xl py-4 flex items-center gap-2 text-body-small-strong text-text-default-tertiary px-4 sm:px-0">
                <Link href="/noticias" className="hover:text-text-default-default transition-colors">Noticias</Link>
                <span>/</span>
                <Link href={`/juegos/${article.gameId}`} className="hover:text-text-default-default transition-colors">{article.gameShort}</Link>
                <span>/</span>
                <span className="text-text-default-default truncate">{article.title}</span>
            </div>

            {/* ─── Contenedor Principal de Lectura ─── */}
            <article className="w-full max-w-4xl flex flex-col gap-6 px-4 sm:px-0">
                
                <header className="flex flex-col gap-4">
                    <div className="flex items-center gap-3 flex-wrap">
                        <span className="px-3 py-1 bg-brand-default/10 text-text-brand-default rounded-md text-body-small-strong">
                            {article.tag}
                        </span>
                        <div className="flex items-center gap-1.5 text-text-default-secondary text-body-small">
                            <Calendar className="w-4 h-4" />
                            {new Date(article.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>
                    </div>
                    
                    <h1 className="text-title-hero text-text-default-default leading-tight">
                        {article.title}
                    </h1>
                </header>

                {/* Imagen Principal Optimizada */}
                <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-background-tertiary border border-border-default-secondary shadow-200">
                    {fallbackImage && (
                        <Image 
                            src={fallbackImage} 
                            alt={article.title} 
                            fill
                            sizes="(max-width: 1024px) 100vw, 1024px"
                            priority // Esta imagen es vital para la vista, se carga inmediatamente
                            className="object-cover" 
                        />
                    )}
                </div>

                <div className="max-w-3xl w-full mx-auto flex flex-col gap-6 py-6 text-body-base text-text-default-secondary leading-relaxed">
                    <p>
                        Esta es una vista previa simulada del contenido de la noticia. Una vez que la API y el scraper estén en funcionamiento, este bloque inyectará los párrafos extraídos directamente de la fuente oficial.
                    </p>
                    
                    {/* Botón hacia fuente original SEGURO */}
                    <div className="mt-8 p-6 bg-background-secondary border border-border-default-secondary rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex flex-col">
                            <h3 className="text-body-strong text-text-default-default">Lee la nota original</h3>
                            <span className="text-body-small text-text-default-secondary">Visita el sitio oficial para ver todos los detalles.</span>
                        </div>
                        <a 
                            href={article.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="shrink-0 flex items-center gap-2 px-6 py-3 bg-background-default border border-border-default-default text-text-default-default rounded-xl hover:bg-background-secondary-hover transition-colors text-body-strong"
                        >
                            Sitio Oficial <ExternalLink className="w-4 h-4" />
                        </a>
                    </div>
                </div>

            </article>
        </main>
    );
}
