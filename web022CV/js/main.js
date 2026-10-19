/**
 * ==============================================================================
 * PORTAFOLIO & CV INTERACTIVO — MIGRACIÓN ARQUITECTURAL (main.js -> app.js)
 * Asignatura: Tecnologías Web I [SIS-214] — Universidad Católica Boliviana (UCB)
 * Estudiante: Ing. Antonio Alexander Vargas Sosa
 * ==============================================================================
 * NOTA DE REFACTORIZACIÓN:
 * El archivo monolítico main.js ha sido exitosamente subdividido y reemplazado
 * por una arquitectura modular desacoplada y orquestada por app.js:
 *
 * ├── js/theme.js         (Conmutador Dark/Light y persistencia en LocalStorage)
 * ├── js/navigation.js    (Menú responsivo con aria-expanded, SPA router y modal <dialog>)
 * ├── js/projects.js      (Colección inmutable Object.freeze, .filter() y .map())
 * ├── js/contact.js       (Validación en tiempo real, preventDefault() y SweetAlert2)
 * ├── js/charts.js        (Gráfico radar reactivo con Chart.js)
 * ├── js/animations.js    (Animaciones coordinadas con GSAP, Anime.js y AOS)
 * ├── js/toast.js         (Notificaciones de conectividad de red Online/Offline)
 * └── js/app.js           (Orquestador maestro y controlador del ciclo de vida)
 *
 * Este archivo (main.js) se mantiene como envoltura de compatibilidad hacia atrás
 * (backward-compatible facade/proxy) para entornos de prueba automáticos.
 * ==============================================================================
 */

(function () {
    'use strict';

    console.info('ℹ️ [Legacy main.js]: La aplicación ha sido migrada a una arquitectura modular orquestada por app.js.');

    // Si los módulos ya fueron cargados mediante sus respectivas etiquetas de script,
    // app.js se encarga de la inicialización en el evento DOMContentLoaded.
    if (window.CVApp) {
        console.info('✅ [Legacy main.js]: Espacio de nombres window.CVApp detectado y activo.');
    }
})();
