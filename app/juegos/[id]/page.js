"use client";

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Monitor, Smartphone, Globe, Twitter, MessageSquare, Download } from 'lucide-react';
import { GAMES_DATA } from '@/lib/games-data';

/* ─── Helper: Icono de Plataforma ─── */
function PlatformIcon({ platform }) {
    if (platform === 'PC' || platform.includes('PS')) return <Monitor className="w-5 h-5" />;
    return <Smartphone className="w-5 h-5" />;
}

export default function GameHub() {
    const { id } = useParams();
    const game = GAMES_DATA[id];
    const [activeTab, setActiveTab] = useState('resumen');

    // Estado vacío (404) si el juego no existe
    if (!game) {
        return (
            <main className="col-span-full flex flex-col items-center justify-center py-20 gap-4 font-sans">
                <h1 className="text-title-page text-text-default-default">Juego no encontrado</h1>
                <Link href="/juegos" className="px-6 py-2 bg-brand-default text-text-brand-on rounded-xl text-body-strong">
                    Volver al catálogo
                </Link>
            </main>
        );
    }

    return (
        <main className="col-span-full pb-content-safe font-sans flex flex-col">
            
            {/* ─── 1. Hero Banner (Cabecera) ─── */}
            <section className="relative w-full h-64 md:h-80 -mx-4 sm:mx-0 sm:rounded-3xl overflow-hidden bg-background-tertiary shadow-200 shrink-0">
                {game.bannerUrl && (
                    <img src={game.bannerUrl} alt={game.name} className="absolute inset-0 w-full h-full object-cover" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Botón Volver */}
                <Link href="/juegos" className="absolute top-4 left-4 p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-black/70 transition-colors">
                    <ArrowLeft className="w-6 h-6" />
                </Link>
            </section>

            {/* ─── 2. Cabecera del Juego (Overlap) ─── */}
            <section className="flex flex-col md:flex-row gap-6 px-4 sm:px-6 -mt-12 md:-mt-16 relative z-10">
                
                {/* Icono Flotante */}
                <div className="shrink-0">
                    {game.iconUrl && (
                        <img 
                            src={game.iconUrl} 
                            alt={`${game.name} icon`} 
                            className="w-24 h-24 md:w-32 md:h-32 rounded-2xl border-4 border-background-default shadow-400 object-cover bg-background-default"
                        />
                    )}
                </div>

                {/* Títulos y Acciones */}
                <div className="flex flex-col md:flex-row md:items-end justify-between w-full gap-4 mt-2 md:mt-16">
                    <div className="flex flex-col">
                        <h1 className="text-title-hero text-text-default-default line-clamp-2">{game.name}</h1>
                        <span className="text-body-strong text-text-default-secondary">{game.developer} • v{game.currentVersion}</span>
                    </div>
                    
                    <div className="flex items-center gap-3 shrink-0">
                        <a href={game.socialLinks?.officialSite || '#'} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-brand-default text-text-brand-on rounded-xl text-body-strong hover:opacity-90 transition-opacity">
                            <Download className="w-5 h-5" /> Sitio Oficial
                        </a>
                    </div>
                </div>
            </section>

            {/* ─── 3. Layout de Columnas ─── */}
            <section className="flex flex-col lg:flex-row gap-8 mt-8 px-4 sm:px-6">
                
                {/* Columna Izquierda: Metadatos */}
                <aside className="w-full lg:w-72 flex flex-col gap-6 shrink-0">
                    {/* Plataformas */}
                    <div className="p-4 bg-background-secondary border border-border-default-secondary rounded-2xl flex flex-col gap-3">
                        <h3 className="text-body-strong text-text-default-default">Plataformas</h3>
                        <div className="flex items-center gap-3 text-text-default-secondary flex-wrap">
                            {game.platforms.map(p => (
                                <div key={p} className="flex items-center gap-2 px-3 py-1.5 bg-background-default border border-border-default-default rounded-lg text-body-small">
                                    <PlatformIcon platform={p} /> {p}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Redes Sociales */}
                    <div className="p-4 bg-background-secondary border border-border-default-secondary rounded-2xl flex flex-col gap-3">
                        <h3 className="text-body-strong text-text-default-default">Comunidad</h3>
                        <div className="flex gap-2">
                            {game.socialLinks?.twitter && (
                                <a href={game.socialLinks.twitter} target="_blank" className="p-3 bg-background-default border border-border-default-default rounded-xl text-text-default-secondary hover:text-[#1DA1F2] transition-colors"><Twitter className="w-5 h-5" /></a>
                            )}
                            {game.socialLinks?.discord && (
                                <a href={game.socialLinks.discord} target="_blank" className="p-3 bg-background-default border border-border-default-default rounded-xl text-text-default-secondary hover:text-[#5865F2] transition-colors"><MessageSquare className="w-5 h-5" /></a>
                            )}
                            {game.socialLinks?.officialSite && (
                                <a href={game.socialLinks.officialSite} target="_blank" className="p-3 bg-background-default border border-border-default-default rounded-xl text-text-default-secondary hover:text-text-default-default transition-colors"><Globe className="w-5 h-5" /></a>
                            )}
                        </div>
                    </div>
                </aside>

                {/* Columna Derecha: Sistema de Pestañas */}
                <div className="flex-1 flex flex-col gap-6 min-w-0">
                    
                    {/* Navegación de Pestañas */}
                    <div className="flex items-center gap-2 border-b border-border-default-secondary overflow-x-auto scrollbar-none">
                        {['resumen', 'noticias', 'eventos'].map(tab => (
                            <button 
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-3 text-body-strong capitalize transition-colors border-b-2 whitespace-nowrap ${activeTab === tab ? 'border-brand-default text-text-brand-default' : 'border-transparent text-text-default-secondary hover:text-text-default-default'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Contenido de la Pestaña Activa */}
                    <div className="py-4">
                        {activeTab === 'resumen' && (
                            <div className="flex flex-col gap-4">
                                <h2 className="text-heading text-text-default-default">Acerca de {game.name}</h2>
                                <p className="text-body-base text-text-default-secondary leading-relaxed whitespace-pre-line">
                                    {game.description || 'No hay descripción disponible para este juego.'}
                                </p>
                            </div>
                        )}
                        {activeTab === 'noticias' && (
                            <div className="text-body-base text-text-default-secondary p-8 text-center border-2 border-dashed border-border-default-secondary rounded-2xl">
                                Cuadrícula de noticias específicas de {game.shortName} irá aquí.
                            </div>
                        )}
                        {activeTab === 'eventos' && (
                            <div className="text-body-base text-text-default-secondary p-8 text-center border-2 border-dashed border-border-default-secondary rounded-2xl">
                                Línea de tiempo de eventos de {game.shortName} irá aquí.
                            </div>
                        )}
                    </div>

                </div>
            </section>
        </main>
    );
}
