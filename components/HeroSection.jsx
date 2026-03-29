"use client";

import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-border-default-secondary bg-background-secondary px-6 py-10 md:p-16 shadow-300 group">
      {/* Elementos Decorativos: Resplandores de fondo */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-default/10 blur-[100px] rounded-full pointer-events-none animate-pulse-slow" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-brand-default/5 blur-[80px] rounded-full pointer-events-none animate-pulse-slow" style={{ animationDelay: '2s' }} />
      
      {/* Patrón de Grilla Técnico (CSS) - Visible sutilmente */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           aria-hidden="true"
           style={{ backgroundImage: 'radial-gradient(circle, var(--sds-color-text-default-default) 1px, transparent 1px)', backgroundSize: '16px 16px md:24px 24px' }} />

      <div className="relative z-10 flex flex-col gap-4 md:gap-6 max-w-4xl">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-brand-default text-text-brand-on text-[10px] font-bold uppercase tracking-widest w-fit animate-pulse">
           <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" aria-hidden="true" />
           Actualizaciones en vivo
        </div>
        
        <h1 className="text-display-small sm:text-display-medium md:text-title-hero text-text-default-default leading-[1.2] md:leading-[1.1]">
          Tu portal definitivo <br className="hidden sm:block" />
          al <span className="bg-gradient-to-r from-brand-default via-text-default-default to-brand-default bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">universo Gacha</span>.
        </h1>

        
        <p className="text-body-base sm:text-subtitle text-text-default-secondary max-w-2xl leading-relaxed">
          Tu acceso directo a noticias, códigos y eventos de tus juegos gacha favoritos.
        </p>
        
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 mt-2">
           <Link href="/juegos" className="w-full sm:w-auto px-6 py-3 bg-brand-default text-text-brand-on rounded-xl text-body-strong transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-brand-default/20 text-center">
             Explorar Catálogo
           </Link>
           <Link href="/noticias" className="w-full sm:w-auto px-6 py-3 bg-background-tertiary text-text-default-default border border-border-default-default rounded-xl text-body-strong transition-all hover:bg-background-default text-center">
             Últimas Noticias
           </Link>
           <Link href="/eventos" className="w-full sm:w-auto px-6 py-3 bg-background-tertiary text-text-default-default border border-border-default-default rounded-xl text-body-strong transition-all hover:bg-background-default text-center">
             Ver Eventos
           </Link>
        </div>
      </div>
    </section>
  );
}
