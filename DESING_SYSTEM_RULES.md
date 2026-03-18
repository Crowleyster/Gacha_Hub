# Gacha Hub - Design System Guidelines

> **IMPORTANTE**: Este Design System utiliza variables CSS semánticas mapeadas de forma nativa a **Tailwind v4**. Todo el UI DEBE construirse utilizando exclusivamente las clases utilitarias de Tailwind preconfiguradas para garantizar la consistencia, el soporte a Light/Dark Mode y un código limpio.

---

## 📋 Tabla de Contenidos

1. [Principios Fundamentales](#principios-fundamentales)
2. [Sistema de Colores](#sistema-de-colores)
3. [Tipografía](#tipografía)
4. [Espaciado y Layout](#espaciado-y-layout)
5. [Componentes UI](#componentes-ui)
6. [Errores Comunes](#errores-comunes)
7. [Ejemplos de Código Completos](#ejemplos-de-código-completos)

---

## 🎨 Principios Fundamentales

### 1. **Tailwind-Native Design System**

- ✅ SIEMPRE usar las clases utilitarias de Tailwind preconfiguradas con nuestras variables (ej. `bg-primary`, `text-muted-foreground`).
- ❌ NUNCA hardcodear colores hexadecimales en clases arbitrarias de Tailwind (ej. `bg-[#FF0000]`).
- ❌ NUNCA usar estilos en línea (`style={{...}}`) para aplicar colores, radios o tipografías.
- ✅ El sistema se adapta automáticamente a Light/Dark Mode a través de las variables CSS inyectadas globalmente.

### 2. **Tipografía Consistente**

- ✅ SOLO usar la fuente **Inter** (mapeada a la clase `font-sans`).
- ❌ NUNCA usar otras fuentes (Arial, Helvetica, Roboto, etc.).
- ✅ Usar las clases de Tailwind de escala y peso configuradas (`text-sm`, `text-2xl`, `font-bold`).

### 3. **Responsive by Default**

- ✅ Usar Flexbox (`flex`) y Grid (`grid`) para layouts.
- ❌ Evitar `position: absolute` salvo casos específicos (como tooltips o modales).
- ✅ Mobile-first approach usando los prefijos responsivos (`md:`, `lg:`).

---

## 🌈 Sistema de Colores

### Jerarquía de Colores (Light Mode vs Dark Mode)

| Clase Tailwind | Light Mode | Dark Mode | Cuándo Usar |
|----------------|------------|-----------|-------------|
| `bg-background` | `#FFFFFF` (blanco) | `#1E1E1E` (negro) | **Fondo principal** de la app |
| `text-foreground` | `#1E1E1E` (negro) | `#F5F5F5` (blanco) | **Texto principal** sobre background |
| `bg-card` | `#FFFFFF` (blanco) | `#2C2C2C` (gris oscuro) | **Contenedores** (cards, modals) |
| `text-card-foreground`| `#1E1E1E` (negro) | `#F5F5F5` (blanco) | **Texto** sobre cards |
| `bg-primary` | `#2C2C2C` (negro) | `#F5F5F5` (blanco) | **Botones primarios**, acciones principales |
| `text-primary-foreground`|`#F5F5F5` (blanco) | `#1E1E1E` (negro) | **Texto** sobre primary |
| `bg-secondary` | `#E3E3E3` (gris claro) | `#474747` (gris medio) | **Botones secundarios**, badges |
| `text-secondary-foreground`|`#1E1E1E` (negro) | `#F5F5F5` (blanco) | **Texto** sobre secondary |
| `bg-muted` | `#D9D9D9` (gris claro) | `#474747` (gris medio) | **Elementos deshabilitados**, fondos suaves |
| `text-muted-foreground` | `#B3B3B3` (gris) | `#B3B3B3` (gris) | **Texto secundario**, placeholders |
| `bg-accent` | `#F5F5F5` (muy claro) | `#474747` (gris medio) | **Highlights**, hover states |
| `text-accent-foreground` | `#1E1E1E` (negro) | `#F5F5F5` (blanco) | **Texto** sobre accent |
| `bg-destructive` | `#EC221F` (rojo) | `#EC221F` (rojo) | **Acciones destructivas** (eliminar, error) |
| `text-destructive-foreground`|`#FEE9E7` (rosa claro)| `#FEE9E7` (rosa claro) | **Texto** sobre destructive |
| `border-border` | `#D9D9D9` (gris claro) | `#474747` (gris medio) | **Bordes** de elementos estandarizados |
| `ring-ring` | `#900B09` (rojo oscuro) | `#EC221F` (rojo) | **Focus indicators** |

### 🎯 Reglas de Uso de Colores (Acoplamiento de Contraste)

SIEMPRE que apliques un fondo, debes emparejarlo con su texto correspondiente.

#### ✅ **Background & Foreground** (Bases)

```tsx
// ✅ CORRECTO - Uso semántico de clases Tailwind
<div className="bg-background text-foreground">
  Contenido principal
</div>

// ❌ INCORRECTO - Hardcodeando clases arbitrarias o estilos en línea
<div className="bg-[#FFFFFF] text-[#000000]"> o <div style={{ backgroundColor: 'var(--background)' }}>
✅ Cards & ContainersTypeScript// ✅ CORRECTO - Card con texto sobre fondo de card
<div className="rounded-lg border border-border bg-card p-4 text-card-foreground">
  <h3>Título del Card</h3>
  <p className="text-muted-foreground">Texto secundario</p>
</div>

// ❌ INCORRECTO - Mezclar colores sin sentido
<div className="bg-card text-foreground">
  ❌ Usar foreground general sobre card puede causar bajo contraste
</div>
✅ Primary & Destructive ActionsTypeScript// ✅ CORRECTO - Botón primario
<button className="bg-primary text-primary-foreground hover:opacity-90">
  Acción Principal
</button>

// ✅ CORRECTO - Botón destructivo (eliminar, cancelar)
<button className="bg-destructive text-destructive-foreground hover:opacity-90">
  Eliminar Juego
</button>

// ❌ INCORRECTO - Fondo sin su foreground respectivo
<button className="bg-primary text-foreground">
  ❌ Mal contraste
</button>
✅ Focus & Ring StatesTypeScript// ✅ CORRECTO - Focus ring usando Tailwind
<button className="focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
  Con focus ring
</button>
✍️ TipografíaFont FamilySOLO SE USA INTER. En Tailwind, esto se mapea a la clase font-sans.Escala de Tamaños y PesosUsa las clases nativas de Tailwind que ya consumen nuestras variables:Tamaños: text-sm (14px), text-base (16px), text-lg (20px), text-xl (24px), text-2xl (32px), text-4xl (48px), text-6xl (72px).Pesos: font-normal (400), font-medium (500), font-semibold (600), font-bold (700).✅ Ejemplos de Uso CorrectoTypeScript// ✅ CORRECTO - Usando las clases de tipografía integradas
<h1 className="font-sans text-4xl font-bold text-foreground">
  Gacha Hub
</h1>

// ✅ CORRECTO - Texto secundario
<p className="font-sans text-sm font-normal text-muted-foreground">
  Última actualización: hace 2 horas
</p>

// ❌ INCORRECTO - Clases arbitrarias o estilos en línea
<h1 className="text-[48px] font-[700]"> o <h1 style={{ fontSize: '48px' }}>
  ❌ No usar valores fijos
</h1>
📐 Espaciado y LayoutBorder RadiusClase TailwindValorUsorounded-sm4pxBadges, tagsrounded-md6pxInputs, selectsrounded-lg8pxCards, buttons, modals (default)rounded-xl12pxHero banners, large containersrounded-full9999pxAvatares, pillsTypeScript// ✅ CORRECTO - Usando clases Tailwind
<div className="rounded-lg bg-card">
  Card
</div>
Elevación (Shadows)TypeScript// ✅ CORRECTO - Usar las sombras del sistema
<div className="shadow-sm"> o <div className="shadow-md">
  Card con elevación
</div>
SpacingPara espaciado (padding, margin, gap), usa exclusivamente la escala de Tailwind:p-1 (4px), p-2 (8px), p-4 (16px), p-6 (24px), p-8 (32px).🧩 Componentes UI (Snippets Básicos)Button VariantsTypeScript// PRIMARY 
<button className="bg-primary text-primary-foreground rounded-lg px-4 py-2 font-medium">
  Guardar
</button>

// SECONDARY 
<button className="bg-secondary text-secondary-foreground rounded-lg px-4 py-2 font-medium">
  Cancelar
</button>

// OUTLINE 
<button className="border border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground rounded-lg px-4 py-2 font-medium">
  Filtrar
</button>
Input StatesTypeScript// DEFAULT
<input className="border border-border bg-background text-foreground rounded-md px-3 py-2" />

// DISABLED
<input disabled className="bg-muted text-muted-foreground cursor-not-allowed border border-border rounded-md px-3 py-2" />

❌ Errores Comunes (Checklist Rápido)
❌ Estilos en Línea: NUNCA uses style={{ backgroundColor: '...' }}. Usa className="bg-...".
❌ Valores Arbitrarios: NUNCA uses bg-[#FFFFFF] o text-[16px].
❌ Desacople de Contraste: NUNCA pongas bg-primary sin poner text-primary-foreground.
❌ Olvidar el Modo Oscuro: NUNCA uses bg-white dark:bg-black. Usa bg-background y deja que el sistema lo maneje.
❌ Bordes sueltos: Si pones border, acompáñalo de border-border para darle el color correcto.
❌ CERO Scroll Horizontal: Está TOTALMENTE PROHIBIDO que la página entera o sus componentes (salvo sliders explícitos) generen scroll horizontal. Usa SIEMPRE w-full, max-w-full, y en contenedores flex usa flex-wrap para que el contenido salte a la siguiente línea si no cabe. El body debe tener overflow-x-hidden.

💡 Ejemplos de Código Completos

1. Game Card ComponentTypeScriptexport function GameCard({ game }: { game: GachaGame }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4 text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
      <h3 className="mb-2 font-sans text-lg font-semibold">
        {game.name}
      </h3>
      
      <p className="mb-4 font-sans text-sm text-muted-foreground">
        {game.publisher}
      </p>
      
      <div className="flex gap-2">
        <button className="rounded-lg bg-primary px-4 py-2 font-sans text-base font-medium text-primary-foreground hover:opacity-90">
          Ver Detalles
        </button>
        
        <button className="rounded-lg border border-border bg-background px-4 py-2 font-sans text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground">
          Agregar
        </button>
      </div>
    </div>
  );
}
2. Form ComponentTypeScriptexport function LoginForm() {
  return (
    <form className="space-y-4">
      <div>
        <label htmlFor="email" className="mb-1 block font-sans text-sm font-medium text-foreground">
          Email
        </label>
        <input 
          id="email" 
          type="email" 
          placeholder="tu@email.com" 
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2" 
        />
      </div>
      
      <button type="submit" className="w-full rounded-lg bg-primary px-4 py-2 font-sans text-base font-medium text-primary-foreground hover:opacity-90">
        Iniciar Sesión
      </button>
    </form>
  );
}
