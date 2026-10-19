# Arquitectura de Hojas de Estilo CSS3 Modular — `web02CV/css/`

> **Asignatura:** Tecnologías Web I [SIS-214]  
> **Universidad:** Universidad Católica Boliviana "San Pablo" (UCB)  
> **Estudiante:** Ing. Antonio Alexander Vargas Sosa  
> **Evaluación:** Segundo Examen Práctico — Unidad II: Desarrollo de Interfaces Dinámicas con JavaScript

---

## Descripción del Directorio

El directorio `css/` de **web02CV** alberga la suite de estilos modular del proyecto, estructurada siguiendo las mejores prácticas de arquitectura CSS moderna (Mobile-First, desacoplamiento por responsabilidades, Design Tokens y variables nativas). A diferencia de enfoques monolíticos tradicionales, el sistema divide el diseño visual en submódulos especializados coordinados por un archivo orquestador principal (`styles.css`).

---

## Ficheros Contenidos y Descripción Detallada

A continuación se detalla exhaustivamente la función, estructura y contenido de cada uno de los ficheros de este directorio:

### 1. `styles.css` — Orquestador Maestro de Estilos
* **Función:** Punto de entrada único (Single Entry Point) vinculado directamente en el `<head>` de `index.html`.
* **Mecanismo:** Emplea directivas `@import url(...)` en un orden secuencial estricto para garantizar la correcta cascada y herencia CSS:
  1. `variables.css` (Carga primero los tokens y paletas).
  2. `base.css` (Aplica el reset geométrico universal y fuentes locales).
  3. `layout.css` (Construye la estructura de diagramación y contenedores).
  4. `components.css` (Estiliza los componentes individuales de UI).
  5. `animations.css` (Añade keyframes, microinteracciones y transiciones).
* **Beneficio:** Facilita el mantenimiento, modularidad y depuración del código fuente sin sobrecargar el marcado HTML con múltiples etiquetas `<link>`.

---

### 2. `variables.css` — Design Tokens & Sistema de Color (Regla 60-30-10)
* **Función:** Centraliza todas las variables personalizadas CSS (`--custom-properties`) en la pseudo-clase `:root` y gestiona las paletas de color para los modos Oscuro (Dark) y Claro (Light).
* **Contenido Técnico:**
  * **Regla Áurea de Color 60-30-10:**
    * **60% Dominante (Fondo / Base):** `--tertiary-color: #021F0F` (Verde bosque profundo muy oscuro, sobrio y elegante).
    * **30% Estructural (Contenedores / Tarjetas):** `--primary-color: #0A343A` (Azul petróleo oscurecido).
    * **10% Acento e Interacción:** `--secondary-color: #32746D` (Esmeralda / Teal para botones, bordes activos, badges y estados hover).
  * **Tokens Tipográficos y Espaciales:**
    * `--font-family-base`: `'Plus Jakarta Sans', 'Segoe UI', system-ui, sans-serif`.
    * `--font-digital`: `'DS-Digital', monospace` (utilizado para displays numéricos).
    * `--spacing-unit: 1rem` y escala modular de márgenes y paddings.
  * **Glassmorphism y Elevación:**
    * `--glass-bg: rgba(2, 31, 15, 0.94)` y filtros `--glass-blur: blur(12px)`.
    * Sombras multinivel (`--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-xl`).
  * **Modo Claro (`[data-theme="light"]`):** Sobrescribe dinámicamente las variables de fondo (`#F1F5F9`), texto (`#0F172A`) y acentos contrastantes manteniendo la coherencia de identidad visual.

---

### 3. `base.css` — Reset Geométrico Universal & Tipografías Locales
* **Función:** Establece los cimientos tipográficos y neutraliza las discrepancias de renderizado entre navegadores.
* **Contenido Técnico:**
  * **Declaraciones `@font-face` locales:** Importa y vincula la familia tipográfica digital TrueType situada en `../fonts/`:
    * `DS-Digital Regular` (`DS-DIGI.TTF`).
    * `DS-Digital Bold` (`DS-DIGIB.TTF`).
    * `DS-Digital Italic` (`DS-DIGII.TTF`).
    * `DS-Digital Thin` (`DS-DIGIT.TTF`).
  * **Reset Universal Obligatorio:**
    ```css
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    ```
  * **Normalización Global:** Configuración de `html` y `body` con desplazamiento suave (`scroll-behavior: smooth`), altura mínima del 100vh, supresión de desbordamiento horizontal (`overflow-x: hidden`), color de selección de texto y estilos para hipervínculos base.

---

### 4. `layout.css` — Arquitectura de Diagramación y Estructura Global
* **Función:** Define la estructura espacial, cabecera, navegación SPA, contenedores y la estrategia adaptativa Mobile-First.
* **Contenido Técnico:**
  * **Cabecera Fija (`.top-brand-header`):** Posicionamiento `position: fixed`, z-index elevado (1000), efecto translúcido glassmorphism con backdrop-filter y alineación Flexbox.
  * **Navegación Móvil y Escritorio (`.top-brand-nav`):** Menú hamburguesa colapsable con animación deslizante para pantallas móviles y menú horizontal expandido para resoluciones mayores.
  * **Arquitectura SPA por Pantallas (`.cv-screen`):** Contenedores de vista completa que se activan mediante el enrutador por hash de JavaScript (`is-active`).
  * **Rejillas y Contenedores:** Definición de layouts con CSS Grid y Flexbox para organizar el Hero, sección Sobre Mí, Trayectoria, Portafolio y Servicios.
  * **Media Queries Mobile-First:**
    * Móvil: `< 768px` (Columna única, menú hamburguesa activo).
    * Tablet: `768px — 1024px` (Distribución intermedia en dos columnas).
    * Escritorio: `> 1024px` (Contenedores a ancho completo, barra de navegación visible continua).
  * **Pie de Página (`footer`):** Diagramación del footer institucional, enlaces rápidos y barra de telemetría del sistema.

---

### 5. `components.css` — Componentes de Interfaz de Usuario (UI Components)
* **Función:** Contiene el diseño y comportamiento visual de todos los elementos interactivos y componentes visuales del portafolio.
* **Contenido Técnico:**
  * **Modal Nativo HTML5 (`<dialog>`):** Estilos semánticos para el diálogo modal, pseudo-elemento `::backdrop` con desenfoque de fondo y tarjeta interna modal.
  * **Tarjetas de Proyectos (`.project-card`):** Efectos de elevación al hover, badges de tecnologías, bordes suaves y transformaciones tridimensionales sutiles.
  * **Botones e Interactivos (`.btn-primary`, `.btn-secondary`, etc.):** Gradientes lineales, estados `:hover`, `:active`, `:focus-visible` accesibles y efectos de brillo (*glow*).
  * **Buscador y Filtros (`.search-input-wrapper`):** Campo de entrada interactivo con iconos SVG integrados y mensajes reactivos de retroalimentación.
  * **Formulario de Contacto (`#form-contacto`):** Diseño de campos de texto, validadores visuales con indicadores de error/éxito accesibles mediante `<output>`.
  * **Widgets Especializados:**
    * Caja de telemetría meteorológica (`.clima-widget`) con estilos para estados de carga (*spinner*), datos exitosos y botón de reintento.
    * Contenedor del mapa geográfico de Leaflet (`#mapa-profesional`).
    * Contenedor adaptativo del gráfico radar de Chart.js (`#chart-skills`).
    * Estilos personalizados para DataTables (paginación, barra de búsqueda e información de registros con la paleta del proyecto).

---

### 6. `animations.css` — Transiciones, Keyframes y Microinteracciones
* **Función:** Define las coreografías visuales, animaciones de entrada y soporte para librerías de scroll.
* **Contenido Técnico:**
  * **Keyframes Personalizados:**
    * `@keyframes slideToastIn`: Deslizamiento vertical y fade-in para el toast de conectividad.
    * `@keyframes screenFadeIn`: Transición de entrada suave para el cambio de pantallas SPA.
    * `@keyframes pulseGlow`: Efecto de latido y resplandor lumínico para insignias activas y botones primarios.
    * `@keyframes spin`: Rotación continua del indicador de carga meteorológico.
  * **Microinteracciones:** Transiciones fluidas en propiedades `transform`, `box-shadow` y `background-color` con funciones de tiempo optimizadas (`cubic-bezier`).
  * **Compatibilidad con AOS (Animate On Scroll):** Clases y aceleración por hardware (`will-change`, `transform: translateZ(0)`) para asegurar 60 FPS durante el desplazamiento del usuario.

---

## Matriz Resumen de Archivos CSS

| Archivo | Propósito Principal | Criterio de Rúbrica Asociado |
|---------|---------------------|------------------------------|
| [`styles.css`](./styles.css) | Orquestador maestro de la suite CSS | Modularidad y arquitectura limpia de código |
| [`variables.css`](./variables.css) | Tokens :root, temas Dark/Light| Sistema de diseño, consistencia cromática y accesibilidad |
| [`base.css`](./base.css) | Reset universal (*) y `@font-face` DS-Digital | Reset universal obligatorio y tipografía digital local |
| [`layout.css`](./layout.css) | Cabecera, nav, pantallas SPA y media queries | Maquetación responsiva Mobile-First y SPA |
| [`components.css`](./components.css) | Botones, modales, tarjetas, forms y widgets | Componentes UI interactivos, `<dialog>` y formularios |
| [`animations.css`](./animations.css) | Keyframes, microinteracciones y soporte AOS | Animaciones fluidas, microinteracciones y AOS |

---
