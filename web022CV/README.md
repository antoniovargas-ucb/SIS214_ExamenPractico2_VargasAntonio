# Portafolio & CV Interactivo — Ing. Antonio Alexander Vargas Sosa

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/es/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/es/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript_ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![11 JS Libraries](https://img.shields.io/badge/11_Librer%C3%ADas_Web08-Integradas-success?style=for-the-badge&logo=javascript&logoColor=white)](#-suite-de-11-librerías-javascript-web08)
[![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-222222?style=for-the-badge&logo=githubpages&logoColor=white)](https://pages.github.com/)

> **Asignatura:** Tecnologías Web I [SIS-214]  
> **Universidad:** Universidad Católica Boliviana "San Pablo" (UCB)  
> **Estudiante:** Ing. Antonio Alexander Vargas Sosa  
> **Evaluación:** Segundo Examen Práctico — Unidad II: Desarrollo de Interfaces Dinámicas con JavaScript

---

## Descripción del Proyecto

Landing Page interactiva orientada a un **CV / Portafolio Profesional personal**, desarrollada como entregable de producción para la materia Tecnologías Web I. El proyecto implementa maquetación semántica HTML5, diseño adaptativo CSS3 modular con estrategia Mobile-First (regla áurea 60-30-10 con verde bosque profundo `#021F0F` y azul petróleo `#0A343A`), arquitectura modular JavaScript ES6+ orquestada por `app.js`, y la **integración completa de las 11 librerías de `web08`** con animaciones fluidas y microinteracciones de vanguardia.

---

## Arquitectura de la Solución

```text
web02CV/
├── assets/                 # Recursos multimedia y documentos
│   ├── images/             # Fotografías de perfil, títulos y workshops
│   ├── video/              # Videos demostrativos de proyectos
│   ├── audio/              # Archivos de audio complementarios
│   ├── documents/          # CV profesional en PDF descargable
│   └── certificaciones.json# Colección de certificaciones técnicas para DataTables
├── css/                    # Hojas de estilo y diseño visual modular
│   ├── styles.css          # Orquestador principal (@import de submódulos)
│   ├── variables.css       # Design Tokens en :root y paleta 60-30-10 (#021F0F / #0A343A)
│   ├── base.css            # Reset universal (*), estilos base, enlaces y @font-face DS-Digital
│   ├── layout.css          # Cabecera fija, navegación, main, pantallas y footer
│   ├── components.css      # Tarjetas, botones, modal <dialog>, formularios, widgets y tablas
│   └── animations.css      # Keyframes, transiciones y compatibilidad AOS
├── fonts/                  # Tipografías digitales TrueType locales
│   ├── DS-DIGI.TTF         # DS-Digital Regular
│   ├── DS-DIGIB.TTF        # DS-Digital Bold (Display numérico de estadísticas)
│   ├── DS-DIGII.TTF        # DS-Digital Italic
│   └── DS-DIGIT.TTF        # DS-Digital Thin
├── js/                     # Arquitectura modular desacoplada (window.CVApp)
│   ├── app.js              # Orquestador maestro que inicializa todos los módulos
│   ├── theme.js            # Conmutador Dark/Light y persistencia LocalStorage
│   ├── navigation.js       # Menú móvil, router SPA por hash, modal <dialog> y Leaflet hook
│   ├── datetime.js         # Reloj del sistema y cálculo de trayectoria activa (Day.js)
│   ├── weather.js          # Telemetría ambiental REST para La Paz con 3 estados (Axios)
│   ├── datatable.js        # Registro oficial de certificaciones técnicas (DataTables.js + jQuery)
│   ├── map.js              # Mapa interactivo de Campus San Pablo UCB (Leaflet)
│   ├── projects.js         # Buscador debounced con Lodash y filtro funcional inmutable
│   ├── contact.js          # Formulario validado con Validator.js y modal SweetAlert2
│   ├── charts.js           # Gráfico radar reactivo de competencias técnicas (Chart.js)
│   ├── animations.js       # Animaciones coordinadas con GSAP, Anime.js y AOS
│   └── toast.js            # Notificación y resiliencia de conectividad (Online/Offline)
├── index.html              # Aplicación interactiva principal (SPA)
└── README.md               # Documentación técnica profesional
```

---

## Suite de Librerías JavaScript

El proyecto incorpora armónicamente las librerías de JavaScript:

| # | Librería | Versión | Módulo Integrado | Aplicación en web02CV |
|---|---|---|---|---|
| **01** | **Anime.js** | `v3.2.2` | `js/animations.js` | Animaciones fluidas escalonadas (*stagger*) en el título del Hero, subtítulos, insignias y badges. |
| **02** | **Chart.js** | `v4.4.2` | `js/charts.js` | Gráfico tipo radar interactivo de competencias técnicas y blandas, adaptativo al tema oscuro/claro. |
| **03** | **Axios** | `v1.7.2` | `js/weather.js` | Consumo asíncrono `async/await` de Open-Meteo REST API para La Paz con control de 3 estados (*loading, success, error*). |
| **04** | **Validator.js** | `v13.12.0` | `js/contact.js` | Validación estricta y sanitización de correos (`isEmail`), teléfonos (`isMobilePhone`) y longitud de texto (`isLength`). |
| **05** | **DataTables.js** | `v2.0.8` (+ jQuery) | `js/datatable.js` | Tabla interactiva de certificaciones con búsqueda instantánea, paginación personalizada y orden multi-columna. |
| **06** | **Leaflet** | `v1.9.4` | `js/map.js` | Mapa georreferenciado del Campus San Pablo UCB (Obrajes, La Paz) con marcador y popup interactivo. |
| **07** | **GSAP** | `v3.12.5` | `js/animations.js` | Interpolación numérica fluida sobre los contadores de impacto usando la tipografía digital `DS-Digital`. |
| **08** | **AOS** | `v2.3.4` | `js/animations.js` | Animaciones de entrada al hacer scroll en tarjetas (*fade-up*, *zoom-in*). |
| **09** | **Day.js** | `v1.11.11` | `js/datetime.js` | Reloj en tiempo real en la barra de estado y cálculo automático en años/meses de la trayectoria profesional activa. |
| **10** | **Lodash** | `v4.17.21` | `js/projects.js` | Tubería funcional con función `_.debounce` en el buscador reactivo de proyectos. |
| **11** | **Flowbite** | `v2.3.0` | `index.html` | Tooltips interactivos y accesibles (`data-tooltip-target`) en los controles de tema y botones de acción. |
| **+** | **SweetAlert2** | `v11` | `js/contact.js` | Modales interactivos accesibles para confirmación de envío de mensajes. |

---

## Funcionalidades JavaScript

### 1. Conmutador de Tema (Dark / Light Mode)
- Manipulación directa del DOM mediante alternancia del atributo `data-theme` en `<html>`.
- Persistencia en `localStorage` con `JSON.stringify()` y `JSON.parse()`.
- Detección automática del sistema operativo vía `window.matchMedia('(prefers-color-scheme: dark)')`.
- Emisión de evento personalizado `cvapp:theme-changed` para actualizar el gráfico de competencias.

### 2. Menú Hamburguesa Responsivo & Router SPA
- Captura de evento `click` para conmutar clases CSS de visibilidad.
- Mutación dinámica del atributo `aria-expanded` (`true`/`false`).
- Enrutamiento por hash (`#inicio`, `#sobre-mi`, `#experiencia-habilidades`, `#portafolio`, `#servicios-contacto`) con actualización de `aria-current="page"`.
- Cierre con tecla Escape y clic fuera del menú.

### 3. Filtro Dinámico / Buscador en Tiempo Real
- Filtrado interactivo en respuesta al evento `input` con `debounce` de Lodash (250ms).
- **Inmutabilidad** de datos originales garantizada con `Object.freeze()`.
- Tubería funcional ES6+ encadenando `.filter()` combinado con `.map()`.

### 4. Formulario de Contacto Interactivo
- Intercepción del evento `submit` con `event.preventDefault()`.
- Validación y sanitización estricta con **Validator.js**.
- Feedback visual accesible en `<output role="alert">` y confirmación modal con **SweetAlert2**.

### 5. Consumo Asíncrono de API REST (Axios + 3 Estados)
- Consulta en vivo a Open-Meteo REST API para La Paz, Bolivia.
- Control estricto de los 3 estados:
  1. *Loading*: Spinner dinámico con `aria-live="polite"`.
  2. *Success*: Telemetría ambiental en tiempo real (temperatura, humedad, viento).
  3. *Error*: Contingencia descriptiva con botón interactivo "🔄 Reintentar Conexión".

---

## Sistema de Diseño CSS3

### Tokens de Diseño (`:root` — Regla 60-30-10)
```css
:root {
  --primary-color: #0A343A;
  --secondary-color: #32746D;
  --tertiary-color: #021F0F;
  --bg-color: #021F0F;
  --text-color: #F8FAFC;
  --font-family-base: 'Plus Jakarta Sans', 'Segoe UI', system-ui, sans-serif;
  --font-digital: 'DS-Digital', monospace;
  --spacing-unit: 1rem;
}
```

---

## Instrucciones de Ejecución Local

### Opción 1: Abrir directamente
```bash
cd web02CV

start index.html
open index.html
xdg-open index.html
```

### Opción 2: Servidor local (Live Server / Python)
```bash
python -m http.server 8000
npx serve .
```

---

## Enlace de Producción (GitHub Pages)

**[Ver Portafolio en Producción](https://antonioalexandre-lab.github.io/SIS214_ExamenPractico2_VargasAntonio/)**

---

## Checklist de Verificación Pre-Entrega

- [x] Marcado HTML5 semántico (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`) y WAI-ARIA.
- [x] Diseño Mobile-First con Media Queries para móvil (`<768px`), tablet (`768px-1024px`) y escritorio (`>1024px`).
- [x] Conmutador de tema Dark/Light con persistencia en `localStorage` (`JSON.stringify` / `JSON.parse`).
- [x] Menú hamburguesa dinámico con mutación de `aria-expanded`.
- [x] Filtro dinámico con inmutabilidad y tubería `.filter()` + `.map()` con Lodash `debounce`.
- [x] Formulario con `event.preventDefault()`, validación en tiempo real y modal SweetAlert2.
- [x] Módulo asíncrono REST con Axios y manejo de 3 estados (*loading, success, error*).
- [x] Suite completa de 11 librerías de `web08` integradas y funcionales sin errores en consola.
- [x] Fuentes locales `DS-Digital` en `/fonts/` y visualizador de estadísticas con GSAP.
- [x] Control interactivo con `<dialog>` nativo accesible.
- [x] Repositorio público en GitHub y despliegue operativo en GitHub Pages.