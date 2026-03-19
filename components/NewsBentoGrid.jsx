"use client";

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';



export default function NewsBentoGrid() {
    return (
        <section className="
            grid w-full font-sans
            /* Parent Grid Config (7 Breakpoints) */
            /* XXS (Base < 540px) */
            grid-cols-4 gap-4 grid-rows-[29px_repeat(5,240px)_46px]
            /* XS (540px - 767px) */
            xs:grid-rows-[29px_repeat(6,240px)_46px]
            /* S (768px - 1023px) */
            sm:grid-cols-8 sm:gap-6 sm:grid-rows-[46px_repeat(4,240px)]
            /* M (1024px - 1279px) */
            md:grid-cols-12 md:grid-rows-[46px_repeat(4,240px)]
            /* L (1280px - 1535px) */
            lg:grid-rows-[46px_repeat(3,240px)]
            /* XL (1536px - 1919px) */
            xl:grid-rows-[46px_repeat(3,240px)]
            /* XXL (>= 1920px) */
            2xl:grid-rows-[46px_repeat(4,240px)]
            grid-auto-rows-[240px]
        ">
            {/* 1. Header (Fila 1) */}
            <div className="
                row-start-1 col-start-1 col-span-4
                sm:col-span-8 
                md:col-span-12
                flex items-center justify-between
            ">
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

            {/* 2. 6 Tarjetas (Priority Order: Card-1 to Card-6) */}

            {/* Card-1 (Red) */}
            <div className="
                bg-red-500/10 border border-red-500/20 rounded-xl w-full h-full flex items-center justify-center text-red-500/40 font-bold text-xl
                col-start-1 col-span-4 row-start-2 row-span-2
                sm:col-span-8
                md:col-span-12
                lg:col-span-6
            ">
                Card-1 (Red)
            </div>

            {/* Card-2 (Yellow) */}
            <div className="
                bg-yellow-500/10 border border-yellow-500/20 rounded-xl w-full h-full flex items-center justify-center text-yellow-500/40 font-bold
                col-start-1 col-span-4 row-start-5 row-span-1
                xs:row-start-4
                sm:col-start-5 sm:col-span-4 sm:row-start-4
                md:col-start-7 md:col-span-6
                lg:col-start-1 lg:col-span-6
            ">
                Card-2 (Yellow)
            </div>

            {/* Card-3 (Light green) */}
            <div className="
                bg-lime-500/10 border border-lime-500/20 rounded-xl w-full h-full flex items-center justify-center text-lime-500/40 font-bold
                col-start-1 col-span-2 row-start-4 row-span-1
                xs:row-start-6 xs:row-span-2
                sm:row-start-4 sm:row-span-2
                md:col-span-3
                lg:col-start-7 lg:row-start-3
            ">
                Card-3 (Light green)
            </div>

            {/* Card-4 (Base green) */}
            <div className="
                bg-green-500/10 border border-green-500/20 rounded-xl w-full h-full flex items-center justify-center text-green-500/40 font-bold
                col-start-3 col-span-2 row-start-4 row-span-1
                xs:row-start-5 xs:row-span-2
                sm:row-start-4 sm:row-span-2
                md:col-start-4 md:col-span-3 md:row-start-4 md:row-span-2
                lg:col-start-10 lg:row-start-2 lg:row-span-2
            ">
                Card-4 (Base green)
            </div>

            {/* Card-5 (Dark green) */}
            <div className="
                bg-emerald-700/10 border border-emerald-700/20 rounded-xl w-full h-full flex items-center justify-center text-emerald-700/40 font-bold
                col-start-1 col-span-2 row-start-6 row-span-1
                xs:row-start-5
                sm:col-start-5 sm:row-start-5
                md:col-start-7 md:col-span-3
                lg:row-start-2
            ">
                Card-5 (Dark green)
            </div>

            {/* Card-6 (Brown) */}
            <div className="
                bg-amber-900/10 border border-amber-900/20 rounded-xl w-full h-full flex items-center justify-center text-amber-900/40 font-bold
                col-start-3 col-span-2 row-start-6 row-span-1
                xs:row-start-7
                sm:col-start-7 sm:row-start-5
                md:col-start-10 md:col-span-3
                lg:row-start-4 lg:row-span-3
            ">
                Card-6 (Brown)
            </div>

            {/* 3. Button (Mobile only at the end) */}
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
