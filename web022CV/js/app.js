/**
 * ==============================================================================
 * PORTAFOLIO & CV INTERACTIVO — APLICACIÓN PRINCIPAL (app.js)
 * Asignatura: Tecnologías Web I [SIS-214] — Universidad Católica Boliviana (UCB)
 * Estudiante: Ing. Antonio Alexander Vargas Sosa
 * ==============================================================================
 * ORQUESTADOR MAESTRO Y CONTROLADOR CENTRAL DE LA APLICACIÓN
 * Este archivo orquesta de manera coordinada todos los módulos especializados
 * e integra las 11 LIBRERÍAS DE WEB08:
 *
 * 1.  theme.js       : Conmutador Dark/Light y persistencia LocalStorage
 * 2.  navigation.js  : Menú hamburguesa responsivo, router SPA y modal <dialog>
 * 3.  datetime.js    : Reloj del sistema y cálculo de trayectoria (DAY.JS)
 * 4.  weather.js     : Telemetría ambiental REST con 3 estados (AXIOS)
 * 5.  datatable.js   : Auditoría de certificaciones técnicas (DATATABLES.JS + JQUERY)
 * 6.  map.js         : Mapa interactivo de Campus San Pablo UCB (LEAFLET)
 * 7.  projects.js    : Colección inmutable y búsqueda con debounce (LODASH)
 * 8.  contact.js     : Formulario validado y sanitizado (VALIDATOR.JS + SWEETALERT2)
 * 9.  charts.js      : Gráfico radar interactivo de competencias (CHART.JS)
 * 10. animations.js  : Animaciones coordinadas (GSAP + ANIME.JS + AOS)
 * 11. toast.js       : Detección y notificación de conectividad online/offline
 * ==============================================================================
 */

window.CVApp = window.CVApp || {};

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    console.group('🚀 [CVApp] Inicializando Suite Integral de 11 Librerías JavaScript');

    // 1. Inicializar Tema Visual y persistencia
    if (window.CVApp.Theme) {
        window.CVApp.Theme.init();
        console.log('✅ [1. Theme] Conmutador Dark/Light y LocalStorage inicializado.');
    }

    // 2. Inicializar Navegación SPA, Menú Móvil y Modal
    if (window.CVApp.Navigation) {
        window.CVApp.Navigation.init();
        console.log('✅ [2. Navigation] Router SPA, Menú Hamburguesa y Modal <dialog> inicializados.');
    }

    // 3. Inicializar Reloj y Tiempo en Vivo (Day.js)
    if (window.CVApp.DateTime) {
        window.CVApp.DateTime.init();
        console.log('✅ [3. Day.js] Reloj en vivo y cálculo de trayectoria inicializados.');
    }

    // 4. Inicializar Telemetría Meteorológica REST (Axios)
    if (window.CVApp.Weather) {
        window.CVApp.Weather.init();
        console.log('✅ [4. Axios] Telemetría Open-Meteo REST con 3 estados inicializada.');
    }

    // 5. Inicializar Tabla Interactiva de Certificaciones (DataTables + jQuery)
    if (window.CVApp.DataTable) {
        window.CVApp.DataTable.init();
        console.log('✅ [5. DataTables + jQuery] Tabla interactiva de certificaciones inicializada.');
    }

    // 6. Inicializar Mapa Interactivo de Campus UCB (Leaflet)
    if (window.CVApp.Map) {
        window.CVApp.Map.init();
        console.log('✅ [6. Leaflet] Mapa interactivo de Campus San Pablo inicializado.');
    }

    // 7. Inicializar Colección Inmutable y Filtro de Proyectos (Lodash)
    if (window.CVApp.Projects) {
        window.CVApp.Projects.init();
        console.log('✅ [7. Lodash + Projects] Buscador debounced y filtro inmutable .filter()/.map() inicializados.');
    }

    // 8. Inicializar Validación de Formulario (Validator.js + SweetAlert2)
    if (window.CVApp.Contact) {
        window.CVApp.Contact.init();
        console.log('✅ [8. Validator.js + Contact] Formulario validado y modal SweetAlert2 inicializados.');
    }

    // 9. Inicializar Gráfico de Competencias (Chart.js)
    if (window.CVApp.Charts) {
        window.CVApp.Charts.init();
        console.log('✅ [9. Chart.js] Gráfico radar de competencias técnicas inicializado.');
    }

    // 10. Inicializar Subsistema de Animaciones (GSAP, Anime.js, AOS)
    if (window.CVApp.Animations) {
        window.CVApp.Animations.init();
        console.log('✅ [10. GSAP + Anime.js + AOS] Animaciones numéricas, hero staggers y scroll inicializados.');
    }

    // 11. Inicializar Notificaciones de Conectividad (Online / Offline)
    if (window.CVApp.Toast) {
        window.CVApp.Toast.init();
        console.log('✅ [11. Toast] Detección de conectividad en red inicializada.');
    }

    console.groupEnd();
});
