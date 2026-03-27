# Gacha Hub - Design System Guidelines (SDS Tokens)

> **IMPORTANTE**: Este proyecto utiliza **Tailwind CSS v4** con una configuración basada en **Design Tokens (SDS)**. Todas las variables están mapeadas a variables CSS semánticas y clases utilitarias personalizadas.

---

## 🎨 1. Sistema de Colores (Semantic SDS)

Utiliza siempre las clases semánticas indicadas a continuación. Evita colores genéricos como `bg-white` o `bg-black`.

### Fondos (Backgrounds)

| Clase Tailwind | Variable CSS | Uso |
| :--- | :--- | :--- |
| `bg-background-default` | `--sds-color-background-default-default` | Fondo principal de la aplicación. |
| `bg-background-secondary` | `--sds-color-background-default-secondary` | Fondos de sección, cards o elementos secundarios. |
| `bg-background-tertiary` | `--sds-color-background-default-tertiary` | Fondos de inputs o áreas de menor jerarquía. |
| `bg-brand-default` | `--sds-color-background-brand-default` | Color de marca para acciones principales. |

### Textos (Typography Colors)

| Clase Tailwind | Variable CSS | Uso |
| :--- | :--- | :--- |
| `text-text-default-default` | `--sds-color-text-default-default` | Texto de alta lectura (h1, h2, cuerpo). |
| `text-text-default-secondary` | `--sds-color-text-default-secondary` | Texto secundario o descriptivo. |
| `text-text-brand-default` | `--sds-color-text-brand-default` | Texto destacado con el color de marca. |
| `text-text-brand-on` | `--sds-color-text-brand-on-brand` | Texto optimizado para leerse sobre `bg-brand-default`. |

### Bordes (Borders)

| Clase Tailwind | Variable CSS | Uso |
| :--- | :--- | :--- |
| `border-border-default-default` | `--sds-color-border-default-default` | Bordes estándar para cards e inputs. |
| `border-border-default-secondary` | `--sds-color-border-default-secondary` | Bordes sutiles para divisores internos. |

> [!TIP]
> **Estados Hover**: Todos los colores de fondo tienen un estado interactivo añadiendo `-hover` (ej. `bg-brand-hover`, `bg-background-secondary-hover`).

---

## ✍️ 2. Tipografía y Presets

No definas tamaños de fuente arbitrarios. Utiliza los siguientes **Presets**, que ya incluyen la escala perfecta de `fontSize`, `fontWeight`, `lineHeight` y `letterSpacing`.

| Preset | Clase CSS | Jerarquía |
| :--- | :--- | :--- |
| **Title Hero** | `.text-title-hero` | Grandes titulares de impacto (Hero sections). |
| **Title Page** | `.text-title-page` | Títulos principales de páginas. |
| **Heading** | `.text-heading` | Títulos de sección (h2/h3). |
| **Subheading Strong** | `.text-subheading-strong` | Subtítulos o secciones destacadas. |
| **Body Base** | `.text-body-base` | Texto de párrafo estándar. |
| **Body Small** | `.text-body-small` | Notas técnicas o metadatos. |
| **Body Code** | `.text-body-code` | Monospace para fragmentos de código. |

---

## 📐 3. Grid y Responsividad

Gacha Hub utiliza un sistema de grid fluido basado en breakpoints estándar de Tailwind v4 y una estructura de columnas dinámica.

### Breakpoints

| Punto de Corte | Clase CSS | Ancho Mínimo | Dispositivo Común |
| :--- | :--- | :--- | :--- |
| **Mobile** | (default) | 0px | Smartphones |
| **Small** | `sm:` | 640px | Tablets (Portrait) |
| **Medium** | `md:` | 768px | Tablets (Landscape) / Laptops |
| **Large** | `lg:` | 1024px | Monitores Estándar |
| **Extra Large** | `xl:` | 1280px | Pantallas HD |

### Sistema de Columnas (Main Grid)

La aplicación utiliza un layout de 12 columnas en escritorio, que se adapta según el viewport:

- **4 Columnas**: Móvil (0px - 639px).
- **8 Columnas**: Tablet (`sm:` 640px - 767px).
- **12 Columnas**: Desktop/Tablet L (`md:` 768px+).

*Uso*: `grid-cols-4 sm:grid-cols-8 md:grid-cols-12`.

### Espaciado y Márgenes (Main Content)

El contenedor principal (`main`) utiliza un sistema de espaciado progresivo para garantizar el aire visual correcto en todas las resoluciones.

- **Gaps (Espacio entre columnas/filas)**:
  - Móvil: `gap-4` (16px)
  - Tablet/Desktop (`sm:`): `gap-6` (24px)
- **Paddings (Márgenes Externos del Contenedor Principal)**:
  - **Móvil (default)**: `p-6` (24px).
  - **Móvil L (`xs:`)**: `p-8` (32px).
  - **Tablet (`sm:`)**: `p-12` (48px).
  - **Desktop (`md:`)**: `px-24 py-12` (Eje X: 96px, Eje Y: 48px).
  - **Ultra-Wide (`2xl:`)**: `px-40 py-12` (Eje X: 160px, Eje Y: 48px).
- **Ancho Máximo**: `max-w-[3840px]` asegura que en pantallas ultra-wide el contenido no se estire de forma incontrolable.

---

## 🌑 4. Elevación (Shadow Scale)

Hemos implementado una escala de sombras multi-capa para mayor realismo:

- **Sombras Externas**: `shadow-100` hasta `shadow-600`.
- **Sombras Internas**: `shadow-inner-100` hasta `shadow-inner-600`.

*Uso sugerido*: `shadow-200` para cards comunes, `shadow-400` para elementos flotantes (modales/popovers).

---

## 📐 5. Reglas de Implementación (DOs and DON'Ts)

- ✅ **SIEMPRE** usa clases de la paleta SDS (ej. `bg-background-default`).
- ✅ **SIEMPRE** usa los presets de texto en lugar de `text-[size]`.
- ✅ **SIEMPRE** usa la escala de Tailwind (múltiplos de 4px) para `w-`, `h-`, `p-`, `m-`.
- ✅ **SIEMPRE** usa `next/image` con `remotePatterns` configurados para optimización automática.
- ❌ **CERO Magic Numbers**: Prohibido usar anchos o altos arbitrarios como `w-[280px]` si existe un equivalente en la escala (ej. `w-70` o `w-72`).
- ❌ **CERO Colores Hexadecimales**: Prohibido usar `text-[#hex]` o `bg-[#hex]`.
- ❌ **CERO Hydration Errors**: Asegura que las fechas generadas en el servidor usen `timeZone: 'UTC'` para coincidir con el cliente.

---

## 🧩 6. Galería de Componentes

> [!NOTE]
> Para ver las especificaciones técnicas completas (tamaños, paddings, gaps y breakpoints específicos) de cada componente, consulta el documento **[COMPONENT_SPECS.md](./COMPONENT_SPECS.md)**.

### Header (Navegación Superior)

- **Glassmorphism**: `.bg-background-default/70 .backdrop-blur-md .saturate-150`.
- **Safe Area**: Debe incluir `pt-[env(safe-area-inset-top)]` para evitar colisiones con el Notch/Dynamic Island en móviles.

### Sidebar (Navegación Lateral)

- **Dimensiones**: `w-64` (Expandido) / `w-16` (Colapsado).
- **Layout**: Utiliza `ml-64` o `ml-16` en el contenedor principal para desplazar el contenido.

### NewsCard & Bento Grid

- **Ratio**: Siempre `aspect-video` para miniaturas de noticias.
- **Imagen**: Usar `fill` y `object-cover` dentro de un contenedor relativo.
- **Elevación**: `shadow-100` base, `hover:shadow-300`.

### EventsTimeline

- **Grid de Escritorio**: `lg:grid-cols-3 xl:grid-cols-4`.
- **Carousel Mobile**: `flex gap-4 overflow-x-auto snap-x snap-mandatory`.

---

## 📱 7. PWA y Layout Awareness

- **Height Chain**: Para asegurar el scroll correcto en PWA, el `html` y `body` deben tener `h-dvh`.
- **Bottom Tabs**: El contenido principal debe tener `pb-content-safe` (clase personalizada) o `pb-20` para no quedar oculto detrás de la barra de navegación móvil.
- **Scroll**: Prefiere `overflow-y-auto` en el contenedor `main` sobre el `body` para mayor control en vistas fijas.

---

## 🧪 8. Estrategia de Verificación

Para mantener la calidad visual, cada cambio debe verificarse con:

1. **Test de Breakpoints**: Verificar Mobile (375px), Tablet (800px) y Desktop (1280px+).
2. **Notch Check**: Simular `safe-area-inset-top` para confirmar que el Header no se corta.
3. **PWA Vertical Test**: Asegurar que en `h-dvh` el footer/nav-bar no se solape con el contenido final.
4. **Hydration Check**: Abrir la consola para asegurar que no hay warnings de "Text content did not match".

---

> [!NOTE]
> Esta guía es un documento vivo. Si detectas un patrón repetitivo que no está aquí, documéntalo para mantener la coherencia del ecosistema Gacha Hub.
