"use client";

import { useEffect, useRef } from 'react';

/**
 * Hook to trap focus within a container and handle the Escape key.
 * @param {boolean} isActive - Whether the trap is active.
 * @param {function} onClose - Function to call when the Escape key is pressed.
 */
export default function useFocusTrap(isActive, onClose) {
    const containerRef = useRef(null);
    const previousFocusRef = useRef(null);

    useEffect(() => {
        if (isActive) {
            // Save current focus to restore it later
            previousFocusRef.current = document.activeElement;

            const container = containerRef.current;
            if (!container) return;

            // Find all focusable elements
            const focusableElements = container.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (firstElement) {
                // Focus the first element when opening
                // Small timeout to ensure the element is visible after animation starts
                setTimeout(() => firstElement.focus(), 50);
            }

            const handleKeyDown = (e) => {
                if (e.key === 'Escape') {
                    onClose();
                }

                if (e.key === 'Tab') {
                    if (e.shiftKey) { // Shift + Tab
                        if (document.activeElement === firstElement) {
                            e.preventDefault();
                            lastElement.focus();
                        }
                    } else { // Tab
                        if (document.activeElement === lastElement) {
                            e.preventDefault();
                            firstElement.focus();
                        }
                    }
                }
            };

            document.addEventListener('keydown', handleKeyDown);
            return () => {
                document.removeEventListener('keydown', handleKeyDown);
                // Restore focus when closing
                if (previousFocusRef.current && previousFocusRef.current.focus) {
                    previousFocusRef.current.focus();
                }
            };
        }
    }, [isActive, onClose]);

    return containerRef;
}
