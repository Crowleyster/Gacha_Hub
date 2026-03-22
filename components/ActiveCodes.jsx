"use client";

import { useState, useRef, useEffect } from 'react';
import { Copy, Check, Ticket, ChevronLeft, ChevronRight, Clock, ChevronDown } from 'lucide-react';
import { CODES_DATA } from '@/lib/mock-data';

/* ─── Code Card ─────────────────────────────────────────────────────── */
function CodeCard({ item, onCopy, isCopied }) {
    return (
        <div className="
            flex-shrink-0 snap-start
            w-[260px] sm:w-auto
            bg-background-secondary border border-border-default-secondary
            rounded-xl p-4 flex flex-col gap-3
            hover:bg-background-secondary-hover hover:border-border-default-default
            transition-all duration-200
        ">
            {/* Code + Copy Button */}
            <div className="flex items-center justify-between gap-3">
                <code className="font-mono text-body-strong text-text-default-default tracking-wider truncate">
                    {item.code}
                </code>
                <button
                    onClick={() => onCopy(item.code)}
                    aria-label={isCopied ? "Copiado" : "Copiar código"}
                    className={`
                        shrink-0 flex items-center justify-center w-9 h-9 rounded-lg
                        transition-all duration-200
                        ${isCopied
                            ? 'bg-brand-default text-text-brand-on scale-95'
                            : 'bg-background-tertiary hover:bg-background-secondary-hover text-text-default-secondary hover:text-text-default-default'
                        }
                    `}
                >
                    {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
            </div>

            {/* Rewards */}
            <p className="text-body-small text-text-default-secondary leading-relaxed line-clamp-2">
                {item.rewards}
            </p>

            {/* Expiry */}
            {item.expires && (
                <div className="flex items-center gap-1.5 text-text-default-tertiary mt-auto pt-1 border-t border-border-default-secondary">
                    <Clock className="w-3 h-3 shrink-0" />
                    <span className="text-body-small">Expira: {item.expires}</span>
                </div>
            )}
        </div>
    );
}

/* ─── Game Dropdown ──────────────────────────────────────────────────── */
function GameDropdown({ games, selected, onSelect }) {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);

    // Close on click outside
    useEffect(() => {
        const handler = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    // Close on Escape
    useEffect(() => {
        const handler = (e) => { if (e.key === 'Escape') setIsOpen(false); };
        document.addEventListener('keydown', handler);
        return () => document.removeEventListener('keydown', handler);
    }, []);

    const selectedData = CODES_DATA[selected];

    return (
        <div ref={ref} className="relative w-full sm:w-auto">
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(v => !v)}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                className="
                    flex items-center gap-3 w-full sm:w-auto
                    px-4 py-2.5 rounded-xl
                    bg-background-secondary border border-border-default-default
                    hover:bg-background-secondary-hover
                    text-text-default-default text-body-small-strong
                    transition-all duration-200 cursor-pointer
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-default/30
                "
            >
                {/* Selected game icon + name */}
                {selectedData?.icon && (
                    <img
                        src={selectedData.icon}
                        alt={selected}
                        className="w-6 h-6 rounded-full object-cover shrink-0"
                    />
                )}
                <span className="flex-1 text-left truncate">{selected}</span>

                {/* Badge with code count */}
                <span className="
                    px-1.5 py-0.5 rounded-md text-body-small
                    bg-background-tertiary text-text-default-secondary
                    shrink-0
                ">
                    {selectedData?.codes?.length ?? 0}
                </span>

                <ChevronDown className={`w-4 h-4 shrink-0 text-text-default-secondary transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Panel */}
            {isOpen && (
                <div
                    role="listbox"
                    aria-label="Seleccionar juego"
                    className="
                        absolute top-full left-0 mt-2 z-30
                        w-full sm:w-72
                        bg-background-default border border-border-default-default
                        rounded-xl shadow-400 overflow-hidden
                        animate-in fade-in zoom-in-95 duration-150
                    "
                >
                    <ul className="flex flex-col max-h-64 overflow-y-auto">
                        {games.map(game => {
                            const data = CODES_DATA[game];
                            const isActive = game === selected;
                            return (
                                <li key={game}>
                                    <button
                                        role="option"
                                        aria-selected={isActive}
                                        onClick={() => { onSelect(game); setIsOpen(false); }}
                                        className={`
                                            flex items-center gap-3 w-full px-4 py-3
                                            text-body-small-strong text-left
                                            transition-colors duration-150
                                            ${isActive
                                                ? 'bg-brand-default text-text-brand-on'
                                                : 'text-text-default-default hover:bg-background-secondary'
                                            }
                                        `}
                                    >
                                        {data?.icon && (
                                            <img
                                                src={data.icon}
                                                alt={game}
                                                className="w-7 h-7 rounded-full object-cover shrink-0"
                                            />
                                        )}
                                        <span className="flex-1 truncate">{game}</span>
                                        <span className={`
                                            px-1.5 py-0.5 rounded-md text-body-small shrink-0
                                            ${isActive
                                                ? 'bg-text-brand-on/10 text-text-brand-on'
                                                : 'bg-background-tertiary text-text-default-secondary'
                                            }
                                        `}>
                                            {data?.codes?.length ?? 0} códigos
                                        </span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
}

/* ─── Main Component ─────────────────────────────────────────────────── */
export default function ActiveCodes() {
    const games = Object.keys(CODES_DATA);
    const [selectedGame, setSelectedGame] = useState(games[0]);
    const [copiedCode, setCopiedCode] = useState(null);
    const carouselRef = useRef(null);

    const handleCopy = (code) => {
        navigator.clipboard.writeText(code).catch(() => { });
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(null), 2000);
    };

    const scroll = (dir) => {
        if (!carouselRef.current) return;
        carouselRef.current.scrollBy({ left: dir * 280, behavior: 'smooth' });
    };

    const gameData = CODES_DATA[selectedGame];
    const codes = gameData?.codes ?? [];
    const hasMany = codes.length > 3;

    return (
        <section className="col-span-full flex flex-col gap-6 font-sans">

            {/* ── Header + Selector ── */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <Ticket className="w-6 h-6 text-text-brand-default shrink-0" />
                    <h2 className="text-heading text-text-default-default">
                        Códigos Activos
                    </h2>
                </div>

                <GameDropdown
                    games={games}
                    selected={selectedGame}
                    onSelect={setSelectedGame}
                />
            </div>

            {/* ── Codes — Carousel on mobile/tablet, grid on lg+ ── */}
            <div className="relative">

                {/* Carousel Nav arrows (tablet only, visible when >3 cards) */}
                {hasMany && (
                    <>
                        <button
                            onClick={() => scroll(-1)}
                            aria-label="Anterior"
                            className="
                                hidden md:flex lg:hidden
                                absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10
                                w-9 h-9 items-center justify-center rounded-full
                                bg-background-default border border-border-default-default
                                text-text-default-secondary hover:text-text-default-default
                                shadow-300 transition-all duration-200
                            "
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => scroll(1)}
                            aria-label="Siguiente"
                            className="
                                hidden md:flex lg:hidden
                                absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10
                                w-9 h-9 items-center justify-center rounded-full
                                bg-background-default border border-border-default-default
                                text-text-default-secondary hover:text-text-default-default
                                shadow-300 transition-all duration-200
                            "
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </>
                )}

                {/*
                    < lg  → horizontal snap carousel
                    lg+   → 3-col grid
                    xl+   → 4-col grid
                */}
                <div
                    ref={carouselRef}
                    className="
                        flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-none
                        -mx-4 px-4 pb-2
                        lg:grid lg:grid-cols-3 lg:mx-0 lg:px-0 lg:pb-0 lg:overflow-x-visible
                        xl:grid-cols-4
                    "
                >
                    {codes.map((item, idx) => (
                        <CodeCard
                            key={`${selectedGame}-${idx}`}
                            item={item}
                            isCopied={copiedCode === item.code}
                            onCopy={handleCopy}
                        />
                    ))}
                </div>

                {/* Gradient edge hint (mobile/tablet only) */}
                <div className="
                    pointer-events-none absolute right-0 top-0 h-full w-12
                    bg-gradient-to-l from-background-default to-transparent
                    lg:hidden
                " />
            </div>

            {/* ── Empty state ── */}
            {codes.length === 0 && (
                <div className="flex flex-col items-center justify-center gap-2 py-12 text-text-default-secondary">
                    <Ticket className="w-8 h-8 opacity-40" />
                    <p className="text-body-base">No hay códigos activos para este juego en este momento.</p>
                </div>
            )}

        </section>
    );
}
