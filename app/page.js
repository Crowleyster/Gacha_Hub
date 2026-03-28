import Link from 'next/link';
import NewsBentoGrid from '@/components/NewsBentoGrid';
import ActiveCodes   from '@/components/ActiveCodes';
import EventsTimeline from '@/components/EventsTimeline';

function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-border-default-secondary bg-background-secondary p-8 md:p-16 my-4 shadow-300 group">
      {/* Elementos Decorativos: Resplandores de fondo */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-default/10 blur-[100px] rounded-full pointer-events-none animate-pulse-slow" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-brand-default/5 blur-[80px] rounded-full pointer-events-none animate-pulse-slow" style={{ animationDelay: '2s' }} />
      
      {/* Patrón de Grilla Técnico (CSS) - Visible sutilmente */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, var(--sds-color-text-default-default) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      <div className="relative z-10 flex flex-col gap-6 max-w-4xl">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-brand-default text-text-brand-on text-[10px] font-bold uppercase tracking-widest w-fit animate-pulse">
           <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
           Sistema Activo
        </div>
        
        <h1 className="text-title-hero text-text-default-default leading-[1.1]">
          Tu portal definitivo <br/>
          al <span className="bg-gradient-to-r from-brand-default via-text-default-default to-brand-default bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">universo Gacha</span>.
        </h1>
        
        <p className="text-subtitle text-text-default-secondary max-w-2xl leading-relaxed">
          Noticias en tiempo real, códigos oficiales y cronogramas de eventos de todos tus juegos favoritos centralizados en una interfaz de vanguardia.
        </p>
        
        <div className="flex flex-wrap gap-4 mt-2">
           <Link href="/juegos" className="px-6 py-3 bg-brand-default text-text-brand-on rounded-xl text-body-strong hover:scale-[1.02] transition-transform active:scale-95 shadow-lg">
             Explorar Catálogo
           </Link>
           <Link href="/noticias" className="px-6 py-3 bg-background-tertiary text-text-default-default border border-border-default-default rounded-xl text-body-strong hover:bg-background-default transition-colors">
             Últimas Noticias
           </Link>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    // div en lugar de main — el <main> ya lo provee ClientLayout
    <div className="col-span-full space-y-16">
      <HeroSection />
      <NewsBentoGrid />
      <ActiveCodes />
      <EventsTimeline />
    </div>
  );
}
