/**
 * ==============================================================================
 * MÓDULO: datatable.js — TABLAS INTERACTIVAS (DATATABLES.JS + JQUERY)
 * Asignatura: Tecnologías Web I [SIS-214] — Universidad Católica Boliviana (UCB)
 * ==============================================================================
 * Integración de DataTables.js (v2.0.8) con jQuery para el registro oficial
 * y auditoría de certificaciones técnicas y grados académicos del ingeniero.
 * ==============================================================================
 */

window.CVApp = window.CVApp || {};

window.CVApp.DataTable = (function () {
    'use strict';

    const CERTIFICACIONES_DEFAULT = [
        {
            certificacion: 'Diplomado en Docencia Universitaria & Formación STEM',
            institucion: 'Universidad Católica Boliviana "San Pablo"',
            anio: '2025',
            estado: 'Vigente',
            horas: '240 hrs'
        },
        {
            certificacion: 'Especialista en Automatización & Control PLC Siemens S7-1200',
            institucion: 'Festo Didactic / AHK Bolivia',
            anio: '2024',
            estado: 'Certificado',
            horas: '180 hrs'
        },
        {
            certificacion: 'Desarrollo de Interfaces Web Dinámicas y Arquitectura Frontend ES6+',
            institucion: 'Google Developers / Santander Open Academy',
            anio: '2024',
            estado: 'Acreditado',
            horas: '140 hrs'
        },
        {
            certificacion: 'Diseño Electrónico y Simulación de Circuitos Analógicos / KiCAD',
            institucion: 'IEEE Robotics & Automation Society',
            anio: '2023',
            estado: 'Certificado',
            horas: '90 hrs'
        },
        {
            certificacion: 'Administración de Bases de Datos Relacionales & SQL Server',
            institucion: 'Oracle Academy & Microsoft Learn',
            anio: '2023',
            estado: 'Acreditado',
            horas: '160 hrs'
        },
        {
            certificacion: 'Control Cinemático de Robots Móviles y Sensores Ultrasónicos',
            institucion: 'Sociedad Boliviana de Robótica y Automatización',
            anio: '2022',
            estado: 'Certificado',
            horas: '110 hrs'
        }
    ];

    let dataTableInstance = null;

    /**
     * Inicializa DataTables sobre el elemento #tabla-certificaciones.
     */
    const inicializarTabla = () => {
        const tableEl = document.getElementById('tabla-certificaciones');
        if (!tableEl || typeof window.jQuery === 'undefined') return;

        const jq = window.jQuery;
        if (!jq.fn.DataTable) {
            setTimeout(inicializarTabla, 60);
            return;
        }

        if (dataTableInstance) {
            try {
                dataTableInstance.destroy();
            } catch (e) {
                console.warn('[DataTable] Fallo al reiniciar tabla:', e);
            }
        }

        try {
            dataTableInstance = jq('#tabla-certificaciones').DataTable({
                data: CERTIFICACIONES_DEFAULT,
                responsive: true,
                pageLength: 4,
                lengthMenu: [4, 6, 10],
                columns: [
                    { data: 'certificacion', title: 'Certificación / Acreditación Técnica' },
                    { data: 'institucion', title: 'Institución Emisora' },
                    { data: 'anio', title: 'Año' },
                    { data: 'estado', title: 'Estado' },
                    { data: 'horas', title: 'Carga Horaria' }
                ],
                language: {
                    search: '🔍 Buscar acreditación:',
                    lengthMenu: 'Mostrar _MENU_ registros por página',
                    info: 'Mostrando _START_ a _END_ de _TOTAL_ certificaciones',
                    infoEmpty: 'No hay certificaciones disponibles',
                    infoFiltered: '(filtrado de _MAX_ registros en total)',
                    zeroRecords: 'No se encontraron certificaciones coincidentes',
                    paginate: {
                        first: '«',
                        previous: '‹ Anterior',
                        next: 'Siguiente ›',
                        last: '»'
                    }
                }
            });
        } catch (err) {
            console.warn('[DataTable] Error al inicializar DataTables:', err);
        }
    };

    /**
     * Inicializa el módulo DataTables.
     */
    const init = () => {
        inicializarTabla();
    };

    return {
        init,
        inicializarTabla
    };
})();
