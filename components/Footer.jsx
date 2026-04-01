"use client";

import Link from 'next/link';
import { Gamepad2, Github, Twitter, ExternalLink } from 'lucide-react';
import { TOP_NAV_ITEMS, BOTTOM_NAV_ITEMS } from '@/lib/nav-items';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-background-default border-t border-border-default-secondary mt-auto pt-8 md:pt-12 pb-24 md:pb-12 px-6">
            <div className="max-w-7xl mx-auto flex flex-col md:grid md:grid-cols-3 gap-8 md:gap-8">
                
                {/* 1. Brand Section */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-brand-default flex items-center justify-center text-text-brand-on shadow-lg shadow-brand-default/20">
                            <Gamepad2 className="w-6 h-6" />
                        </div>
                        <span className="text-subheading-strong text-text-default-default tracking-tight">Gacha <span className="text-brand-default">Hub</span></span>
                    </div>
                    <p className="text-body-small text-text-default-secondary max-w-xs leading-relaxed">
                        Tu centro de mando definitivo para el universo Gacha. Noticias, códigos y eventos sincronizados en tiempo real.
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-background-secondary text-text-default-secondary hover:text-brand-default transition-colors" aria-label="Twitter">
                            <Twitter className="w-5 h-5" />
                        </a>
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-background-secondary text-text-default-secondary hover:text-brand-default transition-colors" aria-label="GitHub">
                            <Github className="w-5 h-5" />
                        </a>
                    </div>
                </div>

                {/* 2. Navigation Section (Hidden on Mobile to avoid redundancy with Bottom Bar) */}
                <div className="hidden md:flex flex-col gap-4">
                    <h4 className="text-badge text-text-default-default">Explorar</h4>
                    <ul className="flex flex-col gap-3">
                        {TOP_NAV_ITEMS.map((item) => (
                            <li key={item.href}>
                                <Link 
                                    href={item.href} 
                                    className="text-body-small text-text-default-secondary hover:text-text-default-default hover:translate-x-1 transition-all inline-flex items-center gap-2 group"
                                >
                                    <span className="w-1 h-1 rounded-full bg-border-default-default group-hover:bg-brand-default transition-colors" />
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* 3. Support & More */}
                <div className="hidden md:flex flex-col gap-4">
                    <h4 className="text-badge text-text-default-default">Soporte y Sistema</h4>
                    <ul className="flex flex-col gap-3">
                        {BOTTOM_NAV_ITEMS.map((item) => (
                            <li key={item.href}>
                                <Link 
                                    href={item.href} 
                                    className="text-body-small text-text-default-secondary hover:text-text-default-default inline-flex items-center gap-2"
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <div className="flex items-center gap-2 text-badge text-text-default-tertiary bg-background-tertiary/50 border border-border-default-secondary px-2 py-1 rounded w-fit uppercase tracking-tighter">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                v1.0.2 Stable Build
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom Copyright */}
            <div className="max-w-7xl mx-auto mt-8 md:mt-12 pt-6 md:pt-8 border-t border-border-default-secondary flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4 text-center">
                
                <div className="flex items-center gap-2 text-badge text-text-default-tertiary bg-background-tertiary/50 border border-border-default-secondary px-2 py-1 rounded w-fit uppercase tracking-tighter md:hidden">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    v1.0.2 Stable Build
                </div>

                <p className="text-caption text-text-default-tertiary uppercase tracking-widest">
                    © {currentYear} Gacha Hub. Todos los derechos reservados.
                </p>
                <div className="flex items-center gap-6">
                   <Link href="/ayuda" className="text-caption text-text-default-tertiary uppercase tracking-widest hover:text-text-default-secondary cursor-pointer transition-colors md:hidden">Ayuda</Link>
                   <span className="text-caption text-text-default-tertiary uppercase tracking-widest hover:text-text-default-secondary cursor-pointer transition-colors">Privacidad</span>
                   <span className="text-caption text-text-default-tertiary uppercase tracking-widest hover:text-text-default-secondary cursor-pointer transition-colors hidden md:inline-block">Términos</span>
                </div>
            </div>
        </footer>
    );
}
