'use client';

import { SearchX, RotateCcw } from 'lucide-react';

/**
 * EmptyState Component
 * 
 * Displayed when no results are found for the current filters or search query.
 * 
 * @param {Function} onClear - Callback to reset/clear filters
 * @param {string} title - Main error message (optional)
 * @param {string} subtitle - Secondary descriptive text (optional)
 */
export default function EmptyState({ 
    onClear, 
    title = "No se encontraron resultados", 
    subtitle = "Prueba a ajustar tus filtros o realiza una búsqueda diferente para encontrar lo que buscas." 
}) {
    return (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-background-secondary border border-dashed border-border-default-secondary rounded-3xl gap-6 animate-in fade-in zoom-in duration-500">
            {/* Ícono Ilustrativo */}
            <div className="relative group">
                <div className="absolute inset-0 bg-brand-default/10 rounded-full blur-2xl group-hover:bg-brand-default/20 transition-colors duration-500" />
                <div className="relative p-6 bg-background-tertiary rounded-full border border-border-default-secondary shadow-sm">
                    <SearchX className="w-12 h-12 text-text-default-tertiary transition-transform duration-500 group-hover:scale-110" />
                </div>
            </div>

            {/* Texto informativo */}
            <div className="max-w-md space-y-2">
                <h3 className="text-heading text-text-default-default">
                    {title}
                </h3>
                <p className="text-body-base text-text-default-tertiary leading-relaxed">
                    {subtitle}
                </p>
            </div>

            {/* Botón de acción */}
            {onClear && (
                <button 
                    onClick={onClear}
                    className="
                        flex items-center gap-2.5 px-8 py-3 
                        bg-background-default border border-border-default-secondary 
                        rounded-xl text-body-small-strong text-text-default-default
                        hover:bg-background-secondary-hover hover:border-brand-default/50 
                        hover:shadow-md transition-all duration-300
                    "
                >
                    <RotateCcw className="w-4.5 h-4.5 text-brand-default" />
                    Limpiar todos los filtros
                </button>
            )}
        </div>
    );
}
