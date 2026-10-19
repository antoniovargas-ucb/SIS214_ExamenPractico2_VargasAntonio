/**
 * ==============================================================================
 * MÓDULO: animations.js — ANIMACIONES CON GSAP, ANIME.JS Y AOS
 * Asignatura: Tecnologías Web I [SIS-214] — Universidad Católica Boliviana (UCB)
 * ==============================================================================
 * Integración de herramientas de animación de frontend:
 * - GSAP (v3.12.5) : Interpolación de contadores y microinteracciones hover.
 * - Anime.js (v3.2.2): Timelines del Hero, barras de progreso y staggering.
 * - AOS (v2.3.4)   : Animaciones declarativas de entrada al scroll.
 * ==============================================================================
 */

window.CVApp = window.CVApp || {};

window.CVApp.Animations = (function () {
    'use strict';

    /**
     * Animación de entrada escalonada en el Hero con Anime.js.
     */
    const animarHeroConAnime = () => {
        if (typeof anime === 'undefined') return;

        anime.timeline({ easing: 'easeOutExpo' })
            .add({
                targets: '.profile-avatar',
                scale: [0.75, 1],
                opacity: [0, 1],
                duration: 900
            })
            .add({
                targets: '.hero-badge',
                translateY: [-20, 0],
                opacity: [0, 1],
                delay: anime.stagger(90),
                duration: 700
            }, '-=500')
            .add({
                targets: ['.hero-subtitle', '.hero-title', '.hero-motto'],
                translateY: [25, 0],
                opacity: [0, 1],
                delay: anime.stagger(120),
                duration: 800
            }, '-=500')
            .add({
                targets: '.hero-actions .btn',
                scale: [0.85, 1],
                opacity: [0, 1],
                delay: anime.stagger(100),
                duration: 650
            }, '-=450')
            .add({
                targets: '.contact-info-pill span',
                translateY: [15, 0],
                opacity: [0, 1],
                delay: anime.stagger(70),
                duration: 600
            }, '-=400');
    };

    /**
     * Microinteracciones continuas en bucle con Anime.js (avatar y logo).
     */
    const inicializarMicrointeraccionesAnime = () => {
        if (typeof anime === 'undefined') return;

        anime({
            targets: '.profile-avatar',
            translateY: [-5, 5],
            direction: 'alternate',
            loop: true,
            easing: 'easeInOutSine',
            duration: 2800
        });

        anime({
            targets: '.brand-logo',
            rotate: [-6, 6],
            scale: [1, 1.15],
            direction: 'alternate',
            loop: true,
            easing: 'easeInOutSine',
            duration: 1600
        });
    };

    /**
     * Animación de barras de progreso con Anime.js al ingresar a Sobre Mí.
     */
    const animarBarrasProgreso = () => {
        if (typeof anime === 'undefined') return;

        const progressElements = document.querySelectorAll('.custom-progress');
        progressElements.forEach((bar) => {
            const targetVal = parseFloat(bar.getAttribute('value')) || 0;
            anime({
                targets: bar,
                value: [0, targetVal],
                round: 1,
                duration: 1200,
                easing: 'easeInOutQuad'
            });
        });
    };

    /**
     * Animación escalonada al ingresar a la sección de Portafolio con Anime.js.
     */
    const animarTarjetasPortafolio = () => {
        if (typeof anime === 'undefined') return;

        anime({
            targets: '.project-card',
            translateY: [25, 0],
            opacity: [0, 1],
            scale: [0.96, 1],
            delay: anime.stagger(75),
            easing: 'easeOutCubic',
            duration: 500
        });
    };

    /**
     * Animación de contadores numéricos dinámicos con GSAP.
     */
    const animarContadoresEstadisticas = () => {
        if (typeof gsap === 'undefined') return;

        const statElements = document.querySelectorAll('.stat-number');
        statElements.forEach((el) => {
            const target = parseFloat(el.getAttribute('data-target')) || 0;
            const counterObj = { val: 0 };

            gsap.to(counterObj, {
                val: target,
                duration: 2.2,
                ease: 'power2.out',
                onUpdate: () => {
                    el.textContent = Math.ceil(counterObj.val);
                }
            });
        });
    };

    /**
     * Animación de timeline escalonada en Certificaciones y Cursos con GSAP.
     */
    const animarTimelineCertificaciones = () => {
        if (typeof gsap === 'undefined') return;

        gsap.fromTo('.timeline-item',
            { opacity: 0, x: -35 },
            { opacity: 1, x: 0, duration: 0.7, stagger: 0.2, ease: 'power2.out' }
        );
    };

    /**
     * Microinteracciones 3D con GSAP al pasar el cursor sobre tarjetas.
     */
    const inicializarEfectosHoverGSAP = () => {
        if (typeof gsap === 'undefined') return;

        const interactiveCards = document.querySelectorAll('.stat-card, .service-card, .media-card, .experience-card');
        interactiveCards.forEach((card) => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    y: -6,
                    scale: 1.018,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    y: 0,
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });
    };

    /**
     * Inicialización y refresco seguro de AOS (Animate On Scroll).
     */
    const initAOS = () => {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 750,
                easing: 'ease-out-cubic',
                once: false,
                offset: 40
            });
        }
    };

    const refreshAOS = () => {
        if (typeof AOS !== 'undefined') {
            setTimeout(() => AOS.refresh(), 100);
        }
    };

    /**
     * Inicializa todos los subsistemas de animación.
     */
    const init = () => {
        initAOS();
        animarHeroConAnime();
        inicializarMicrointeraccionesAnime();
        animarContadoresEstadisticas();
        inicializarEfectosHoverGSAP();
    };

    return {
        init,
        animarHeroConAnime,
        inicializarMicrointeraccionesAnime,
        animarBarrasProgreso,
        animarTarjetasPortafolio,
        animarContadoresEstadisticas,
        animarTimelineCertificaciones,
        inicializarEfectosHoverGSAP,
        initAOS,
        refreshAOS
    };
})();
