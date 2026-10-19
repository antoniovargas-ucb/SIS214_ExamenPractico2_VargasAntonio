/**
 * ==============================================================================
 * MÓDULO: projects.js — FILTRO DINÁMICO Y PROYECTOS EN TIEMPO REAL
 * Asignatura: Tecnologías Web I [SIS-214] — Universidad Católica Boliviana (UCB)
 * ==============================================================================
 * Funcionalidad obligatoria #3 de la rúbrica oficial:
 * - Filtrado interactivo en tiempo real en respuesta a eventos 'input'.
 * - Inmutabilidad garantizada de datos originales (Object.freeze).
 * - Procesamiento funcional encadenando .filter() con .map().
 * - Optimización con función debounce.
 * ==============================================================================
 */

window.CVApp = window.CVApp || {};

window.CVApp.Projects = (function () {
    'use strict';

    let searchInput = null;
    let filterHintMsg = null;
    let projectsContainer = null;

    /**
     * Colección de proyectos inmutable (Object.freeze) para cumplir la rúbrica.
     */
    const originalProjectsData = Object.freeze([
        Object.freeze({
            id: 'proj-calxircuit',
            category: 'Ingeniería Mecatrónica & IoT',
            title: 'Simulador Didáctico Calxircuit',
            description: 'Aplicación web interactiva para la resolución matemática y simulación analógica de circuitos eléctricos lineales de corriente continua y alterna.',
            techs: ['JavaScript', 'Canvas API', 'CSS Flexbox', 'Matemática Aplicada'],
            dataTech: 'javascript c++'
        }),
        Object.freeze({
            id: 'proj-samastock',
            category: 'Auditoría & Base de Datos',
            title: 'Control de Inventarios SAMA Stock',
            description: 'Software administrativo para trazabilidad de repuestos mecánicos, auditoría de compras, alertas de reposición de stock y cálculo de costos operativos con soporte Java/SQL.',
            techs: ['Java / SQL', 'JavaScript', 'CSS3 Glassmorphism', 'Exportación PDF'],
            dataTech: 'java python'
        }),
        Object.freeze({
            id: 'proj-raonmisk',
            category: 'Robótica Móvil',
            title: 'Robot Móvil Autónomo de Navegación',
            description: 'Prototipo robótico autónomo con sensor ultrasónico y algoritmos de evasión de obstáculos en tiempo real controlado mediante firmware en C++ y ESP32.',
            techs: ['C++ / Arduino', 'ESP32', 'Cinemática Diferencial', 'Sensores Láser/Ultrasonido'],
            dataTech: 'c++ python'
        }),
        Object.freeze({
            id: 'proj-stylematch',
            category: 'Desarrollo Web Frontend',
            title: 'StyleMatch — Tienda de Ropa Online',
            description: 'Landing page moderna y responsiva para tienda de moda, con catálogo interactivo, filtros dinámicos de categorías y diseño mobile-first con CSS Grid.',
            techs: ['HTML5', 'CSS3 Grid', 'JavaScript ES6+', 'Responsive Design'],
            dataTech: 'javascript'
        }),
        Object.freeze({
            id: 'proj-portfolio',
            category: 'Desarrollo Web & CV',
            title: 'Portafolio Profesional Interactivo',
            description: 'CV/Portafolio web interactivo con tema dark/light, menú hamburguesa, filtro dinámico y formulario validado.',
            techs: ['HTML5 Semántico', 'CSS3 Variables', 'JavaScript ES6+', 'WAI-ARIA'],
            dataTech: 'javascript'
        })
    ]);

    /**
     * Renderiza las tarjetas de proyecto en el DOM mediante la tubería .map().
     * @param {Array} projectsArray - Colección de proyectos a renderizar.
     */
    const renderProjectCards = (projectsArray) => {
        if (!projectsContainer) return;

        if (projectsArray.length === 0) {
            projectsContainer.innerHTML = `
                <article class="project-card project-card--empty">
                    <p class="empty-msg">🔍 No se encontraron proyectos que coincidan con la búsqueda.</p>
                </article>
            `;
            return;
        }

        const cardsHTML = projectsArray
            .map((project, index) => `
                <article class="project-card" data-tech="${project.dataTech}" data-aos="fade-up" data-aos-delay="${(index % 4) * 80}">
                    <header class="project-header">
                        <span class="project-category">${project.category}</span>
                        <h3 class="project-title">${project.title}</h3>
                    </header>
                    <p class="project-desc">${project.description}</p>
                    <ul class="project-tech-tags">
                        ${project.techs.map((tech) => `<li>${tech}</li>`).join('')}
                    </ul>
                </article>
            `)
            .join('');

        projectsContainer.innerHTML = cardsHTML;

        if (typeof anime !== 'undefined') {
            anime({
                targets: '.project-card',
                translateY: [25, 0],
                opacity: [0, 1],
                scale: [0.96, 1],
                delay: anime.stagger(75),
                easing: 'easeOutCubic',
                duration: 500
            });
        }

        if (typeof AOS !== 'undefined') {
            setTimeout(() => AOS.refresh(), 60);
        }
    };

    /**
     * Utilidad Debounce para optimizar el rendimiento del buscador reactivo.
     * @param {Function} func - Función a postergar.
     * @param {number} wait - Retardo en milisegundos.
     */
    const debounce = (func, wait = 300) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), wait);
        };
    };

    /**
     * Manejador de filtrado encadenando .filter() con .map().
     * @param {Event} e - Evento input.
     */
    const handleFilterProjects = (e) => {
        const searchTerm = e.target.value.trim().toLowerCase();

        const filteredProjects = originalProjectsData
            .filter((project) => {
                const titleMatch = project.title.toLowerCase().includes(searchTerm);
                const descMatch = project.description.toLowerCase().includes(searchTerm);
                const categoryMatch = project.category.toLowerCase().includes(searchTerm);
                const techMatch = project.techs
                    .map((tech) => tech.toLowerCase())
                    .some((techLower) => techLower.includes(searchTerm));
                return titleMatch || descMatch || categoryMatch || techMatch;
            })
            .map((project) => ({
                ...project,
                matchedBy: searchTerm
            }));

        renderProjectCards(filteredProjects);

        if (filterHintMsg) {
            if (searchTerm === '') {
                filterHintMsg.textContent = `Mostrando todos los proyectos (${originalProjectsData.length}).`;
            } else {
                filterHintMsg.textContent = `${filteredProjects.length} proyecto(s) encontrado(s) para "${e.target.value.trim()}".`;
            }
        }
    };

    /**
     * Inicializa el módulo de proyectos y buscador reactivo.
     */
    const init = () => {
        searchInput = document.getElementById('search-projects');
        filterHintMsg = document.getElementById('filter-results-msg');
        projectsContainer = document.getElementById('proyectos-grid-container');

        if (projectsContainer) {
            renderProjectCards(originalProjectsData);
        }

        if (searchInput) {
            const debouncedFn = (typeof window._ !== 'undefined' && typeof window._.debounce === 'function')
                ? window._.debounce(handleFilterProjects, 250)
                : debounce(handleFilterProjects, 250);
            searchInput.addEventListener('input', debouncedFn);
        }
    };

    return {
        init,
        originalProjectsData,
        renderProjectCards,
        filterProjects: (term) => handleFilterProjects({ target: { value: term } })
    };
})();
