# ⚡ Arquitectura Modular JavaScript ES6+ & Suite de 11 Librerías — `web02CV/js/`

> **Asignatura:** Tecnologías Web I [SIS-214]  
> **Universidad:** Universidad Católica Boliviana "San Pablo" (UCB)  
> **Estudiante:** Ing. Antonio Alexander Vargas Sosa  
> **Evaluación:** Segundo Examen Práctico — Unidad II: Desarrollo de Interfaces Dinámicas con JavaScript

---

## 📋 Descripción del Directorio

El directorio `js/` de **web02CV** implementa una arquitectura modular de frontend de alto rendimiento basada en el patrón de diseño **Namespace Modular** (`window.CVApp`). Cada responsabilidad de negocio, interacción y consumo de servicios externos se encuentra encapsulada en su propio módulo independiente, desacoplado y protegido contra colisiones de variables globales mediante IIFE (*Immediately Invoked Function Expressions*).

El ciclo de vida de la aplicación es coordinado centralmente por `app.js`, integrando las **5 funcionalidades obligatorias de la rúbrica** y la **suite completa de 11 librerías JavaScript de `web08`**.

---

## 🗂️ Ficheros Contenidos y Descripción Detallada

A continuación se detalla exhaustivamente cada uno de los 13 ficheros JavaScript contenidos en este directorio:

### 1. `app.js` — Orquestador Maestro y Controlador del Ciclo de Vida
* **Espacio de Nombres:** `window.CVApp`
* **Función:** Es el director central de la aplicación. Escucha el evento global `DOMContentLoaded` del documento y ejecuta la inicialización ordenada y resiliente de todos los módulos del sistema.
* **Flujo de Ejecución:**
  1. `Theme.init()`: Aplica y restaura el tema visual preferido.
  2. `Navigation.init()`: Activa el enrutador SPA por hash, menú móvil y modal.
  3. `DateTime.init()`: Inicializa el reloj digital y cronómetro de trayectoria (Day.js).
  4. `Weather.init()`: Lanza la consulta asíncrona a Open-Meteo REST API (Axios).
  5. `DataTable.init()`: Monta la tabla interactiva de certificaciones (DataTables.js + jQuery).
  6. `Map.init()`: Renderiza el mapa georreferenciado del Campus San Pablo UCB (Leaflet).
  7. `Projects.init()`: Carga el catálogo inmutable y el buscador reactivo (Lodash).
  8. `Contact.init()`: Conecta los escuchadores del formulario de contacto (Validator.js + SweetAlert2).
  9. `Charts.init()`: Dibuja el gráfico radar de competencias técnicas (Chart.js).
  10. `Animations.init()`: Despliega las secuencias de Anime.js, GSAP y AOS.
  11. `Toast.init()`: Registra los monitores de conectividad `online` / `offline`.

---

### 2. `theme.js` — Conmutador de Tema (Dark / Light Mode)
* **Módulo:** `window.CVApp.Theme`
* **Criterio de Evaluación:** Funcionalidad Obligatoria #1 de la Rúbrica.
* **Funciones Clave:**
  * `getStoredTheme()`: Lee la preferencia guardada en `localStorage` deserializándola de forma segura con `JSON.parse()`.
  * `saveThemePreference(themeName)`: Serializa y persiste la selección de usuario con `JSON.stringify()`.
  * `applyTheme(themeName)`: Muta directamente el atributo `data-theme` en el elemento raíz `<html>` (`document.documentElement`).
  * `toggleTheme()`: Alterna entre `'dark'` y `'light'`, actualiza los atributos WAI-ARIA (`aria-pressed`, `title`) y despacha un evento personalizado `cvapp:theme-changed`.
* **Detección OS:** Si no existe preferencia en caché, consulta `window.matchMedia('(prefers-color-scheme: dark)')` para respetar la configuración del sistema operativo.

---

### 3. `navigation.js` — Menú Hamburguesa Responsivo, Router SPA & Modal Nativo
* **Módulo:** `window.CVApp.Navigation`
* **Criterio de Evaluación:** Funcionalidad Obligatoria #2 de la Rúbrica.
* **Funciones Clave:**
  * `toggleMenu()`: Captura eventos `click` en el botón hamburguesa, conmuta clases de visibilidad y **muta dinámicamente el atributo obligatorio `aria-expanded` (`true`/`false`)**.
  * `handleHashRouting()`: Escucha eventos `hashchange` y `load` sobre `window` para implementar una SPA (*Single Page Application*) limpia. Oculta/muestra pantallas semánticas (`.cv-screen`) y actualiza `aria-current="page"`.
  * `initDialogModal()`: Gestiona el diálogo semántico nativo HTML5 `<dialog>` mediante sus métodos estándar `.showModal()` y `.close()`, soportando tecla `Escape` y clics en el backdrop.
  * **Integración con Leaflet:** Detecta la navegación hacia la pantalla `#servicios-contacto` e invoca `mapInstance.invalidateSize()` para asegurar el renderizado perfecto de las capas del mapa.

---

### 4. `projects.js` — Filtro Dinámico en Tiempo Real & Colección Inmutable
* **Módulo:** `window.CVApp.Projects`
* **Criterio de Evaluación:** Funcionalidad Obligatoria #3 de la Rúbrica.
* **Librería Integrada:** **Lodash (v4.17.21)** vía `_.debounce`.
* **Funciones Clave:**
  * `originalProjectsData`: Colección de datos congelada en memoria mediante `Object.freeze()` a nivel de arreglo y objetos internos para garantizar **inmutabilidad estricta**.
  * `filterProjects()`: Tubería funcional ES6+ encadenando el método inmutable `.filter()` (búsqueda en título, descripción y categorías) con el método de proyección `.map()` para construir las tarjetas de proyectos sin modificar el estado original.
  * `debounceInputHandler`: Envuelve el evento `input` del teclado con `_.debounce(..., 250)` de Lodash para evitar re-renderizados innecesarios y optimizar el rendimiento de la CPU.
  * **Feedback Accesible:** Actualiza en tiempo real un mensaje dinámico de conteo de coincidencias (`aria-live="polite"`).

---

### 5. `contact.js` — Formulario de Contacto Interactivo y Validaciones
* **Módulo:** `window.CVApp.Contact`
* **Criterio de Evaluación:** Funcionalidad Obligatoria #4 de la Rúbrica.
* **Librerías Integradas:** **Validator.js (v13.12.0)** y **SweetAlert2 (v11)**.
* **Funciones Clave:**
  * `handleSubmit(e)`: Intercepta el evento `submit` con `event.preventDefault()` bloqueando la recarga del navegador.
  * `validateFieldRealTime()`: Validación reactiva en los eventos `input` y `blur` sobre cada campo del formulario.
  * **Validaciones con Validator.js:**
    * Nombre: Longitud mínima y caracteres alfabéticos válidos.
    * Correo: Validación estricta con `validator.isEmail()`.
    * Teléfono: Validación internacional con `validator.isMobilePhone()`.
    * Mensaje: Longitud entre 10 y 500 caracteres con `validator.isLength()`.
  * **Retroalimentación Visual:** Mensajes de error contextuales en elementos `<output role="alert">` y confirmación modal interactiva y accesible con **SweetAlert2** (`Swal.fire`).
  * **Persistencia:** Almacena los mensajes enviados en `localStorage` bajo la clave `mensajes_contacto_recibidos`.

---

### 6. `weather.js` — Telemetría Ambiental REST con Manejo de 3 Estados
* **Módulo:** `window.CVApp.Weather`
* **Criterio de Evaluación:** Funcionalidad Obligatoria #5 de la Rúbrica.
* **Librería Integrada:** **Axios (v1.7.2)**.
* **Funciones Clave:**
  * `consultarClima()`: Función asíncrona (`async/await`) que consume el endpoint REST de Open-Meteo geolocalizado en La Paz, Bolivia (`lat: -16.5227, lon: -68.1115`).
  * **Control de 3 Estados de Interfaz Exigidos por Rúbrica:**
    1. **Estado Cargando (*Loading*):** Renderiza un spinner dinámico accesible con `aria-live="polite"`.
    2. **Estado Éxito (*Success*):** Despliega las métricas ambientales en tiempo real (temperatura actual, humedad relativa, velocidad del viento y sensación térmica) formateadas en la tipografía digital `DS-Digital`.
    3. **Estado Error (*Error / Retry*):** Muestra un banner de contingencia con mensaje descriptivo y un botón interactivo "🔄 Reintentar Conexión" que relanza la consulta.

---

### 7. `datatable.js` — Tabla Interactiva de Certificaciones Técnicas
* **Módulo:** `window.CVApp.DataTable`
* **Librerías Integradas:** **DataTables.js (v2.0.8)** y **jQuery (v3.7.1)**.
* **Funciones Clave:**
  * `inicializarDataTable()`: Convierte la tabla estática de certificaciones `#tabla-certificaciones` en una cuadrícula interactiva avanzada.
  * **Características:**
    * Búsqueda instantánea multi-criterio.
    * Paginación dinámica personalizable (5, 10, 25 registros por página).
    * Ordenamiento multi-columna ascendente/descendente por año, institución o estado.
    * Carga de respaldo asíncrona desde `../assets/certificaciones.json` en caso de requerirse actualización remota.
    * Interfaz adaptada con el sistema cromático oscuro/claro de la aplicación.

---

### 8. `map.js` — Mapa Interactivo de Campus San Pablo UCB
* **Módulo:** `window.CVApp.Map`
* **Librería Integrada:** **Leaflet.js (v1.9.4)**.
* **Funciones Clave:**
  * `inicializarMapa()`: Inicializa un mapa interactivo con capa OpenStreetMap centrado en las coordenadas del Campus San Pablo UCB en Obrajes, La Paz (`[-16.5226665, -68.1115232]`).
  * **Características:**
    * Marcador geográfico personalizado con icono institucional.
    * Popup interactivo que muestra información del laboratorio de ingeniería, horario de atención y botón para abrir en Google Maps.
    * Control de zoom accesible y desactivación de scroll wheel no deseado.
    * Método `invalidateSize()` expuesto para recalcular dimensiones tras cambios en pantallas SPA.

---

### 9. `charts.js` — Gráfico Radar de Competencias Técnicas
* **Módulo:** `window.CVApp.Charts`
* **Librería Integrada:** **Chart.js (v4.4.2)**.
* **Funciones Clave:**
  * `inicializarGraficoHabilidades()`: Dibuja un gráfico tipo Radar sobre el elemento `<canvas id="chart-skills">` mapeando competencias de desarrollo web e ingeniería.
  * **Reactividad al Tema Visual:** Escucha el evento global `cvapp:theme-changed`. Al alternar entre modo oscuro y claro, destruye la instancia anterior con `.destroy()` y redibuja el gráfico adaptando colores de cuadrícula, texto de etiquetas y área de relleno translúcida.

---

### 10. `animations.js` — Coordinación de Animaciones (GSAP, Anime.js, AOS)
* **Módulo:** `window.CVApp.Animations`
* **Librerías Integradas:** **GSAP (v3.12.5)**, **Anime.js (v3.2.2)** y **AOS (v2.3.4)**.
* **Funciones Clave:**
  * `animarHeroConAnime()`: Construye una línea de tiempo (`anime.timeline()`) que anima secuencialmente el avatar de perfil, los badges de tecnologías (*staggering*), el título principal y los subtítulos con curvas de aceleración elásticas (*easeOutExpo*).
  * `animarContadoresConGSAP()`: Utiliza la propiedad `gsap.to()` con el plugin de interpolación numérica sobre los contadores estadísticos (`.stat-number`), generando un conteo progresivo fluido con la fuente digital `DS-Digital`.
  * `inicializarAOS()`: Configura `AOS.init()` con duración de 800ms, efecto *once* y curvas suaves para elementos con atributos `data-aos="fade-up"` o `data-aos="zoom-in"`.

---

### 11. `datetime.js` — Reloj del Sistema en Vivo y Cálculo de Trayectoria
* **Módulo:** `window.CVApp.DateTime`
* **Librería Integrada:** **Day.js (v1.11.11)** con plugin `relativeTime` y localización en español (`es`).
* **Funciones Clave:**
  * `actualizarReloj()`: Actualiza cada 1000ms (`setInterval`) la hora local en formato digital 24h (`HH:mm:ss`) y la fecha legible en español en la barra superior.
  * `calcularExperienciaProfesional()`: Calcula con precisión cronológica los años y meses transcurridos desde el inicio de la trayectoria profesional del ingeniero hasta la fecha actual, proyectándolo automáticamente en la interfaz.

---

### 12. `toast.js` — Resiliencia UX y Detección de Conectividad (Online / Offline)
* **Módulo:** `window.CVApp.Toast`
* **Criterio de Evaluación:** Resiliencia y experiencia de usuario moderna.
* **Funciones Clave:**
  * `init()`: Registra escuchadores de eventos del navegador `window.addEventListener('online', ...)` y `window.addEventListener('offline', ...)`.
  * `notificarEstadoConectividad(enLinea)`: Despliega un componente toast flotante en la esquina inferior de la pantalla informando al usuario si la conexión a Internet se encuentra activa o si se está operando con datos locales en caché.

---

### 13. `main.js` — Fachada de Compatibilidad hacia Atrás (Legacy Proxy)
* **Función:** Archivo de compatibilidad (Backward-Compatible Facade).
* **Propósito:** Mantiene la compatibilidad con evaluadores automáticos o scripts de pruebas que busquen la ruta tradicional `js/main.js`. Emite un mensaje informativo en consola indicando la migración hacia la arquitectura modular orquestada por `app.js` e informa sobre la presencia activa del objeto global `window.CVApp`.

---

## 📊 Matriz de Integración de Ficheros y Librerías (Web08)

| Fichero | Espacio de Nombres | Librería de Web08 | Función Principal |
|---|---|---|---|
| [`app.js`](./app.js) | `window.CVApp` | — | Orquestador central en `DOMContentLoaded` |
| [`theme.js`](./theme.js) | `window.CVApp.Theme` | — | Conmutador Dark/Light y persistencia `localStorage` |
| [`navigation.js`](./navigation.js) | `window.CVApp.Navigation` | Flowbite Tooltips | Router SPA, Menú Móvil con `aria-expanded` y modal `<dialog>` |
| [`datetime.js`](./datetime.js) | `window.CVApp.DateTime` | **Day.js** | Reloj en vivo y cálculo automático de experiencia |
| [`weather.js`](./weather.js) | `window.CVApp.Weather` | **Axios** | API Open-Meteo REST con manejo de 3 estados |
| [`datatable.js`](./datatable.js) | `window.CVApp.DataTable` | **DataTables.js + jQuery** | Auditoría y búsqueda de certificaciones académicas |
| [`map.js`](./map.js) | `window.CVApp.Map` | **Leaflet** | Mapa interactivo de Campus San Pablo UCB |
| [`projects.js`](./projects.js) | `window.CVApp.Projects` | **Lodash** | Colección inmutable y búsqueda con debounce |
| [`contact.js`](./contact.js) | `window.CVApp.Contact` | **Validator.js + SweetAlert2** | Formulario validado con `preventDefault()` y modales |
| [`charts.js`](./charts.js) | `window.CVApp.Charts` | **Chart.js** | Gráfico radar interactivo de competencias técnicas |
| [`animations.js`](./animations.js) | `window.CVApp.Animations` | **GSAP + Anime.js + AOS** | Coreografía de animaciones, contadores y scroll |
| [`toast.js`](./toast.js) | `window.CVApp.Toast` | — | Detección de conectividad Online/Offline |
| [`main.js`](./main.js) | — | — | Fachada de compatibilidad hacia atrás |

---
© 2026 **Ing. Antonio Alexander Vargas Sosa** — Tecnologías Web I [SIS-214]
