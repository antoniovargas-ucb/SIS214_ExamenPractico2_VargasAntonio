/**
 * ==============================================================================
 * MÓDULO: charts.js — GRÁFICO INTERACTIVO DE COMPETENCIAS (CHART.JS)
 * Asignatura: Tecnologías Web I [SIS-214] — Universidad Católica Boliviana (UCB)
 * ==============================================================================
 * Integración de Chart.js (v4.4.2) con diseño adaptable a temas claro y oscuro.
 * ==============================================================================
 */

window.CVApp = window.CVApp || {};

window.CVApp.Charts = (function () {
    'use strict';

    let skillsChartInstance = null;

    /**
     * Inicializa o actualiza el gráfico de radar de competencias técnicas.
     */
    const inicializarGraficoHabilidades = () => {
        const canvas = document.getElementById('chart-skills');
        if (!canvas || typeof Chart === 'undefined') return;

        if (skillsChartInstance) {
            skillsChartInstance.destroy();
        }

        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        const gridColor = isLight ? 'rgba(16, 79, 85, 0.22)' : 'rgba(56, 163, 148, 0.22)';
        const textColor = isLight ? '#01200F' : '#E2E8F0';
        const accentColor = isLight ? '#104F55' : '#38A394';
        const fillColor = isLight ? 'rgba(16, 79, 85, 0.25)' : 'rgba(56, 163, 148, 0.28)';

        skillsChartInstance = new Chart(canvas, {
            type: 'radar',
            data: {
                labels: [
                    'HTML5 & WAI-ARIA',
                    'CSS3 / Grid & Flexbox',
                    'JavaScript ES6+ / Fetch',
                    'Microcontroladores (ESP32/PLC)',
                    'Control Automático',
                    'Bases de Datos & SQL',
                    'Docencia STEM & Pedagogía'
                ],
                datasets: [{
                    label: 'Nivel de Dominio Profesional (%)',
                    data: [95, 90, 88, 92, 85, 84, 95],
                    backgroundColor: fillColor,
                    borderColor: accentColor,
                    borderWidth: 2.5,
                    pointBackgroundColor: accentColor,
                    pointBorderColor: '#ffffff',
                    pointHoverRadius: 6,
                    pointRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        labels: {
                            color: textColor,
                            font: { family: 'Plus Jakarta Sans', weight: '600', size: 13 }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => ` Dominio: ${context.raw}%`
                        }
                    }
                },
                scales: {
                    r: {
                        angleLines: { color: gridColor },
                        grid: { color: gridColor },
                        pointLabels: {
                            color: textColor,
                            font: { family: 'Plus Jakarta Sans', size: 12, weight: '600' }
                        },
                        suggestedMin: 50,
                        suggestedMax: 100,
                        ticks: {
                            display: false,
                            stepSize: 20
                        }
                    }
                }
            }
        });
    };

    /**
     * Inicializa el módulo de gráficos.
     */
    const init = () => {
        inicializarGraficoHabilidades();

        window.addEventListener('cvapp:theme-changed', () => {
            setTimeout(inicializarGraficoHabilidades, 60);
        });
    };

    return {
        init,
        inicializarGraficoHabilidades
    };
})();
