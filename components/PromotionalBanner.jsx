"use client";

import { ArrowRight, Terminal } from 'lucide-react';
import Link from 'next/link';

export default function PromotionalBanner() {
    return (
        <section className="col-span-4 md:col-span-8 xl:col-span-12 font-sans">
            <Link
                href="/noticias/dev-log"
                className="group relative flex flex-col md:flex-row items-center justify-between gap-6 p-6 md:p-8 bg-background-secondary border border-border-default-default rounded-xl overflow-hidden focus-visible:ring-2 focus-visible:ring-brand-default/20 focus-visible:outline-none transition-all duration-300 hover:bg-background-secondary-hover"
            >
                {/* Background Pattern/Gradient (Using SDS Brand Token) */}
                <div className="absolute inset-0 bg-gradient-to-r from-brand-default/5 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
                
                <div className="flex flex-col md:flex-row items-center gap-6 relative z-10 w-full md:w-auto">
                    <div className="p-4 rounded-xl bg-brand-default text-text-brand-on shadow-400 transition-transform duration-300 group-hover:scale-110">
                        <Terminal className="w-8 h-8" />
                    </div>
                    
                    <div className="text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                            <span className="px-2 py-0.5 rounded bg-background-tertiary text-text-default-default text-body-small-strong uppercase tracking-wider">
                                Dev Log #04
                            </span>
                            <span className="text-text-default-secondary text-body-small font-medium">
                                Actualizado recientemente
                            </span>
                        </div>
                        <h2 className="text-subheading-strong md:text-heading text-text-default-default transition-colors">
                            Detrás de cámaras: Optimizando el motor de renderizado
                        </h2>
                        <p className="text-text-default-secondary text-body-base mt-2 max-w-xl line-clamp-2 md:line-clamp-none">
                            Descubre cómo logramos una experiencia de 120fps constante en dispositivos móviles y las nuevas mejoras de iluminación.
                        </p>
                    </div>
                </div>

                <div className="relative z-10 flex items-center gap-2 px-6 py-3 rounded-lg bg-brand-default text-text-brand-on text-body-small-strong transition-all duration-300 group-hover:gap-4 shadow-400">
                    Leer el informe
                    <ArrowRight className="w-4 h-4" />
                </div>
            </Link>
        </section>
    );
}
