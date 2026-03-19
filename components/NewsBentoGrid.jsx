"use client";

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';



export default function NewsBentoGrid() {
    return (
        <section className="
            grid w-full font-sans
            /* Mobile < 470px (XXS) */
            grid-cols-4 gap-4 grid-rows-[29px_repeat(5,240px)_46px]
            /* Mobile 470px - 767px (XS) */
            xs:grid-rows-[29px_repeat(6,240px)_46px]
            /* Tablet 768px - 1023px (S) */
            sm:grid-cols-8 sm:gap-6 sm:grid-rows-[46px_repeat(4,240px)]
            /* Tablet 1024px - 1199px (M) */
            md:grid-cols-12 md:grid-rows-[46px_repeat(4,240px)]
            /* Desktop 1200px - 1549px (L) */
            lg:grid-rows-[46px_repeat(3,240px)]
            /* Desktop >= 1550px (XL) */
            xl:grid-rows-[46px_repeat(4,240px)]
        ">
            {/* 1. Heading (Fila 1) */}
            <div className="row-start-1 col-span-full flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">
                    Noticias Destacadas
                </h2>
                {/* Botón visible solo en Tablet/Desktop en Fila 1 */}
                <Link
                    href="/noticias"
                    className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary hover:bg-accent text-secondary-foreground transition-colors font-medium text-sm"
                >
                    Ver todas las noticias
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>

            {/* 2. 6 Tarjetas (Placeholders con jerarquía visual de 4 niveles) */}

            {/* Card 1: Noticia Nivel 1 - Hero/Grande */}
            <div className="bg-red-500/5 border border-red-500/20 rounded-xl w-full h-full col-span-4 row-span-2 min-[768px]:col-span-8 min-[1024px]:col-span-12 min-[1200px]:col-span-6 flex items-center justify-center text-red-500/40 font-bold text-xl">
                Tile 1
            </div>

            {/* Card 2: Noticia Nivel 2 - Mediana */}
            <div className="bg-green-500/5 border border-green-500/20 rounded-xl w-full h-full col-span-4 row-span-1 min-[1024px]:col-span-6 flex items-center justify-center text-green-500/40 font-bold">
                Tile 2
            </div>

            {/* Card 3: Noticia Nivel 3 - Pequeña 1 */}
            <div className="bg-teal-500/5 border border-teal-500/20 rounded-xl w-full h-full col-span-2 row-span-1 min-[470px]:col-span-2 min-[470px]:row-span-2 min-[1024px]:col-span-3 flex items-center justify-center text-teal-500/40 font-bold">
                Tile 3
            </div>

            {/* Card 4: Noticia Nivel 3 - Pequeña 2 */}
            <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl w-full h-full col-span-2 row-span-1 min-[470px]:col-span-2 min-[470px]:row-span-2 min-[1024px]:col-span-3 flex items-center justify-center text-yellow-500/40 font-bold">
                Tile 4
            </div>

            {/* Card 5: Noticia Nivel 4 - Mini 1 */}
            <div className="bg-amber-900/5 border border-amber-900/20 rounded-xl w-full h-full col-span-2 row-span-1 min-[1024px]:col-span-3 flex items-center justify-center text-amber-900/40 font-bold">
                Tile 5
            </div>

            {/* Card 6: Noticia Nivel 4 - Mini 2 */}
            <div className="bg-emerald-950/5 border border-emerald-950/20 rounded-xl w-full h-full col-span-2 row-span-1 min-[1024px]:col-span-3 flex items-center justify-center text-emerald-950/40 font-bold">
                Tile 6
            </div>

            {/* 3. Botón "Todas las noticias" (Mobile) */}
            {/* Ocupa Fila 7 en XXS y Fila 8 en XS */}
            <Link
                href="/noticias"
                className="
                    sm:hidden col-span-full flex items-center justify-center gap-2 
                    rounded-lg bg-secondary hover:bg-accent text-secondary-foreground 
                    transition-colors font-medium text-sm w-full h-full
                    row-start-7 xs:row-start-8
                "
            >
                Ver todas las noticias
                <ArrowRight className="w-4 h-4" />
            </Link>
        </section>
    );
}
