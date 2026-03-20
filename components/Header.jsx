"use client";

import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { PanelLeft, Search, Moon, Sun, MoreVertical } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Header({ onToggleSidebar, onOpenMobileSheet }) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isLowHeight, setIsLowHeight] = useState(false);

  // prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
    const handleResize = () => setIsLowHeight(window.innerHeight < 600);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Simple mapping to get a title from the pathname
  const getPageTitle = (path) => {
    if (path === '/') return 'Inicio';
    if (path.startsWith('/juegos')) return 'Juegos';
    if (path.startsWith('/noticias')) return 'Noticias';
    if (path.startsWith('/eventos')) return 'Eventos';
    if (path.startsWith('/ajustes')) return 'Ajustes';
    if (path.startsWith('/ayuda')) return 'Ayuda';
    return 'Gacha Hub';
  };

  const pageTitle = getPageTitle(pathname);

  return (
    <header className="sticky top-0 z-40 w-full flex items-center justify-between py-3 px-4 md:px-6 border-b bg-background-default/80 backdrop-blur-md border-border-default-secondary transition-colors duration-300 shadow-sm dark:shadow-black/20">

      {/* Left Section: Panel Toggle & Title */}
      <div className="flex items-center gap-3">
        {/* Toggle Icon (Only visible on sm+ where Sidebar exists) */}
        <button
          onClick={onToggleSidebar}
          className="hidden sm:flex items-center justify-center p-2 -ml-2 rounded-lg text-text-default-secondary hover:text-text-default-default hover:bg-background-secondary-hover/50 transition-colors"
          title="Alternar Menú"
        >
          <PanelLeft className="w-5 h-5" />
        </button>

        <h1 className="text-body-strong md:text-subheading-strong text-text-default-default transition-colors">
          {pageTitle}
        </h1>
      </div>

      {/* Right Section: Search & Theme */}
      <div className="flex items-center gap-3">

        {/* Mobile Search Button */}
        <button
          className="flex md:hidden items-center justify-center w-10 h-10 rounded-lg border border-border-default-secondary bg-background-default text-text-default-secondary shadow-sm transition-colors"
          title="Buscar"
        >
          <Search className="w-5 h-5" />
        </button>

        {/* Desktop Search Input */}
        <div className="hidden md:flex relative items-center">
          <input
            type="text"
            placeholder="Buscar"
            className="w-64 rounded-lg py-2 pl-4 pr-10 border border-border-default-secondary bg-background-tertiary text-text-default-default placeholder:text-text-default-tertiary focus:outline-none focus:ring-2 focus:ring-brand-default/20 shadow-sm transition-colors"
          />
          <button className="absolute right-3 text-text-default-tertiary hover:text-text-brand-default transition-colors">
            <Search className="w-4 h-4" />
          </button>
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="hidden sm:flex items-center justify-center w-10 h-10 rounded-lg border border-border-default-secondary bg-background-default text-text-default-secondary hover:bg-background-secondary-hover shadow-sm transition-colors"
          title={theme === 'dark' ? "Cambiar a Modo Claro" : "Cambiar a Modo Oscuro"}
        >
          {mounted && (theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />)}
        </button>

        {/* Mobile Settings Toggle (Visible only below sm or when height is low) */}
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
