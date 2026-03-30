"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, Palette, Type, LayoutTemplate, Layers } from "lucide-react";
import EventCard from "@/components/EventCard";
import NewsCard from "@/components/NewsCard";
import { EVENTS_DATA, newsData } from "@/lib/mock-data";

export default function DesignSystemPage() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    // Swatch Component
    const ColorSwatch = ({ name, twClass, varName, hasBorder = false }) => (
        <div className="flex flex-col gap-3 group">
            <div className={`w-full aspect-video rounded-2xl ${twClass} ${hasBorder ? 'border border-border-default-secondary' : ''} shadow-sm group-hover:scale-105 transition-transform duration-300`} />
            <div>
                <p className="text-body-small-strong text-text-default-default">{name}</p>
                <code className="text-[10px] text-text-default-tertiary select-all">{twClass}</code>
                <br />
                <code className="text-[10px] text-text-brand-default select-all opacity-50">{varName}</code>
            </div>
        </div>
    );

    // Typography Row
    const TypeRow = ({ name, cls, sample }) => (
        <div className="flex flex-col md:flex-row md:items-center justify-between py-6 border-b border-border-default-secondary gap-4">
            <div className="flex flex-col gap-1 md:w-1/3">
                <span className="text-body-small-strong text-text-default-secondary">{name}</span>
                <code className="text-[10px] text-text-default-tertiary select-all">.{cls}</code>
            </div>
            <div className={`md:w-2/3 text-text-default-default ${cls}`}>
                {sample || "El veloz murciélago hindú comía feliz cardillo y kiwi."}
            </div>
        </div>
    );

    return (
        <div className="col-span-full pb-content-safe font-sans flex flex-col gap-16 md:gap-24">
            
            {/* Header / Intro */}
            <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-border-default-secondary">
                <div className="flex flex-col gap-4 max-w-2xl">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-brand-default rounded-2xl text-text-brand-on shadow-lg shadow-brand-default/20">
                            <Palette className="w-8 h-8" />
                        </div>
                        <h1 className="text-title-hero text-text-default-default">UI <span className="text-text-brand-default">Kit</span></h1>
                    </div>
                    <p className="text-body-base text-text-default-secondary leading-relaxed">
                        Referencia viva del Sistema de Diseño Semántico (SDS) de Gacha Hub. 
                        Todos los componentes deben acatar estrictamente los tokens documentados a continuación.
                    </p>
                </div>

                {/* Theme Toggle de Debugging */}
                <button
                    onClick={toggleTheme}
                    className="flex items-center gap-2 px-4 py-2 bg-background-secondary border border-border-default-secondary rounded-xl text-body-small-strong text-text-default-secondary hover:text-text-default-default hover:bg-background-secondary-hover transition-colors shadow-sm w-fit"
                >
                    {mounted ? (theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />) : null}
                    <span>Forzar Tema: {mounted ? (theme === 'dark' ? 'Oscuro' : 'Claro') : '...'}</span>
                </button>
            </header>

            {/* 1. Colors Section */}
            <section className="flex flex-col gap-8">
                <div className="flex items-center gap-2">
                    <Layers className="w-5 h-5 text-text-brand-default" />
                    <h2 className="text-heading text-text-default-default">Paleta de Fondo</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    <ColorSwatch name="Background Default" twClass="bg-background-default" varName="--color-background-default" hasBorder />
                    <ColorSwatch name="Background Secondary" twClass="bg-background-secondary" varName="--color-background-secondary" />
                    <ColorSwatch name="Background Tertiary" twClass="bg-background-tertiary" varName="--color-background-tertiary" />
                    <ColorSwatch name="Brand Default" twClass="bg-brand-default" varName="--color-brand-default" />
                    <ColorSwatch name="Danger (Status)" twClass="bg-status-danger" varName="--color-status-danger" />
                </div>
            </section>

            {/* 2. Typography Section */}
            <section className="flex flex-col gap-8 bg-background-secondary p-8 rounded-3xl border border-border-default-secondary shadow-sm">
                <div className="flex items-center gap-2 border-b border-border-default-default pb-4">
                    <Type className="w-5 h-5 text-text-brand-default" />
                    <h2 className="text-heading text-text-default-default">Jerarquía Tipográfica</h2>
                </div>
                <div className="flex flex-col">
                    <TypeRow name="Hero Title" cls="text-title-hero" sample="Display XL" />
                    <TypeRow name="Page Title" cls="text-title-page" sample="Page Headers" />
                    <TypeRow name="Subtitle" cls="text-subtitle" sample="Secciones Principales" />
                    <TypeRow name="Heading" cls="text-heading" sample="Titular de Tarjeta" />
                    <TypeRow name="Subheading Strong" cls="text-subheading-strong" />
                    <TypeRow name="Body Strong" cls="text-body-strong" />
                    <TypeRow name="Body Base" cls="text-body-base" />
                    <TypeRow name="Body Small Strong" cls="text-body-small-strong" />
                    <TypeRow name="Body Small" cls="text-body-small" />
                    <TypeRow name="Caption" cls="text-caption" sample="01 MAR 2026 — 10:00 UTC" />
                    <TypeRow name="Badge" cls="text-badge" sample="RECOMPENSA DE INICIO" />
                </div>
            </section>

            {/* 3. Base UI Components */}
            <section className="flex flex-col gap-8">
                <div className="flex items-center gap-2">
                    <LayoutTemplate className="w-5 h-5 text-text-brand-default" />
                    <h2 className="text-heading text-text-default-default">Botonería y Estado</h2>
                </div>

                <div className="flex flex-col md:flex-row flex-wrap gap-8 items-start p-8 bg-background-secondary rounded-3xl border border-border-default-secondary">
                    
                    {/* Botones */}
                    <div className="flex flex-col gap-4 w-full md:w-auto">
                        <span className="text-body-small-strong text-text-default-secondary">Variantes de Botones</span>
                        <div className="flex flex-wrap items-center gap-4">
                            <button className="px-6 py-2.5 bg-brand-default text-text-brand-on rounded-xl shadow-400 text-body-small-strong hover:scale-105 transition-transform">
                                Primario (Brand)
                            </button>
                            <button className="px-6 py-2.5 bg-background-tertiary text-text-default-default border border-border-default-secondary rounded-xl shadow-sm text-body-small-strong hover:bg-background-secondary-hover transition-colors">
                                Secundario (Surface)
                            </button>
                            <button className="px-6 py-2.5 bg-transparent text-text-brand-default border-2 border-brand-default rounded-xl text-body-small-strong hover:bg-brand-default hover:text-text-brand-on transition-colors">
                                Fantasma (Outline)
                            </button>
                        </div>
                    </div>

                    {/* Estados Badges */}
                    <div className="flex flex-col gap-4 w-full md:w-auto">
                        <span className="text-body-small-strong text-text-default-secondary">Etiquetas (Badges)</span>
                        <div className="flex flex-wrap items-center gap-4">
                            <span className="h-6 px-3 flex items-center bg-status-success text-white border border-status-success/20 rounded-full text-badge shadow-sm">
                                Activo
                            </span>
                            <span className="h-6 px-3 flex items-center bg-status-warning text-white border border-status-warning/20 rounded-full text-badge shadow-sm">
                                Últimos Días
                            </span>
                            <span className="h-6 px-3 flex items-center bg-status-danger text-white border border-status-danger/20 rounded-full text-badge shadow-sm">
                                Últimas Horas
                            </span>
                            <span className="h-6 px-3 flex items-center bg-white/10 text-white/50 border border-white/10 rounded-full text-badge shadow-sm backdrop-blur-md">
                                Finalizado
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Complex Cards Showcase */}
            <section className="flex flex-col gap-8">
                <div className="flex items-center gap-2">
                    <Layers className="w-5 h-5 text-text-brand-default" />
                    <h2 className="text-heading text-text-default-default">Componentes Complejos (Aislados)</h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    
                    {/* MOCK: NewsCard */}
                    <div className="flex flex-col gap-4 p-8 bg-background-secondary rounded-3xl border border-border-default-default shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)]">
                        <span className="text-body-small-strong text-text-default-secondary">NewsCard.jsx (Grid Tile)</span>
                        <div className="h-72 lg:h-80 w-full relative shrink-0">
                            {newsData[0] && (
                                <NewsCard 
                                    title={newsData[0].title}
                                    tag={newsData[0].tag}
                                    gameIconUrl={newsData[0].gameIconUrl}
                                    imageUrl={newsData[0].imageUrl}
                                    date={newsData[0].date}
                                />
                            )}
                        </div>
                    </div>

                    {/* MOCK: EventCard */}
                    <div className="flex flex-col gap-4 p-8 bg-background-secondary rounded-3xl border border-border-default-default shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)]">
                        <span className="text-body-small-strong text-text-default-secondary">EventCard.jsx (Carousel Item)</span>
                        <div className="w-80 shrink-0">
                            {EVENTS_DATA[3] && (
                                <EventCard event={EVENTS_DATA[3]} />
                            )}
                        </div>
                    </div>

                </div>
            </section>

        </div>
    );
}
