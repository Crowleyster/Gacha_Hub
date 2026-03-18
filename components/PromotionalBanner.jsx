"use client";

import { ArrowRight, Terminal } from 'lucide-react';
import Link from 'next/link';

export default function PromotionalBanner() {
    return (
        <section className="col-span-4 md:col-span-8 xl:col-span-12 font-sans">
            <Link
                href="/noticias/dev-log"
                className="group relative flex flex-col md:flex-row items-center justify-between gap-6 p-6 md:p-8 bg-card border border-border rounded-xl overflow-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none transition-all duration-300 hover:bg-accent/50"
            >
                {/* Background Pattern/Gradient */}
                <div className="absolute inset-0 bg-linear-to-r from-primary/10 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
                
                <div className="flex flex-col md:flex-row items-center gap-6 relative z-10 w-full md:w-auto">
                    <div className="p-4 rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 transition-transform duration-300 group-hover:scale-110">
                        <Terminal className="w-8 h-8" />
                    </div>
                    
                    <div className="text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                            <span className="px-2 py-0.5 rounded bg-secondary text-secondary-foreground text-[10px] font-bold uppercase tracking-wider">
                                Dev Log #04
                            </span>
                            <span className="text-muted-foreground text-xs font-medium">
                                Actualizado recientemente
                            </span>
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-foreground">
                            Detrás de cámaras: Optimizando el motor de renderizado
                        </h2>
                        <p className="text-muted-foreground text-sm mt-1 max-w-xl">
                            Descubre cómo logramos una experiencia de 120fps constante en dispositivos móviles y las nuevas mejoras de iluminación.
                        </p>
                    </div>
                </div>

                <div className="relative z-10 flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-bold text-sm transition-all duration-300 group-hover:gap-4 shadow-lg shadow-primary/20">
                    Leer el informe
                    <ArrowRight className="w-4 h-4" />
                </div>
            </Link>
        </section>
    );
}
