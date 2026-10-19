/**
 * ==============================================================================
 * MÓDULO: map.js — MAPA INTERACTIVO DE UBICACIÓN (LEAFLET.JS)
 * Asignatura: Tecnologías Web I [SIS-214] — Universidad Católica Boliviana (UCB)
 * ==============================================================================
 * Integración de Leaflet (v1.9.4) para geolocalización interactiva del
 * Campus Universitario UCB "San Pablo" y laboratorio de consultoría.
 * ==============================================================================
 */

window.CVApp = window.CVApp || {};

window.CVApp.Map = (function () {
    'use strict';

    let mapInstance = null;
    const UCB_COORDS = [-16.5226665, -68.1115232];

    /**
     * Inicializa el mapa interactivo de Leaflet sobre el contenedor #mapa-profesional.
     */
    const inicializarMapa = () => {
        const mapContainer = document.getElementById('mapa-profesional');
        if (!mapContainer || typeof window.L === 'undefined') return;

        if (mapInstance) {
            mapInstance.invalidateSize();
            return;
        }

        try {
            mapInstance = L.map('mapa-profesional', {
                center: UCB_COORDS,
                zoom: 15,
                scrollWheelZoom: false
            });

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors',
                maxZoom: 19
            }).addTo(mapInstance);

            const marker = L.marker(UCB_COORDS).addTo(mapInstance);
            marker.bindPopup(`
                <div style="font-family:'Plus Jakarta Sans',sans-serif;font-size:0.9rem;padding:4px;">
                    <strong style="color:#0A343A;">🎓 Campus San Pablo — UCB</strong><br>
                    <span>Laboratorio de Automatización, Mecatrónica y Consultoría de Software</span><br>
                    <small style="color:#555;">Av. 14 de Septiembre, Obrajes · La Paz, Bolivia</small>
                </div>
            `).openPopup();

            window.addEventListener('resize', () => {
                if (mapInstance) mapInstance.invalidateSize();
            });

            window.addEventListener('hashchange', () => {
                if (window.location.hash === '#contacto' && mapInstance) {
                    setTimeout(() => mapInstance.invalidateSize(), 150);
                }
            });
        } catch (error) {
            console.warn('[Leaflet Map] Error al inicializar mapa:', error);
        }
    };

    /**
     * Recalcula el viewport del mapa (útil al cambiar de vista SPA).
     */
    const refresh = () => {
        if (mapInstance) {
            setTimeout(() => mapInstance.invalidateSize(), 100);
        }
    };

    /**
     * Inicializa el módulo del mapa.
     */
    const init = () => {
        setTimeout(inicializarMapa, 100);
    };

    return {
        init,
        refresh,
        inicializarMapa
    };
})();
