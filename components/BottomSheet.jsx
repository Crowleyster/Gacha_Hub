"use client";

import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function BottomSheet({ isOpen, onClose, title, children }) {
    const [isVisible, setIsVisible] = useState(false);
    const [startY, setStartY] = useState(0);
    const [currentY, setCurrentY] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    // Handle smooth entry/exit animations
    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        } else {
            document.body.style.overflow = '';
            // Delay removing from DOM to allow animation to play out
            const timer = setTimeout(() => setIsVisible(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const handlePointerDown = (e) => {
        setStartY(e.clientY);
        setCurrentY(e.clientY);
        setIsDragging(true);
        e.target.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e) => {
        if (!isDragging) return;
        const y = e.clientY;
        // Only track downward movement
        if (y > startY) {
            setCurrentY(y);
        }
    };

    const handlePointerUp = (e) => {
        if (!isDragging) return;
        setIsDragging(false);
        e.target.releasePointerCapture(e.pointerId);

        const distance = currentY - startY;

        // If dragged down more than 50px, close the sheet
        if (distance > 50) {
            onClose();
        }

        // Reset states
        setStartY(0);
        setCurrentY(0);
    };

    const transformStyle = {
        transform: isOpen
            ? `translateY(${dragOffset}px)`
            : 'translateY(100%)',
        // Disable CSS transition while actively dragging for 1:1 finger tracking
        transition: isDragging ? 'none' : 'transform 300ms cubic-bezier(0.32, 0.72, 0, 1)'
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[60] flex flex-col justify-end lg:hidden">
            {/* Backdrop overlay */}
            <div
                className={`
                    absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300
                    ${isOpen ? 'opacity-100' : 'opacity-0'}
                `}
                onClick={onClose}
            />

            {/* Bottom Sheet Modal */}
            <div
                className={`
                    relative w-full bg-background-default rounded-t-3xl shadow-600
                    border-t border-border-default-secondary
                    ${isOpen && !isDragging ? 'translate-y-0' : ''} 
                    ${!isOpen ? 'translate-y-full' : ''}
                `}
                style={transformStyle}
            >
                {/* Drag handle / Header */}
                <div
                    className="flex items-center justify-between px-6 pt-4 pb-2 border-b border-border-default-secondary/50 cursor-grab active:cursor-grabbing touch-none"
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={handlePointerUp}
                >
                    {/* Invisible div for flex balancing if needed */}
                    <div className="w-6" />

                    {/* Draggable indicator pill */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-3 w-12 h-1.5 rounded-full bg-background-tertiary pointer-events-none" />

                    {title && (
                        <h2 className="text-heading text-text-default-default">
                            {title}
                        </h2>
                    )}

                    <button
                        onClick={onClose}
                        className="p-2 -mr-2 mt-4 text-text-default-secondary hover:text-text-default-default transition-colors"
                        title="Cerrar"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-4 pb-safe">
                    {children}
                </div>
            </div>
        </div>
    );
}
