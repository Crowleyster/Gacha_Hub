"use client";

import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { PanelLeft, Search, Moon, Sun, MoreVertical } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Header({ onToggleSidebar, onOpenMobileSheet, onOpenSearch }) {
  const pathname = usePathname();
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

  return (
    <header className="relative w-full z-40 flex-shrink-0 flex items-center justify-between pt-[max(0.75rem,env(safe-area-inset-top))] pb-3 px-4 md:px-6 border-b bg-background-default/70 backdrop-blur-md saturate-150 border-border-default-secondary transition-colors duration-300 dark:shadow-black/20">

      {/* Left: Toggle + Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="hidden sm:flex items-center justify-center p-2 -ml-2 rounded-lg text-text-default-secondary hover:text-text-default-default hover:bg-background-secondary-hover/50 transition-colors"
          title="Alternar Menú"
        >
          <PanelLeft className="w-5 h-5" />
        </button>

        <h1 className="text-body-strong md:text-subheading-strong text-text-default-default lg:hidden">
          Gacha Hub
        </h1>
      </div>

      {/* Right: Search + Theme + Sheet */}
      <div className="flex items-center gap-3">

        {/* Búsqueda mobile — solo debajo de sm */}
        <button
          onClick={onOpenSearch}
          className="flex sm:hidden items-center justify-center w-10 h-10 rounded-lg border border-border-default-secondary bg-background-default text-text-default-secondary hover:bg-background-secondary-hover shadow-sm transition-colors"
          title="Buscar"
        >
          <Search className="w-5 h-5" />
        </button>

        {/* Búsqueda desktop — sm en adelante */}
        <button 
          onClick={onOpenSearch}
          className="hidden sm:flex group relative items-center w-64 rounded-lg py-2 pl-4 pr-3 border border-border-default-secondary bg-background-tertiary hover:bg-background-secondary-hover transition-colors shadow-sm text-left"
        >
          <span className="flex-1 text-text-default-tertiary text-body-base group-hover:text-text-default-secondary transition-colors">
            Buscar...
          </span>
          <div className="flex items-center gap-1 text-[10px] font-bold text-text-default-tertiary tracking-widest bg-background-default border border-border-default-secondary px-1.5 py-0.5 rounded shadow-sm">
            <span>CTRL</span>
            <span>K</span>
          </div>
        </button>

        {/* Dark mode — sm en adelante */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="hidden sm:flex items-center justify-center w-10 h-10 rounded-lg border border-border-default-secondary bg-background-default text-text-default-secondary hover:bg-background-secondary-hover shadow-sm transition-colors"
          title={theme === 'dark' ? "Cambiar a Modo Claro" : "Cambiar a Modo Oscuro"}
        >
          {mounted && (theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />)}
        </button>

        {/* Ajustes mobile / pantalla baja — abre SettingsSheet */}
        <button
          onClick={onOpenMobileSheet}
          className={`items-center justify-center w-10 h-10 rounded-lg border border-transparent text-text-default-secondary hover:bg-background-secondary-hover/50 transition-colors ${isLowHeight ? 'flex' : 'flex sm:hidden'}`}
          title="Menú de Ajustes"
        >
          <MoreVertical className="w-5 h-5" />
        </button>

      </div>
    </header>
  );
}