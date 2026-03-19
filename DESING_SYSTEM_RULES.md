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

## 🌑 3. Elevación (Shadow Scale)

Hemos implementado una escala de sombras multi-capa para mayor realismo:

- **Sombras Externas**: `shadow-100` hasta `shadow-600`.
- **Sombras Internas**: `shadow-inner-100` hasta `shadow-inner-600`.

*Uso sugerido*: `shadow-200` para cards comunes, `shadow-400` para elementos flotantes (modales/popovers).

---

## 📐 4. Reglas de Implementación (DOs and DON'Ts)

- ✅ **SIEMPRE** usa clases de la paleta SDS.
- ✅ **SIEMPRE** usa los presets de texto en lugar de `text-[size]`.
- ❌ **NUNCA** uses colores hexadecimales en el código.
- ❌ **NUNCA** uses `font-bold` de forma aislada si el preset ya lo cubre.
- ❌ **CERO Scroll Horizontal**: Garantiza que los contenedores usen `w-full` y `flex-wrap` para evitar desbordes en móviles.

---

> [!NOTE]
> Esta guía se irá actualizando con ejemplos de componentes específicos (Buttons, Cards, Inputs) a medida que se estandarice su desarrollo.
