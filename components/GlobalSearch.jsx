"use client";

import { useState, useEffect, useRef, useMemo } from 'react';
import { Search, X, Gamepad2, Newspaper, Calendar } from 'lucide-react';
import { GAMES_DATA } from '@/lib/games-data';
import Link from 'next/link';

export default function GlobalSearch({ isOpen, onClose, onOpen }) {
    const [query, setQuery] = useState('');
    const [filters, setFilters] = useState({
        juegos: true,
        noticias: true,
        eventos: true,
    });
    
    const inputRef = useRef(null);

    // Manejar atajos de teclado (Ctrl+K o "/")
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                onOpen();
            }
            if (e.key === '/' && !isOpen && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
                e.preventDefault();
                onOpen();
            }
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onOpen, onClose]);

    // Focus automático al abrir
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setTimeout(() => inputRef.current?.focus(), 100);
        } else {
            document.body.style.overflow = '';
            setQuery(''); // reset al cerrar (opcional)
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    // Combinar los datos para el buscador
    const allItems = useMemo(() => {
        const items = [];
        
        Object.values(GAMES_DATA).forEach(game => {
            // 1. Agregar Juego
            items.push({
                type: 'juego',
                id: game.id,
                title: game.name,
                subtitle: game.developer,
                icon: <Gamepad2 className="w-5 h-5 text-brand-default" />,
                url: `/juegos/${game.id}`,
            });

            // 2. Agregar Noticias
            if (game.news) {
                game.news.forEach(n => {
                    items.push({
                        type: 'noticia',
                        id: n.id,
                        title: n.title,
                        subtitle: `${game.shortName} • ${new Date(n.date).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}`,
                        icon: <Newspaper className="w-5 h-5 text-blue-500" />,
                        url: `/noticias/${n.id}`, // Asumiendo que /noticias/[id] existe o existirá
                    });
                });
            }

            // 3. Agregar Eventos
            if (game.events) {
                game.events.forEach(e => {
                    items.push({
                        type: 'evento',
                        id: e.id,
                        title: e.name,
                        subtitle: `${game.shortName} • Evento`,
                        icon: <Calendar className="w-5 h-5 text-orange-500" />,
                        url: `/eventos`, // Como eventos no tiene slug propio aún, llevamos a la página general
                    });
                });
            }
        });
        
        return items;
    }, []);

    // Filtrar resultados
    const filteredResults = useMemo(() => {
        if (!query.trim()) return [];

        const lowerQuery = query.toLowerCase();
        
        return allItems.filter(item => {
            // 1. Validar filtros (checkboxes)
            if (item.type === 'juego' && !filters.juegos) return false;
            if (item.type === 'noticia' && !filters.noticias) return false;
            if (item.type === 'evento' && !filters.eventos) return false;

            // 2. Validar query
            return item.title.toLowerCase().includes(lowerQuery) || item.subtitle.toLowerCase().includes(lowerQuery);
        }).slice(0, 10); // Limitar a 10 resultados para performance visual
    }, [allItems, query, filters]);

    if (!isOpen) return null;

    const toggleFilter = (key) => setFilters(prev => ({ ...prev, [key]: !prev[key] }));

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] sm:pt-[15vh] px-4 font-sans">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-2xl bg-background-default border border-border-default-secondary shadow-2xl rounded-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
                
                {/* Header / Input */}
                <div className="flex items-center px-4 py-3 border-b border-border-default-secondary">
                    <Search className="w-5 h-5 text-text-default-secondary mr-3 shrink-0" />
                    <input 
                        ref={inputRef}
                        type="text"
                        placeholder="Buscar juegos, noticias (Ctrl+K)..."
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        className="flex-1 bg-transparent text-body-strong text-text-default-default placeholder:text-text-default-tertiary focus:outline-none"
                    />
                    <button 
                        onClick={onClose}
                        className="p-1 text-text-default-tertiary hover:text-text-default-default bg-background-tertiary rounded-md px-2 text-badge font-bold tracking-widest sm:hidden"
                    >
                        ESC
                    </button>
                    <div className="hidden sm:flex text-badge items-center gap-1 font-bold text-text-default-tertiary tracking-widest bg-background-tertiary px-2 py-1 rounded-md">
                        ESC
                    </div>
                </div>

                {/* Filtros */}
                <div className="flex items-center gap-4 px-4 py-3 bg-background-secondary border-b border-border-default-secondary text-body-small">
                    <span className="text-text-default-tertiary font-medium">Buscar en:</span>
                    <label className="flex items-center gap-2 cursor-pointer text-text-default-secondary hover:text-text-default-default">
                        <input type="checkbox" checked={filters.juegos} onChange={() => toggleFilter('juegos')} className="accent-brand-default" /> Juegos
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-text-default-secondary hover:text-text-default-default">
                        <input type="checkbox" checked={filters.noticias} onChange={() => toggleFilter('noticias')} className="accent-brand-default" /> Noticias
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-text-default-secondary hover:text-text-default-default">
                        <input type="checkbox" checked={filters.eventos} onChange={() => toggleFilter('eventos')} className="accent-brand-default" /> Eventos
                    </label>
                </div>

                {/* Resultados */}
                <div className="max-h-[50vh] overflow-y-auto custom-scrollbar p-2 flex flex-col">
                    {query.trim() === '' ? (
                        <div className="flex flex-col items-center justify-center py-10 text-text-default-tertiary gap-2">
                            <Search className="w-8 h-8 opacity-50" />
                            <p className="text-body-small">Escribe para empezar a buscar...</p>
                        </div>
                    ) : filteredResults.length > 0 ? (
                        filteredResults.map((item, idx) => (
                            <Link 
                                href={item.url} 
                                key={`${item.type}-${item.id}-${idx}`}
                                onClick={onClose}
                                className="flex items-center gap-4 p-3 hover:bg-background-tertiary rounded-xl transition-colors group"
                            >
                                <div className="p-2 bg-background-default border border-border-default-secondary rounded-lg group-hover:bg-background-secondary transition-colors">
                                    {item.icon}
                                </div>
                                <div className="flex flex-col flex-1 min-w-0">
                                    <span className="text-body-strong text-text-default-default truncate">{item.title}</span>
                                    <span className="text-body-small text-text-default-secondary truncate">{item.subtitle}</span>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center py-10 text-text-default-tertiary">
                            <p className="text-body-small">No se encontraron resultados para "{query}"</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
