/**
 * ==============================================================================
 * MÓDULO: contact.js — FORMULARIO DE CONTACTO INTERACTIVO
 * Asignatura: Tecnologías Web I [SIS-214] — Universidad Católica Boliviana (UCB)
 * ==============================================================================
 * Funcionalidad obligatoria #4 de la rúbrica oficial:
 * - Intercepción del evento submit con event.preventDefault() sin recargar página.
 * - Validación en tiempo real con evento 'input' y regex de seguridad.
 * - Mensajes visuales de error/éxito asociados a campos correspondientes.
 * - Confirmación interactiva con SweetAlert2 y persistencia en localStorage.
 * ==============================================================================
 */

window.CVApp = window.CVApp || {};

window.CVApp.Contact = (function () {
    'use strict';

    let contactForm = null;
    let formFeedback = null;
    let nombreInput = null;
    let correoInput = null;
    let telefonoInput = null;
    let mensajeInput = null;
    let aceptacionInput = null;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^[+]?[0-9\s-]{7,15}$/;

    /**
     * Valida un campo en tiempo real y gestiona mensajes de ayuda/error.
     * @param {HTMLElement} inputEl - Campo de formulario.
     * @param {Function} validationFn - Predicado de validación.
     * @param {string} errorMsg - Mensaje de error a renderizar.
     */
    const validateFieldRealTime = (inputEl, validationFn, errorMsg) => {
        if (!inputEl) return;
        const parent = inputEl.parentElement;
        const helpEl = parent.querySelector('.field-error');

        if (validationFn(inputEl.value.trim())) {
            inputEl.classList.remove('is-invalid');
            inputEl.classList.add('is-valid');
            if (helpEl) helpEl.remove();
        } else {
            inputEl.classList.remove('is-valid');
            inputEl.classList.add('is-invalid');
            if (!helpEl) {
                const errorEl = document.createElement('small');
                errorEl.className = 'field-error';
                errorEl.textContent = errorMsg;
                parent.appendChild(errorEl);
            }
        }
    };

    /**
     * Limpia los estados y mensajes de validación de los campos.
     */
    const clearValidationState = () => {
        if (!contactForm) return;
        contactForm.querySelectorAll('.is-valid, .is-invalid').forEach((el) => {
            el.classList.remove('is-valid', 'is-invalid');
        });
        contactForm.querySelectorAll('.field-error').forEach((el) => el.remove());
    };

    /**
     * Manejador del evento submit.
     * @param {Event} event - Evento submit interceptado.
     */
    const handleSubmit = (event) => {
        event.preventDefault();

        const errors = [];

        const isValidatorAvailable = typeof window.validator !== 'undefined';

        const isNombreValido = isValidatorAvailable
            ? window.validator.isLength(nombreInput ? nombreInput.value.trim() : '', { min: 3, max: 80 })
            : (nombreInput && nombreInput.value.trim().length >= 3);
        if (!isNombreValido) {
            errors.push('El nombre completo debe tener al menos 3 caracteres alfabéticos.');
            if (nombreInput) nombreInput.focus();
        }

        const isEmailValido = isValidatorAvailable
            ? window.validator.isEmail(correoInput ? correoInput.value.trim() : '')
            : (correoInput && emailRegex.test(correoInput.value.trim()));
        if (!isEmailValido) {
            errors.push('Ingrese un correo electrónico válido con formato estándar (ejemplo: usuario@empresa.com).');
        }

        const isPhoneValido = isValidatorAvailable
            ? (window.validator.isMobilePhone((telefonoInput ? telefonoInput.value.trim() : '').replace(/\s+/g, ''), 'any') || phoneRegex.test(telefonoInput.value.trim()))
            : (telefonoInput && phoneRegex.test(telefonoInput.value.trim()));
        if (!isPhoneValido) {
            errors.push('Ingrese un número telefónico o WhatsApp válido (entre 7 y 15 dígitos numéricos).');
        }

        const isMensajeValido = isValidatorAvailable
            ? window.validator.isLength(mensajeInput ? mensajeInput.value.trim() : '', { min: 15, max: 2000 })
            : (mensajeInput && mensajeInput.value.trim().length >= 15);
        if (!isMensajeValido) {
            errors.push('La propuesta o consulta debe contener al menos 15 caracteres descriptivos.');
        }

        if (!aceptacionInput || !aceptacionInput.checked) {
            errors.push('Debe aceptar la política de tratamiento ético de datos para autorizar el contacto.');
        }

        if (errors.length > 0) {
            formFeedback.className = 'form-feedback is-visible is-error';
            formFeedback.innerHTML = `
                <p><strong>⚠️ Se encontraron los siguientes errores en el formulario:</strong></p>
                <ul style="margin: 0.5rem 0 0 1.25rem;">
                    ${errors.map((err) => `<li>${err}</li>`).join('')}
                </ul>
            `;
            formFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
            const nombreValor = nombreInput.value.trim();
            const correoValor = correoInput.value.trim();

            formFeedback.className = 'form-feedback is-visible is-success';
            formFeedback.innerHTML = `
                <p><strong>✅ ¡Mensaje transmitido con éxito!</strong></p>
                <p>Estimado(a) <em>${nombreValor}</em>, su requerimiento profesional ha sido registrado correctamente. El Ing. Antonio Alexander Vargas Sosa le responderá a la brevedad posible.</p>
            `;

            try {
                const submissionData = {
                    nombre: nombreValor,
                    correo: correoValor,
                    fecha: new Date().toISOString()
                };
                localStorage.setItem('ultimo_contacto_cv', JSON.stringify(submissionData));
            } catch (e) {
                console.warn('Persistencia de contacto no disponible:', e);
            }

            if (typeof Swal !== 'undefined') {
                const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
                Swal.fire({
                    title: '¡Mensaje Enviado con Éxito!',
                    html: `Estimado(a) <strong>${nombreValor}</strong>,<br>su propuesta profesional ha sido remitida correctamente. Recibirá una confirmación en <em>${correoValor}</em>.`,
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#32746D',
                    background: isDark ? '#0A343A' : '#ffffff',
                    color: isDark ? '#F8FAFC' : '#01200F',
                    customClass: {
                        popup: 'swal-custom-glass'
                    }
                });
            }

            contactForm.reset();
            clearValidationState();
            formFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    };

    /**
     * Inicializa el módulo del formulario de contacto y validación reactiva.
     */
    const init = () => {
        contactForm = document.getElementById('form-contacto');
        formFeedback = document.getElementById('form-feedback');
        nombreInput = document.getElementById('nombre');
        correoInput = document.getElementById('correo');
        telefonoInput = document.getElementById('telefono');
        mensajeInput = document.getElementById('mensaje');
        aceptacionInput = document.getElementById('aceptacion');

        if (!contactForm || !formFeedback) return;

        if (nombreInput) {
            nombreInput.addEventListener('input', () => {
                validateFieldRealTime(
                    nombreInput,
                    (val) => val.length >= 3,
                    'El nombre debe tener al menos 3 caracteres alfabéticos.'
                );
            });
        }

        if (correoInput) {
            correoInput.addEventListener('input', () => {
                validateFieldRealTime(
                    correoInput,
                    (val) => emailRegex.test(val),
                    'Ingrese un correo electrónico válido.'
                );
            });
        }

        if (telefonoInput) {
            telefonoInput.addEventListener('input', () => {
                validateFieldRealTime(
                    telefonoInput,
                    (val) => phoneRegex.test(val),
                    'Ingrese un teléfono válido (7-15 dígitos).'
                );
            });
        }

        if (mensajeInput) {
            mensajeInput.addEventListener('input', () => {
                validateFieldRealTime(
                    mensajeInput,
                    (val) => val.length >= 15,
                    'Mínimo 15 caracteres descriptivos.'
                );
            });
        }

        contactForm.addEventListener('submit', handleSubmit);

        contactForm.addEventListener('reset', () => {
            formFeedback.className = 'form-feedback';
            formFeedback.innerHTML = '';
            clearValidationState();
        });
    };

    return {
        init,
        validateFieldRealTime,
        clearValidationState
    };
})();
