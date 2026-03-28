// ============================================================
// NAV ITEMS — Fuente única de verdad para la navegación
// Importar desde Sidebar.jsx y MobileNav.jsx
// ============================================================

import { Home, Newspaper, Calendar, Gamepad2, Settings, CircleHelp } from 'lucide-react';

/** Ítems del menú principal de navegación */
export const TOP_NAV_ITEMS = [
    { name: 'Inicio',    href: '/',         icon: Home      },
    { name: 'Noticias',  href: '/noticias', icon: Newspaper },
    { name: 'Eventos',   href: '/eventos',  icon: Calendar  },
    { name: 'Juegos',    href: '/juegos',   icon: Gamepad2  },
];

/** Ítems del menú inferior (ajustes/ayuda) */
export const BOTTOM_NAV_ITEMS = [
    { name: 'Ajustes', href: '/ajustes', icon: Settings    },
    { name: 'Ayuda',   href: '/ayuda',   icon: CircleHelp  },
];
