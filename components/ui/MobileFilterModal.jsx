import { useEffect } from 'react';
import { X } from 'lucide-react';

export default function MobileFilterModal({ isOpen, onClose, title = "Filtros", children, onShowResults }) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] lg:hidden flex justify-end">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
                onClick={onClose}
            />
            <aside className="relative w-[85%] max-w-sm h-full bg-background-default border-l border-border-default-secondary shadow-2xl flex flex-col animate-in slide-in-from-right-full duration-300">
                <div className="flex items-center justify-between p-4 border-b border-border-default-secondary shrink-0">
                    <h3 className="text-heading text-text-default-default">{title}</h3>
                    <button
                        onClick={onClose}
                        className="p-2 text-text-default-secondary hover:text-text-default-default bg-background-secondary hover:bg-background-secondary-hover rounded-full transition-colors"
                        aria-label="Cerrar filtros"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                    {children}
                </div>
                
                <div className="p-4 border-t border-border-default-secondary bg-background-default pb-safe shrink-0">
                    <button
                        onClick={onShowResults || onClose}
                        className="w-full py-3 bg-brand-default text-text-brand-on rounded-xl text-body-strong hover:brightness-110 shadow-md transition-all active:scale-[0.98]"
                    >
                        Mostrar resultados
                    </button>
                </div>
            </aside>
        </div>
    );
}
