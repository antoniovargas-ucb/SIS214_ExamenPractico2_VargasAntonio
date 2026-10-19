/**
 * ==============================================================================
 * MÓDULO: navigation.js — NAVEGACIÓN SPA, MENÚ RESPONSIVO Y MODAL <dialog>
 * Asignatura: Tecnologías Web I [SIS-214] — Universidad Católica Boliviana (UCB)
 * ==============================================================================
 * Funcionalidad obligatoria #2 de la rúbrica oficial:
 * - Menú Hamburguesa responsivo con eventos click y conmutación de clases CSS.
 * - Mutación dinámica obligatoria del atributo aria-expanded (true/false).
 * - Enrutamiento dinámico SPA por hash (#inicio, #sobre-mi, etc.).
 * - Control de modal nativo HTML5 (<dialog>) accesible.
 * ==============================================================================
 */

window.CVApp = window.CVApp || {};

window.CVApp.Navigation = (function () {
    'use strict';

    let menuToggleBtn = null;
    let headerNav = null;
    let screens = [];
    let parentNavLinks = [];
    let allHashLinks = [];
    let dialogModal = null;
    let btnOpenDialog = null;
    let btnDialogToContact = null;

    /**
     * Conmuta la visibilidad del menú hamburguesa en dispositivos móviles.
     * Muta dinámicamente el atributo aria-expanded para estándares WAI-ARIA.
     * @param {boolean} [forceState] - Estado forzado opcional.
     */
    const toggleMenu = (forceState) => {
        if (!menuToggleBtn || !headerNav) return;

        const shouldOpen = forceState !== undefined
            ? forceState
            : !headerNav.classList.contains('is-open');

        headerNav.classList.toggle('is-open', shouldOpen);
        menuToggleBtn.classList.toggle('is-active', shouldOpen);
        menuToggleBtn.setAttribute('aria-expanded', String(shouldOpen));
    };

    /**
     * Activa la pantalla (.cv-screen) seleccionada y desplaza opcionalmente a la subsección.
     * Mantiene el <header> superior y el <footer> inferior siempre presentes en pantalla.
     * @param {string} targetHash - Hash de la sección o subsección destino.
     */
    const navigateToScreen = (targetHash) => {
        let hash = targetHash || window.location.hash || '#inicio';
        if (!hash || hash === '#') hash = '#inicio';

        const targetEl = document.querySelector(hash);
        if (!targetEl) return;

        const parentScreen = targetEl.closest('.cv-screen') || targetEl;

        screens.forEach((screen) => {
            screen.classList.remove('is-active');
        });
        parentScreen.classList.add('is-active');

        const activeScreenId = parentScreen.id;
        parentNavLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (href === `#${activeScreenId}`) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            } else {
                link.classList.remove('active');
                link.removeAttribute('aria-current');
            }
        });

        if (targetEl !== parentScreen) {
            setTimeout(() => {
                targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 60);
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        if (window.CVApp.Animations) {
            if (activeScreenId === 'inicio') {
                CVApp.Animations.animarHeroConAnime();
                CVApp.Animations.animarContadoresEstadisticas();
            } else if (activeScreenId === 'sobre-mi') {
                CVApp.Animations.animarBarrasProgreso();
                CVApp.Animations.animarTimelineCertificaciones();
            } else if (activeScreenId === 'experiencia-habilidades') {
                if (window.CVApp.Charts) {
                    setTimeout(CVApp.Charts.inicializarGraficoHabilidades, 80);
                }
            } else if (activeScreenId === 'portafolio') {
                CVApp.Animations.animarTarjetasPortafolio();
            } else if (activeScreenId === 'contacto') {
                if (window.CVApp.Map && typeof window.CVApp.Map.refresh === 'function') {
                    setTimeout(window.CVApp.Map.refresh, 120);
                }
            }

            CVApp.Animations.refreshAOS();
        }
    };

    /**
     * Inicializa los listeners de navegación por hash y enlaces del sitio.
     */
    const initHashNavigation = () => {
        allHashLinks.forEach((link) => {
            link.addEventListener('click', (event) => {
                const targetHash = link.getAttribute('href');
                if (targetHash && targetHash.startsWith('#')) {
                    event.preventDefault();
                    navigateToScreen(targetHash);

                    try {
                        history.pushState(null, '', targetHash);
                    } catch (err) {
                        window.location.hash = targetHash;
                    }

                    if (window.innerWidth <= 1024 && headerNav && headerNav.classList.contains('is-open')) {
                        toggleMenu(false);
                    }
                }
            });
        });

        window.addEventListener('popstate', () => {
            navigateToScreen(window.location.hash);
        });

        navigateToScreen(window.location.hash || '#inicio');
    };

    /**
     * Inicializa el modal nativo HTML5 (<dialog>).
     */
    const initDialogModal = () => {
        dialogModal = document.getElementById('modal-contacto');
        btnOpenDialog = document.getElementById('btn-open-dialog');
        btnDialogToContact = document.getElementById('btn-dialog-to-contact');

        if (dialogModal && btnOpenDialog) {
            btnOpenDialog.addEventListener('click', () => {
                if (typeof dialogModal.showModal === 'function') {
                    dialogModal.showModal();
                }
            });

            dialogModal.addEventListener('click', (event) => {
                const rect = dialogModal.getBoundingClientRect();
                const isInDialog = (
                    rect.top <= event.clientY &&
                    event.clientY <= rect.top + rect.height &&
                    rect.left <= event.clientX &&
                    event.clientX <= rect.left + rect.width
                );
                if (!isInDialog) {
                    dialogModal.close();
                }
            });

            if (btnDialogToContact) {
                btnDialogToContact.addEventListener('click', () => {
                    dialogModal.close();
                });
            }
        }
    };

    /**
     * Inicializa todos los componentes del módulo de navegación.
     */
    const init = () => {
        menuToggleBtn = document.getElementById('menu-toggle-btn');
        headerNav = document.getElementById('header-nav');
        screens = document.querySelectorAll('.main-section.cv-screen');
        parentNavLinks = document.querySelectorAll('.nav-parent > .nav-item');
        allHashLinks = document.querySelectorAll('a[href^="#"]');

        if (menuToggleBtn && headerNav) {
            menuToggleBtn.addEventListener('click', () => toggleMenu());

            document.addEventListener('click', (event) => {
                if (!headerNav.contains(event.target) && !menuToggleBtn.contains(event.target)) {
                    if (headerNav.classList.contains('is-open')) {
                        toggleMenu(false);
                    }
                }
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && headerNav.classList.contains('is-open')) {
                    toggleMenu(false);
                    menuToggleBtn.focus();
                }
            });
        }

        initHashNavigation();
        initDialogModal();
    };

    return {
        init,
        navigateToScreen,
        toggleMenu
    };
})();
