import { Info, Twitter, MessageSquare, Globe } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';

export default function GameSidebar({ game }) {
    const publisher = game?.publisher || "Publisher Desconocido";
    const releaseDate = game?.releaseDate?.pc || game?.releaseDate || "TBA";

    return (
        <div className="w-full lg:w-[320px] shrink-0 flex flex-col order-2 lg:order-1 lg:pt-2">
            <div className="flex-1 flex flex-col gap-10 bg-background-secondary border border-border-default-secondary rounded-[32px] p-6 sm:p-8">
                {/* Acerca del Juego */}
                <section className="flex flex-col gap-4">
                    <SectionHeader icon={Info} title="Acerca del juego" />
                    <p className="text-body-base text-text-default-secondary leading-relaxed whitespace-pre-line">
                        {game.description || 'No hay descripción disponible para este juego en este momento. Vuelve pronto para obtener más detalles.'}
                    </p>
                </section>

                {/* Ficha Técnica (Lista Tipográfica Limpia) */}
                <section className="flex flex-col gap-5 pt-6 border-t border-border-default-secondary">
                    <h3 className="text-body-strong text-text-default-default uppercase tracking-wider">Ficha Técnica</h3>

                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-baseline gap-4">
                            <span className="text-body-small-strong text-text-default-tertiary">Desarrollador</span>
                            <span className="text-body-small-strong text-text-default-default text-right">{game.developer}</span>
                        </div>
                        <div className="flex justify-between items-baseline gap-4">
                            <span className="text-body-small-strong text-text-default-tertiary">Publisher</span>
                            <span className="text-body-small-strong text-text-default-default text-right">{publisher}</span>
                        </div>
                        <div className="flex justify-between items-baseline gap-4">
                            <span className="text-body-small-strong text-text-default-tertiary">Lanzamiento Inicial</span>
                            <span className="text-body-small-strong text-text-default-default text-right">{releaseDate}</span>
                        </div>
                    </div>
                </section>

                {/* Comunidades y Redes Sociales */}
                <section className="flex flex-col gap-5 pt-6 border-t border-border-default-secondary">
                    <h3 className="text-body-strong text-text-default-default uppercase tracking-wider">Comunidad Oficial</h3>
                    <div className="flex flex-wrap gap-2">
                        {game.socialLinks?.twitter && (
                            <a href={game.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-3 bg-background-tertiary border border-border-default-secondary rounded-xl text-text-default-secondary hover:text-brand-default hover:border-brand-default transition-all w-12 h-12" title="Twitter"><Twitter className="w-5 h-5" /></a>
                        )}
                        {game.socialLinks?.discord && (
                            <a href={game.socialLinks.discord} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-3 bg-background-tertiary border border-border-default-secondary rounded-xl text-text-default-secondary hover:text-brand-default hover:border-brand-default transition-all w-12 h-12" title="Discord"><MessageSquare className="w-5 h-5" /></a>
                        )}
                        {game.officialSite && (
                            <a href={game.officialSite} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-3 bg-background-tertiary border border-border-default-secondary rounded-xl text-text-default-secondary hover:text-brand-default hover:border-brand-default transition-all w-12 h-12" title="Sitio Oficial"><Globe className="w-5 h-5" /></a>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}
