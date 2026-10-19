/**
 * ==============================================================================
 * MÓDULO: datetime.js — TIEMPO EN VIVO Y FECHAS RELATIVAS (DAY.JS)
 * Asignatura: Tecnologías Web I [SIS-214] — Universidad Católica Boliviana (UCB)
 * ==============================================================================
 * Integración de Day.js (v1.11.11) con plugin relativeTime y localización en español.
 * Gestiona:
 * - Reloj del sistema en tiempo real en formato completo.
 * - Cálculo dinámico de trayectoria profesional activa.
 * ==============================================================================
 */

window.CVApp = window.CVApp || {};

window.CVApp.DateTime = (function () {
    'use strict';

    let clockInterval = null;

    /**
     * Inicializa Day.js con plugins y localización.
     */
    const initDayjs = () => {
        if (typeof dayjs === 'undefined') return false;

        if (typeof dayjs_plugin_relativeTime !== 'undefined') {
            dayjs.extend(dayjs_plugin_relativeTime);
        }

        try {
            dayjs.locale('es');
        } catch (e) {
            console.warn('[Day.js] Localización es no disponible:', e);
        }

        return true;
    };

    /**
     * Actualiza el reloj del sistema y el indicador de experiencia profesional.
     */
    const actualizarRelojYEstado = () => {
        const liveDatetimeEl = document.getElementById('live-datetime');
        const liveExperienceEl = document.getElementById('live-experience');

        if (!liveDatetimeEl) return;

        if (typeof dayjs !== 'undefined') {
            const ahora = dayjs();
            const fechaFormateada = ahora.format('dddd, D [de] MMMM [de] YYYY — HH:mm:ss');
            const fechaCap = fechaFormateada.charAt(0).toUpperCase() + fechaFormateada.slice(1);
            liveDatetimeEl.textContent = `🕒 ${fechaCap} (La Paz, BOT)`;

            if (liveExperienceEl) {
                const inicioCarrera = dayjs('2020-02-01');
                const anios = ahora.diff(inicioCarrera, 'year');
                const meses = ahora.diff(inicioCarrera.add(anios, 'year'), 'month');
                liveExperienceEl.textContent = `🚀 ${anios} años y ${meses} meses de trayectoria profesional activa`;
            }
        } else {
            const ahora = new Date();
            liveDatetimeEl.textContent = `🕒 ${ahora.toLocaleDateString('es-BO')} — ${ahora.toLocaleTimeString('es-BO')}`;
        }
    };

    /**
     * Inicializa el módulo de fecha y hora.
     */
    const init = () => {
        initDayjs();
        actualizarRelojYEstado();

        if (clockInterval) clearInterval(clockInterval);
        clockInterval = setInterval(actualizarRelojYEstado, 1000);
    };

    return {
        init,
        actualizarRelojYEstado
    };
})();
