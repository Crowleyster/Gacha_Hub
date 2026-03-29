"use client";

import { useState, useRef, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { Copy, Check, Ticket, ChevronLeft, ChevronRight, Clock, ChevronDown } from 'lucide-react';
import { CODES_DATA } from '@/lib/mock-data';
import SectionHeader from './SectionHeader';

/* ─── Code Card ─────────────────────────────────────────────────────── */
function CodeCard({ item, onCopy, isCopied }) {
    return (
        <div className="flex-shrink-0 snap-start w-[85vw] min-[480px]:w-72 md:w-80 bg-background-secondary border border-border-default-secondary rounded-xl p-4 flex flex-col gap-3 hover:bg-background-secondary-hover hover:border-border-default-default transition-all duration-300 group/card">

            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 overflow-hidden">
                    {item.gameIcon && (
                        <div className="relative w-5 h-5 shrink-0 rounded-full border border-border-default-secondary overflow-hidden">
                             <Image src={item.gameIcon} alt={item.gameName || ''} fill sizes="20px" className="object-cover" />
                        </div>
                    )}
                    <code className="font-mono text-body-strong text-text-default-default tracking-wider truncate">
                        {item.code}
                    </code>
                </div>
                <button
                    onClick={() => onCopy(item.code)}
                    aria-label={isCopied ? "Código copiado con éxito" : `Copiar código: ${item.code}`}
                    className={`shrink-0 flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 relative overflow-hidden ${isCopied ? 'bg-emerald-500 text-white scale-95' : 'bg-background-tertiary hover:bg-brand-default hover:text-text-brand-on text-text-default-secondary shadow-sm'}`}
                >
                    {isCopied ? (
                        <Check className="w-5 h-5" />
                    ) : (
                        <Copy className="w-5 h-5 group-hover/card:scale-110 transition-transform" />
                    )}
                    
                    {isCopied && (
                        <span className="absolute inset-0 flex items-center justify-center bg-emerald-500 text-[8px] font-bold uppercase tracking-tighter animate-out fade-out slide-out-to-top-4 fill-mode-forwards duration-700">
                            Copiado
                        </span>
                    )}
                </button>
            </div>
            <p className="text-body-small text-text-default-secondary leading-relaxed line-clamp-2">
                {item.rewards}
            </p>
            {item.expires && (
                <div className="flex items-center gap-1.5 text-text-default-tertiary mt-auto pt-1 border-t border-border-default-secondary">
                    <Clock className="w-3 h-3 shrink-0" aria-hidden="true" />
                    <span className="text-body-small">Expira: {item.expires}</span>
                </div>
            )}
        </div>
    );
}

/* ─── Game Dropdown ──────────────────────────────────────────────────── */
const ALL_GAMES = "Todos los juegos";

function GameDropdown({ games, selected, onSelect }) {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setIsOpen(false); };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const gameList = [ALL_GAMES, ...games];

    const getGameData = (name) => {
        if (name === ALL_GAMES) {
            const total = Object.values(CODES_DATA).reduce((acc, g) => acc + g.codes.length, 0);
            return { icon: null, total };
        }
        const data = CODES_DATA[name];
        return { icon: data.icon, total: data.codes.length };
    };

    const selectedData = getGameData(selected);

    return (
        <div ref={ref} className="relative w-full sm:w-auto">
            <button
                onClick={() => setIsOpen(v => !v)}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                className="flex items-center gap-3 w-full sm:w-auto px-4 py-2.5 rounded-xl bg-background-secondary border border-border-default-default hover:bg-background-secondary-hover text-text-default-default text-body-small-strong transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-default/30"
            >
                {selectedData?.icon ? (
                    <div className="relative w-6 h-6 shrink-0">
                        <Image src={selectedData.icon} alt={selected} fill sizes="24px" className="rounded-full object-cover" />
                    </div>
                ) : (
                    <Ticket className="w-5 h-5 text-text-brand-default shrink-0" />
                )}
                <span className="flex-1 text-left truncate">{selected}</span>
                <span className="px-1.5 py-0.5 rounded-md text-body-small bg-background-tertiary text-text-default-secondary shrink-0">
                    {selectedData?.total}
                </span>
                <ChevronDown className={`w-4 h-4 shrink-0 text-text-default-secondary transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div role="listbox" aria-label="Seleccionar juego" className="absolute top-full left-0 mt-2 z-30 w-full sm:w-72 bg-background-default border border-border-default-default rounded-xl shadow-400 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                    <ul className="flex flex-col max-h-80 overflow-y-auto">
                        {gameList.map(game => {
                            const data = getGameData(game);
                            const isActive = game === selected;
                            return (
                                <li key={game}>
                                    <button
                                        role="option"
                                        aria-selected={isActive}
                                        onClick={() => { onSelect(game); setIsOpen(false); }}
                                        className={`flex items-center gap-3 w-full px-4 py-3 text-body-small-strong text-left transition-colors duration-150 ${isActive ? 'bg-brand-default text-text-brand-on' : 'text-text-default-default hover:bg-background-secondary'}`}
                                    >
                                        {data?.icon ? (
                                            <div className="relative w-7 h-7 shrink-0">
                                                <Image src={data.icon} alt={game} fill sizes="28px" className="rounded-full object-cover" />
                                            </div>
                                        ) : (
                                            <Ticket className={`w-6 h-6 shrink-0 ${isActive ? 'text-text-brand-on' : 'text-text-brand-default'}`} />
                                        )}
                                        <span className="flex-1 truncate">{game}</span>
                                        <span className={`px-1.5 py-0.5 rounded-md text-body-small shrink-0 ${isActive ? 'bg-text-brand-on/10 text-text-brand-on' : 'bg-background-tertiary text-text-default-secondary'}`}>
                                            {data?.total}
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
export default function ActiveCodes({ fixedGame = null, hideHeader = false }) {
    const games = Object.keys(CODES_DATA);
    
    // Si hay un juego fijo, lo usamos. Si no, usamos ALL_GAMES.
    const [selectedGame, setSelectedGame] = useState(fixedGame || ALL_GAMES);
    const [copiedCode, setCopiedCode] = useState(null);
    const carouselRef = useRef(null);

    // Actualizar el juego seleccionado si fixedGame cambia (ej. navegando entre hubs)
    useEffect(() => {
        if (fixedGame) setSelectedGame(fixedGame);
    }, [fixedGame]);

    const handleCopy = (code) => {
        navigator.clipboard.writeText(code).catch(() => { });
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(null), 2000);
    };

    const scroll = (dir) => {
        if (!carouselRef.current) return;
        carouselRef.current.scrollBy({ left: dir * 300, behavior: 'smooth' });
    };

    // Flatten and Sort Codes
    const codes = useMemo(() => {
        let list = [];
        const target = fixedGame || selectedGame;

        if (target === ALL_GAMES) {
            Object.entries(CODES_DATA).forEach(([gameName, data]) => {
                data.codes.forEach(c => {
                    list.push({ ...c, gameName, gameIcon: data.icon });
                });
            });
        } else if (CODES_DATA[target]) {
            const data = CODES_DATA[target];
            list = data.codes.map(c => ({ ...c, gameName: target, gameIcon: data.icon }));
        }

        return list.sort((a, b) => new Date(a.expires) - new Date(b.expires));
    }, [selectedGame, fixedGame]);

    return (
        <section className="col-span-full flex flex-col gap-6 font-sans">
            {!hideHeader && (
                <div className="flex flex-col gap-6">
                    <SectionHeader 
                        icon={Ticket}
                        title="Códigos"
                        subtitle="Activos"
                    />
                    <div className="flex justify-end mt-2 sm:-mt-12 mb-2 relative z-10 w-full sm:w-auto">
                        <GameDropdown games={games} selected={selectedGame} onSelect={setSelectedGame} />
                    </div>
                </div>
            )}

            <div className="relative group">
                <button 
                  onClick={() => scroll(-1)} 
                  aria-label="Anterior" 
                  className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-10 h-10 items-center justify-center rounded-full bg-background-default border border-border-default-default text-text-default-secondary hover:text-brand-default hover:border-brand-default shadow-400 transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => scroll(1)} 
                  aria-label="Siguiente" 
                  className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-10 h-10 items-center justify-center rounded-full bg-background-default border border-border-default-default text-text-default-secondary hover:text-brand-default hover:border-brand-default shadow-400 transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>

                <div 
                  ref={carouselRef} 
                  className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 -mx-4 px-4 scroll-pl-4 md:-mx-6 md:px-6 md:scroll-pl-6 xl:mx-0 xl:px-0 xl:scroll-pl-0"
                >
                    {codes.map((item) => (
                        <CodeCard
                            key={`${item.gameName}-${item.code}`}
                            item={item}
                            isCopied={copiedCode === item.code}
                            onCopy={handleCopy}
                        />
                    ))}
                    <div className="w-1 md:w-4 lg:w-8 shrink-0" aria-hidden="true" />
                </div>
            </div>

            {codes.length === 0 && (
                <div className="flex flex-col items-center justify-center gap-2 py-12 text-text-default-secondary">
                    <Ticket className="w-8 h-8 opacity-40" />
                    <p className="text-body-base">No hay códigos activos disponibles.</p>
                </div>
            )}
        </section>
    );
}
