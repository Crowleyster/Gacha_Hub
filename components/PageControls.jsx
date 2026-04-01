"use client";

import { useState } from 'react';
import { Filter, LayoutGrid, List, Check } from 'lucide-react';
import MobileFilterModal from './ui/MobileFilterModal';

/**
 * PageControls Component
 * 
 * Unifica la barra de controles (Escritorio/Mobile) y el modal de filtros.
 * 
 * @param {Object} props
 * @param {ReactNode} props.filters - Los dropdows de filtros específicos de la página
 * @param {Object} props.sortOptions - Mapa de opciones de ordenamiento { id, label, icon }
 * @param {string} props.sortMode - Modo de ordenamiento actual
 * @param {Function} props.onSortChange - Callback para cambiar el orden
 * @param {string} props.viewMode - Modo de vista actual ('grid' | 'list')
 * @param {Function} props.onViewChange - Callback para cambiar el modo de vista
 * @param {boolean} props.hasActiveFilters - Indica si hay filtros aplicados
 */
export default function PageControls({
    filters,
    sortOptions = [],
    sortMode,
    onSortChange,
    viewMode,
    onViewChange,
    hasActiveFilters = false
}) {
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    return (
        <div className="space-y-3">
            <div className="flex flex-col lg:flex-row lg:items-end gap-3 bg-background-secondary border border-border-default-secondary p-4 rounded-2xl shadow-sm">
                
                {/* --- CONTROLES MOBILE / TABLET / LAPTOP (Hasta 1536px) --- */}
                <div className="2xl:hidden flex items-center justify-between gap-3 w-full">
                    <button
                        onClick={() => setIsMobileFilterOpen(true)}
                        className="flex items-center justify-center gap-2 h-11 px-4 flex-1 sm:flex-none bg-background-tertiary border border-border-default-secondary rounded-xl shadow-100 text-body-small-strong text-text-default-default hover:bg-background-secondary-hover transition-colors relative"
                    >
                        <Filter className="w-5 h-5" /> Filtrar y Ordenar
                        {hasActiveFilters && (
                            <span className="w-2.5 h-2.5 bg-brand-default rounded-full border border-background-default absolute top-2 right-2"></span>
                        )}
                    </button>

                    <div className="flex items-center bg-background-tertiary p-1 rounded-xl border border-border-default-secondary shrink-0">
                        <button 
                            onClick={() => onViewChange('grid')} 
                            className={`flex items-center justify-center w-[34px] h-[34px] rounded-lg transition-all ${viewMode === 'grid' ? 'bg-background-default text-text-default-default shadow-sm' : 'text-text-default-tertiary hover:text-text-default-default'}`}
                        >
                            <LayoutGrid className="w-4 h-4" />
                        </button>
                        <button 
                            onClick={() => onViewChange('list')} 
                            className={`flex items-center justify-center w-[34px] h-[34px] rounded-lg transition-all ${viewMode === 'list' ? 'bg-background-default text-text-default-default shadow-sm' : 'text-text-default-tertiary hover:text-text-default-default'}`}
                        >
                            <List className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* --- CONTROLES DESKTOP LARGE (Desde 1536px) --- */}
                <div className="hidden 2xl:flex flex-col items-stretch gap-4 flex-1">
                    {filters}
                </div>

                <div className="hidden 2xl:flex items-center gap-3 shrink-0 ml-auto self-end">
                    {/* Sort Selector Desktop */}
                    <div className="flex flex-col gap-1.5 shrink-0 min-w-[160px]">
                        <span className="text-badge text-text-default-tertiary px-1">Ordenar por</span>
                        <div className="relative group/select">
                            <select
                                value={sortMode}
                                onChange={(e) => onSortChange(e.target.value)}
                                className="w-full h-11 pl-4 pr-10 bg-background-tertiary border border-border-default-secondary rounded-xl text-body-small-strong text-text-default-default appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-default/20 transition-all hover:border-border-default-default"
                            >
                                {sortOptions.map((opt) => (
                                    <option key={opt.id} value={opt.id} className="bg-background-secondary text-text-default-default">
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-default-tertiary group-hover/select:text-text-default-default transition-colors">
                                <Filter className="w-3.5 h-3.5" />
                            </div>
                        </div>
                    </div>

                    <div className="w-px h-10 bg-border-default-secondary mx-1" />

                    {/* View Mode Desktop */}
                    <div className="flex flex-col gap-1.5 shrink-0">
                        <span className="text-[10px] uppercase tracking-wider font-bold text-text-default-tertiary px-1">Vista</span>
                        <div className="flex items-center bg-background-tertiary p-1 rounded-xl border border-border-default-secondary">
                            <button onClick={() => onViewChange('grid')} className={`flex items-center justify-center w-9 h-9 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-background-default text-text-default-default shadow-100' : 'text-text-default-tertiary hover:text-text-default-default'}`}>
                                <LayoutGrid className="w-4 h-4" />
                            </button>
                            <button onClick={() => onViewChange('list')} className={`flex items-center justify-center w-9 h-9 rounded-lg transition-all ${viewMode === 'list' ? 'bg-background-default text-text-default-default shadow-100' : 'text-text-default-tertiary hover:text-text-default-default'}`}>
                                <List className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal de Filtros (Mobile/Tablet) */}
            <MobileFilterModal 
                isOpen={isMobileFilterOpen} 
                onClose={() => setIsMobileFilterOpen(false)}
            >
                <div className="flex flex-col gap-8">
                    {/* Sort Section */}
                    <section className="flex flex-col gap-3">
                        <h4 className="text-body-small-strong text-text-default-tertiary uppercase tracking-wider">Ordenar por</h4>
                        <div className="grid grid-cols-1 gap-2">
                            {sortOptions.map(({ id, label, icon: Icon }) => {
                                const isActive = sortMode === id;
                                return (
                                    <button
                                        key={id}
                                        onClick={() => {
                                            onSortChange(id);
                                            // Optional: Close on select on mobile? (The user might prefer this)
                                        }}
                                        className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${isActive ? 'bg-brand-default/5 border-brand-default text-brand-default' : 'bg-background-secondary border-border-default-secondary text-text-default-secondary'}`}
                                    >
                                        {Icon && <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-brand-default' : 'text-text-default-tertiary'}`} />}
                                        <span className="text-body-strong flex-1 text-left">{label}</span>
                                        {isActive && <Check className="w-5 h-5 text-brand-default shrink-0" />}
                                    </button>
                                );
                            })}
                        </div>
                    </section>

                    <hr className="border-border-default-secondary" />

                    {/* Filters Section */}
                    <section className="flex flex-col gap-3">
                        <h4 className="text-body-small-strong text-text-default-tertiary uppercase tracking-wider">Filtros</h4>
                        {filters}
                    </section>
                </div>
            </MobileFilterModal>
        </div>
    );
}
