"use client";

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { Settings, CircleHelp, Moon, Sun } from 'lucide-react';
import BottomSheet from '@/components/BottomSheet';
import RightSheet from '@/components/RightSheet';

/**
 * SettingsSheet Component
 * 
 * A responsive overlay (BottomSheet on mobile, RightSheet on low-height devices)
 * that contains application settings, theme toggle, and version info.
 */
export default function SettingsSheet({ isOpen, onClose }) {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isLowHeight, setIsLowHeight] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleResize = () => setIsLowHeight(window.innerHeight < 600);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const menuItems = [
        { name: 'Ajustes', href: '/ajustes', icon: Settings },
        { name: 'Ayuda', href: '/ayuda', icon: CircleHelp },
    ];

    if (!mounted) return null;

    const Content = (
        <div className="flex flex-col w-full gap-4">
            {/* Navigation Links */}
            <div className="flex flex-col gap-2">
                {menuItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        onClick={onClose}
                        className="flex items-center gap-4 w-full h-14 px-4 rounded-xl border border-border-default-secondary bg-background-secondary hover:bg-background-secondary-hover transition-colors"
                    >
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-background-tertiary text-text-default-secondary">
                            <item.icon className="w-5 h-5" />
                        </div>
                        <span className="text-body-strong text-text-default-default">
                            {item.name}
                        </span>
                    </Link>
                ))}
            </div>

            {/* Theme Section */}
            <div className="flex flex-col gap-2">
                <span className="text-body-small text-text-default-secondary ml-1">Preferencia</span>
                <button
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="flex items-center gap-4 w-full h-14 px-4 rounded-xl border border-border-default-secondary bg-background-secondary hover:bg-background-secondary-hover transition-colors"
                >
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-background-tertiary text-text-default-secondary">
                        {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                    </div>
                    <span className="text-body-strong text-text-default-default">
                        {theme === 'dark' ? 'Modo Oscuro' : 'Modo Claro'}
                    </span>
                </button>
            </div>

            {/* Version Details */}
            <div className="w-full text-center py-2">
                <p className="text-body-small text-text-default-secondary uppercase tracking-wide">GACHA HUB v1.0.0</p>
            </div>
        </div>
    );

    if (isLowHeight) {
        return (
            <RightSheet isOpen={isOpen} onClose={onClose} title="Más opciones">
                {Content}
            </RightSheet>
        );
    }

    return (
        <BottomSheet isOpen={isOpen} onClose={onClose} title="Más opciones">
            {Content}
        </BottomSheet>
    );
}
