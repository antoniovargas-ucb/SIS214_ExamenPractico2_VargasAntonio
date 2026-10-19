/**
 * ==============================================================================
 * MÓDULO: theme.js — CONMUTADOR DE TEMA (DARK / LIGHT MODE)
 * Asignatura: Tecnologías Web I [SIS-214] — Universidad Católica Boliviana (UCB)
 * ==============================================================================
 * Funcionalidad obligatoria #1 de la rúbrica oficial:
 * - Manipulación directa del DOM (alternancia de data-theme en <html>).
 * - Persistencia en localStorage mediante JSON.stringify() y JSON.parse().
 * - Restauración del estado visual al recargar la página.
 * - Actualización de atributos WAI-ARIA (aria-pressed, title).
 * ==============================================================================
 */

window.CVApp = window.CVApp || {};

window.CVApp.Theme = (function () {
    'use strict';

    const rootElement = document.documentElement;
    let themeToggleBtn = null;

    /**
     * Lee la preferencia de tema desde localStorage utilizando JSON.parse().
     * @returns {object|null} Objeto deserializado con la propiedad 'theme' o null.
     */
    const getStoredTheme = () => {
        try {
            const stored = localStorage.getItem('site_theme_preference');
            if (stored) {
                return JSON.parse(stored);
            }
        } catch (e) {
            console.warn('Fallo al leer preferencia de tema desde localStorage:', e);
        }
        return null;
    };

    /**
     * Guarda la preferencia de tema en localStorage utilizando JSON.stringify().
     * @param {string} themeName - 'dark' o 'light'.
     */
    const saveThemePreference = (themeName) => {
        try {
            const themeData = {
                theme: themeName,
                timestamp: new Date().toISOString()
            };
            localStorage.setItem('site_theme_preference', JSON.stringify(themeData));
        } catch (e) {
            console.warn('Fallo al guardar preferencia de tema en localStorage:', e);
        }
    };

    /**
     * Aplica el tema visual al documento y actualiza los atributos WAI-ARIA.
     * Manipula directamente el DOM alternando el atributo data-theme en <html>.
     * @param {boolean} isLight - True para activar modo claro, false para modo oscuro.
     */
    const applyTheme = (isLight) => {
        if (isLight) {
            rootElement.setAttribute('data-theme', 'light');
            if (themeToggleBtn) {
                themeToggleBtn.setAttribute('aria-pressed', 'true');
                themeToggleBtn.setAttribute('title', 'Cambiar a Modo Oscuro');
            }
            saveThemePreference('light');
        } else {
            rootElement.removeAttribute('data-theme');
            if (themeToggleBtn) {
                themeToggleBtn.setAttribute('aria-pressed', 'false');
                themeToggleBtn.setAttribute('title', 'Cambiar a Modo Claro');
            }
            saveThemePreference('dark');
        }

        window.dispatchEvent(new CustomEvent('cvapp:theme-changed', {
            detail: { isLight }
        }));
    };

    /**
     * Alterna entre modo claro y oscuro.
     */
    const toggleTheme = () => {
        const isCurrentlyLight = rootElement.getAttribute('data-theme') === 'light';
        applyTheme(!isCurrentlyLight);
    };

    /**
     * Inicializa el módulo de tema al cargar el documento.
     */
    const init = () => {
        themeToggleBtn = document.getElementById('btn-theme-toggle');

        const storedThemeData = getStoredTheme();
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

        if (storedThemeData && storedThemeData.theme === 'light') {
            applyTheme(true);
        } else if (storedThemeData && storedThemeData.theme === 'dark') {
            applyTheme(false);
        } else {
            applyTheme(!prefersDarkScheme.matches);
        }

        if (themeToggleBtn) {
            themeToggleBtn.addEventListener('click', (e) => {
                e.preventDefault();
                toggleTheme();
            });
        }
    };

    return {
        init,
        applyTheme,
        toggleTheme,
        getStoredTheme,
        isLight: () => rootElement.getAttribute('data-theme') === 'light'
    };
})();
