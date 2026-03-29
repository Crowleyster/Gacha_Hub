"use client";

import { useTheme } from 'next-themes';
import { Settings, Moon, Sun, Monitor, Globe, Github, Twitter } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Ajustes() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    return (
        <main className="col-span-full space-y-8 pb-content-safe font-sans max-w-4xl mx-auto w-full">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-background-secondary rounded-xl">
                        <Settings className="w-6 h-6 text-text-brand-default" />
                    </div>
                    <h1 className="text-title-page text-text-default-default">Ajustes</h1>
                </div>
            </div>

            <div className="flex flex-col gap-6">
                {/* Bloque: Apariencia */}
                <section className="flex flex-col gap-4 bg-background-secondary border border-border-default-secondary p-6 rounded-2xl">
                    <h2 className="text-heading text-text-default-default border-b border-border-default-default pb-2">Apariencia</h2>
                    <div className="flex flex-col sm:flex-row gap-4">
                        {mounted && (
                            <>
                                <button onClick={() => setTheme('light')} className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-xl border ${theme === 'light' ? 'border-brand-default bg-brand-default/10 text-text-brand-default' : 'border-border-default-secondary bg-background-default text-text-default-secondary'}`}>
                                    <Sun className="w-5 h-5" /> Claro
                                </button>
                                <button onClick={() => setTheme('dark')} className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-xl border ${theme === 'dark' ? 'border-brand-default bg-brand-default/10 text-text-brand-default' : 'border-border-default-secondary bg-background-default text-text-default-secondary'}`}>
                                    <Moon className="w-5 h-5" /> Oscuro
                                </button>
                                <button onClick={() => setTheme('system')} className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-xl border ${theme === 'system' ? 'border-brand-default bg-brand-default/10 text-text-brand-default' : 'border-border-default-secondary bg-background-default text-text-default-secondary'}`}>
                                    <Monitor className="w-5 h-5" /> Sistema
                                </button>
                            </>
                        )}
                    </div>
                </section>

                {/* Bloque: Preferencias (Placeholder para el futuro) */}
                <section className="flex flex-col gap-4 bg-background-secondary border border-border-default-secondary p-6 rounded-2xl">
                    <h2 className="text-heading text-text-default-default border-b border-border-default-default pb-2">Preferencias de Región</h2>
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-body-strong text-text-default-default">Región de Códigos</span>
                            <span className="text-body-small text-text-default-secondary">Filtra automáticamente los códigos de canje.</span>
                        </div>
                        <select className="bg-background-tertiary border border-border-default-secondary text-text-default-default rounded-lg p-2 outline-none">
                            <option>Global (América/Europa)</option>
                            <option>Asia / SEA</option>
                            <option>Todas</option>
                        </select>
                    </div>
                </section>
                {/* Bloque: Sistema & Redes */}
                <section className="flex flex-col gap-6 bg-background-secondary border border-border-default-secondary p-6 rounded-2xl">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-heading text-text-default-default border-b border-border-default-default pb-2">Sistema</h2>
                        <div className="flex items-center justify-between py-2">
                            <span className="text-body-strong text-text-default-default">Versión del Cliente</span>
                            <div className="flex items-center gap-2 text-[10px] font-bold text-text-default-tertiary bg-background-tertiary/50 border border-border-default-secondary px-2 py-1 rounded w-fit uppercase tracking-tighter">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                v1.0.2 Stable Build
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 pt-4 border-t border-border-default-secondary">
                        <h3 className="text-body-small-strong text-text-default-secondary uppercase tracking-widest text-[10px]">Redes y comunidad</h3>
                        <div className="flex gap-4">
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-background-tertiary border border-border-default-secondary text-text-default-secondary hover:text-brand-default hover:border-brand-default transition-all">
                                <Twitter className="w-5 h-5" /> Twitter
                            </a>
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-background-tertiary border border-border-default-secondary text-text-default-secondary hover:text-brand-default hover:border-brand-default transition-all">
                                <Github className="w-5 h-5" /> GitHub
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
