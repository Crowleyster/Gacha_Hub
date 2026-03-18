"use client";

import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function RightSheet({ isOpen, onClose, title, children }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            const timer = setTimeout(() => setIsVisible(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[60] flex justify-end">
            {/* Backdrop overlay */}
            <div
                className={`
                    absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300
                    ${isOpen ? 'opacity-100' : 'opacity-0'}
                `}
                onClick={onClose}
            />

            {/* Right Sheet Modal */}
            <div
                className={`
                    relative h-full w-[280px] sm:w-[320px] bg-white dark:bg-[#1A1A1A] shadow-2xl
                    border-l border-zinc-200 dark:border-white/10
                    transition-transform duration-300 ease-in-out
                    ${isOpen ? 'translate-x-0' : 'translate-x-full'}
                `}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 dark:border-white/5">
                    {title && (
                        <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                            {title}
                        </h2>
                    )}

                    <button
                        onClick={onClose}
                        className="p-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
                        title="Cerrar"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-4 h-[calc(100%-70px)] overflow-y-auto custom-scrollbar">
                    {children}
                </div>
            </div>
        </div>
    );
}
