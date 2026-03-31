"use client";

import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

/**
 * RightSheet Component
 * 
 * Un panel lateral que se desliza desde la derecha.
 * Utiliza Tailwind v4 para animaciones y diseño atómico.
 * 
 * @param {boolean} isOpen - Controla la visibilidad
 * @param {function} onClose - Callback para cerrar el panel
 * @param {string} title - Título opcional en la cabecera
 * @param {ReactNode} children - Contenido del panel
 * @param {string} className - Clases adicionales para el contenedor principal
 */
export default function RightSheet({ isOpen, onClose, title, children, className }) {
    const sheetRef = useRef(null);

    // Bloquear scroll del body y manejar tecla ESC
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleEscape);
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[110] flex justify-end overflow-hidden">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-300 ease-out cursor-pointer"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Panel */}
            <aside
                ref={sheetRef}
                className={cn(
                    "relative w-full sm:w-[460px] h-full bg-background-default border-l border-border-default-secondary shadow-600 flex flex-col",
                    "animate-in slide-in-from-right-full duration-500 ease-out",
                    className
                )}
                role="dialog"
                aria-modal="true"
                aria-label={title || "Panel de detalle"}
            >
                {/* Botón Cerrar Flotante (Header-less) */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 p-2 bg-black/30 backdrop-blur-md text-white rounded-full hover:bg-black/50 transition-colors border border-white/10 shadow-lg"
                    aria-label="Cerrar panel"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Contenido con Scroll */}
                <div className="flex-1 overflow-y-auto custom-scrollbar overflow-x-hidden">
                    {children}
                </div>
            </aside>
        </div>
    );
}
