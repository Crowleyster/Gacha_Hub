# 🧩 Fichas Descriptivas de Componentes (Component Specs)

Este documento detalla los aspectos técnicos medibles de los componentes principales de Gacha Hub (tamaños, paddings, gaps, breakpoints).

---

## 1. NewsCard & Bento Grid

Tarjetas de noticias diseñadas para tener un impacto visual fuerte ("Gento style") usando imágenes de fondo (cover) con overlays (scrims).

- **Proporción (Aspect Ratio)**: `aspect-video` (16:9). Se mantiene constante sin importar el tamaño o dispositivo.
- **Contenedor Bento Grid**: Las tarjetas se distribuyen usando `col-span` y `row-span` definiendo anchos variados según el breakpoint:
  - **Hero (Card-1)**:
    - Mobile: `col-span-4 row-span-2`
    - Tablet: `sm:col-span-8 md:col-span-12`
    - Desktop: `lg:col-span-6 lg:row-span-2`
- **Paddings Internos (NewsCard)**:
  - Responsive: `p-4 sm:p-5 md:p-6` (La respiración crece junto al breakpoint).
- **Gaps Internos (Metadata)**:
  - Distancia entre tag/fecha e icono: `gap-3`.
  - Distancia entre metadatos y título principal: `mt-1` o `gap-2` según contenedor flex.
- **Typografía Dinámica**:
  - Hero Card: Título grande (`text-heading` a `lg:text-title-page`).
  - Standard Card: Título base (`text-body-strong` a `lg:text-subheading-strong`).
- **Border Radius**: `rounded-2xl` (`16px`).

---

## 2. Header (Navegación Superior)

El Header es fijo y utiliza _Glassmorphism_ para permitir que el contenido de fondo se perciba sin perder legibilidad.

- **Altura (Height)**: Fija, pero contenida por paddings. No utiliza `h-` duro en el contenedor para evitar sobreposición estricta si el contenido crece, pero el icono/elementos miden `h-14` (56px) para un tap target adecuado.
- **Padding General**: `px-4 sm:px-6` (16px base, 24px en pantallas grandes).
- **Safe Area Handling**: CRÍTICO. Usa `pt-[env(safe-area-inset-top)]` para evitar que las cámaras/notches de teléfonos oculten botones (como el menú de hamburguesa).
- **Glassmorphism Mix**: Clases `bg-background-default/70 backdrop-blur-md saturate-150`.
- **Z-Index**: `z-40` para colocarse sobre todo el contenido excepto sidebars frontales.

---

## 3. Sidebar (Navegación Lateral Desktop)

Componente de navegación primario en la vista de escritorio/tablet-landscape.

- **Estados y Anchos**:
  - **Expandido**: `w-64` (256px).
  - **Colapsado**: `w-16` (64px).
- **Transiciones**: `transition-all duration-300` para animaciones suaves entre estados.
- **Breakpoints**: Oculto en móviles (`hidden lg:flex` o manejado mediante estado que cambia en `window.innerWidth < 1440`).
- **Paddings Internos**: Píldoras de enlaces con `px-3 py-2` o similar, alineadas al icono estándar de 24x24.

---

## 4. MobileNav (Botton Navigation Bar)

Exclusivo para la PWA/Mobile (teléfonos principalmente).

- **Altura**: Viene definida por un custom property `--mobile-nav-height: 80px`.
- **Safe Area Handling**: Usa `pb-safe` (`padding-bottom: env(safe-area-inset-bottom)`) para empujar el contenido por encima del indicador de inicio del iPhone.
- **Disposición**: `flex justify-between items-center` para repartir los 4 o 5 enlaces principales a lo largo del eje X.
- **Visibilidad**: Visible en dispositivos pequeños (`sm:hidden`).

---

## 5. EventsTimeline (Tarjetas de Eventos)

Grid u horizontal list que muestra eventos en curso. Muta diametralmente entre móvil y escritorio.

- **Modo Móvil (Carousel)**:
  - Layout: `flex gap-4 overflow-x-auto snap-x snap-mandatory`.
  - Ancho de tarjeta (mobile): Fijo en `w-72` (288px) para forzar un scroll horizontal sin colapsar, dejando que el próximo evento asome en el borde derecho.
- **Modo Desktop (Grid)**:
  - Layout: Columnas estándar basadas en CSS Grid. `lg:grid-cols-3 xl:grid-cols-4`.
  - Ancho de tarjeta (desktop): Pasa a valer `w-full` ocupando la totalidad de la columna.
- **Alturas de Tarjeta**: Fija en `h-56` (224px) para mantener consistencia visual en el timeline.
- **Border Radius**: Tarjetas y banners con `rounded-xl`.

---

## 6. SettingsSheet / RightSheet (Modales Laterales)

Hojas modales basadas en shadcn/ui (componente Sheet) para ajustes y utilidades rápidas sin salir de la vista actual.

- **Anchos (Widths)**:
  - Suelen emplear anchos limitados como `sm:max-w-sm` (384px) o en ajustes específicos `w-80` (320px) / `w-72` (288px).
- **Paddings Internos**: Se estila a dejar un `p-6` para contenido general.
- **Altura de Ítems Listados**: Modificados para garantizar facilidad táctil (`h-14` / 56px por fila es ideal para el estándar mobile-first).
