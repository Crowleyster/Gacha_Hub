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
    <header className="sticky top-0 z-40 w-full flex items-center justify-between py-3 px-4 md:px-6 border-b bg-[#FAFAFA]/80 backdrop-blur-md border-zinc-200 dark:bg-[#27272A]/80 dark:border-zinc-800 transition-colors duration-300 shadow-sm dark:shadow-black/20">

      {/* Left Section: Panel Toggle & Title */}
      <div className="flex items-center gap-3">
        {/* Toggle Icon (Only visible on sm+ where Sidebar exists) */}
        <button
          onClick={onToggleSidebar}
          className="hidden sm:flex items-center justify-center p-2 -ml-2 rounded-lg text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200/50 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-700/50 transition-colors"
          title="Alternar Menú"
        >
          <PanelLeft className="w-5 h-5" />
        </button>

        <h1 className="text-base md:text-lg font-semibold text-zinc-800 dark:text-zinc-100 transition-colors">
          {pageTitle}
        </h1>
      </div>

      {/* Right Section: Search & Theme */}
      <div className="flex items-center gap-3">

        {/* Mobile Search Button */}
        <button
          className="flex md:hidden items-center justify-center w-10 h-10 rounded-lg border border-zinc-200 bg-white text-zinc-600 dark:border-zinc-700 dark:bg-[#1F1F22] dark:text-zinc-300 shadow-sm transition-colors"
          title="Buscar"
        >
          <Search className="w-5 h-5" />
        </button>

        {/* Desktop Search Input */}
        <div className="hidden md:flex relative items-center">
          <input
            type="text"
            placeholder="Buscar"
            className="w-64 rounded-lg py-2 pl-4 pr-10 border border-zinc-200 bg-white text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 dark:border-zinc-700 dark:bg-[#1F1F22] dark:text-zinc-100 dark:placeholder:text-zinc-500 shadow-sm transition-colors"
          />
          <button className="absolute right-3 text-zinc-400 hover:text-purple-500 dark:text-zinc-500 dark:hover:text-purple-400 transition-colors">
            <Search className="w-4 h-4" />
          </button>
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="hidden sm:flex items-center justify-center w-10 h-10 rounded-lg border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-[#1F1F22] dark:text-zinc-300 dark:hover:bg-zinc-800 shadow-sm transition-colors"
          title={theme === 'dark' ? "Cambiar a Modo Claro" : "Cambiar a Modo Oscuro"}
        >
          {mounted && (theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />)}
        </button>

        {/* Mobile Settings Toggle (Visible only below sm or when height is low) */}
        <button
          onClick={onOpenMobileSheet}
          className={`items-center justify-center w-10 h-10 rounded-lg border border-transparent text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50 transition-colors ${isLowHeight ? 'flex' : 'flex sm:hidden'}`}
          title="Menú de Ajustes"
        >
          <MoreVertical className="w-5 h-5" />
        </button>

      </div>
    </header>
  );
}
