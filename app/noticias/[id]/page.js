import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, Calendar, ArrowRight } from 'lucide-react';
import { GAMES_DATA } from '@/lib/games-data';

/* ─── Helper: Tarjeta de Noticia Relacionada ─── */
function RelatedNewsCard({ news, game }) {
    const fallbackImage = news.imageUrl || game?.bannerUrl;

    return (
        <Link
            href={`/noticias/${news.id}`}
            className="group flex flex-col bg-background-secondary border border-border-default-secondary rounded-2xl overflow-hidden hover:border-border-default-default transition-all shadow-100 hover:shadow-300"
        >
            <div className="relative aspect-video w-full overflow-hidden bg-background-tertiary">
                {fallbackImage && (
                    <Image
                        src={fallbackImage}
                        alt={news.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                )}
                <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-md border border-border-default-secondary rounded-md text-white text-body-small-strong drop-shadow-md">
                    {news.tag}
                </div>
            </div>
            <div className="flex flex-col p-4 gap-2 flex-1">
                <span className="text-body-small text-text-default-tertiary">
                    {new Date(news.date).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}
                </span>
                <h3 className="text-body-strong text-text-default-default line-clamp-2 leading-tight group-hover:text-text-brand-default transition-colors">
                    {news.title}
                </h3>
            </div>
        </Link>
    );
}

export default function NewsArticle({ params }) {
    const { id } = params;

    // 1. Buscar la noticia actual y su juego
    let article = null;
    let currentGame = null;

    for (const game of Object.values(GAMES_DATA)) {
        const newsItem = game.news?.find(n => n.id === id);
        if (newsItem) {
            article = { ...newsItem, gameId: game.id, gameName: game.name, gameShort: game.shortName };
            currentGame = game;
            break;
        }
    }

    // Estado vacío (404)
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

    // 2. Obtener noticias relacionadas (del mismo juego, excluyendo la actual, máximo 3)
    const relatedNews = (currentGame?.news || [])
        .filter(n => n.id !== article.id)
        .slice(0, 3);

    const fallbackImage = article.imageUrl || currentGame?.bannerUrl;

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

                {/* Cabecera del Artículo */}
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
                            priority
                            className="object-cover"
                        />
                    )}
                </div>

                {/* ─── Cuerpo del Artículo (Template con relleno) ─── */}
                <div className="max-w-3xl w-full mx-auto flex flex-col gap-6 py-6 text-body-base text-text-default-secondary leading-relaxed">

                    <p className="text-body-strong text-text-default-default text-lg">
                        Los desarrolladores han liberado nueva información oficial respecto a esta actualización. A continuación, repasamos los detalles más importantes que impactarán la experiencia de juego en las próximas semanas.
                    </p>

                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </p>

                    <h2 className="text-heading text-text-default-default mt-4 border-b border-border-default-secondary pb-2">
                        Nuevas características y ajustes
                    </h2>

                    <p>
                        Phasellus faucibus scelerisque eleifend donec pretium vulputate sapien. Gravida dictum fusce ut placerat orci nulla. Enim blandit volutpat maecenas volutpat blandit aliquam etiam erat.
                    </p>

                    {/* Blockquote / Cita destacada */}
                    <blockquote className="my-4 pl-6 border-l-4 border-brand-default bg-background-secondary p-4 rounded-r-xl italic text-body-strong text-text-default-default">
                        "Nuestro objetivo con esta actualización es equilibrar el meta actual y ofrecer a los jugadores nuevas formas de explorar el mundo y construir sus equipos ideales."
                    </blockquote>

                    <p>
                        Volutpat maecenas volutpat blandit aliquam etiam erat velit. Vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt. Mauris sit amet massa vitae tortor condimentum lacinia quis.
                    </p>

                    {/* Caja de Redirección Oficial */}
                    <div className="mt-8 p-6 bg-background-secondary border border-border-default-secondary rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-100">
                        <div className="flex flex-col">
                            <h3 className="text-body-strong text-text-default-default">Fuente oficial</h3>
                            <span className="text-body-small text-text-default-secondary">Visita la publicación original para conocer todos los detalles técnicos.</span>
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

            {/* ─── Noticias Relacionadas (Solo se muestra si hay otras noticias del juego) ─── */}
            {relatedNews.length > 0 && (
                <section className="w-full max-w-4xl flex flex-col gap-6 px-4 sm:px-0 mt-12 pt-12 border-t border-border-default-secondary">
                    <div className="flex items-center justify-between">
                        <h2 className="text-heading text-text-default-default">
                            Más noticias de {article.gameShort}
                        </h2>
                        <Link href={`/juegos/${article.gameId}`} className="hidden sm:flex items-center gap-1 text-body-small-strong text-text-brand-default hover:opacity-80 transition-opacity">
                            Ver el Hub <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {relatedNews.map(news => (
                            <RelatedNewsCard key={news.id} news={news} game={currentGame} />
                        ))}
                    </div>

                    <Link href={`/juegos/${article.gameId}`} className="sm:hidden flex items-center justify-center gap-2 w-full py-3 bg-background-secondary rounded-xl text-body-small-strong text-text-default-default">
                        Ver el Hub de {article.gameShort} <ArrowRight className="w-4 h-4" />
                    </Link>
                </section>
            )}

        </main>
    );
}