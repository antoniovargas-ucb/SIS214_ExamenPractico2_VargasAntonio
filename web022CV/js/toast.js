/**
 * ==============================================================================
 * MÓDULO: toast.js — RESILIENCIA UX Y CONECTIVIDAD (ONLINE / OFFLINE)
 * Asignatura: Tecnologías Web I [SIS-214] — Universidad Católica Boliviana (UCB)
 * ==============================================================================
 * Detección de conectividad del navegador y notificaciones accesibles.
 * ==============================================================================
 */

window.CVApp = window.CVApp || {};

window.CVApp.Toast = (function () {
    'use strict';

    let connectivityToast = null;
    let toastTimeout = null;

    /**
     * Notifica el estado de conexión a Internet del navegador.
     * @param {boolean} enLinea - True si hay conexión, false si está offline.
     */
    const notificarEstadoConectividad = (enLinea) => {
        if (!connectivityToast) return;

        clearTimeout(toastTimeout);
        connectivityToast.hidden = false;

        if (enLinea) {
            connectivityToast.className = 'connectivity-toast is-online';
            connectivityToast.innerHTML = '<span>🟢 Conexión a Internet restablecida. Navegación en línea.</span>';
            toastTimeout = setTimeout(() => {
                connectivityToast.hidden = true;
            }, 4500);
        } else {
            connectivityToast.className = 'connectivity-toast is-offline';
            connectivityToast.innerHTML = '<span>🔴 Sin conexión a Internet. Mostrando datos locales en caché.</span>';
        }
    };

    /**
     * Inicializa los listeners de conectividad del navegador.
     */
    const init = () => {
        connectivityToast = document.getElementById('connectivity-toast');
        window.addEventListener('online', () => notificarEstadoConectividad(true));
        window.addEventListener('offline', () => notificarEstadoConectividad(false));
    };

    return {
        init,
        notificarEstadoConectividad
    };
})();
