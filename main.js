document.addEventListener('DOMContentLoaded', () => {
    // --- 1. ¡Agarramos los elementos del HTML, como los pilares de la casa! ---
    const form = document.getElementById('registrationForm');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const countryCodeSelect = document.getElementById('countryCode');
    const phoneInput = document.getElementById('phone');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const submitButton = document.getElementById('submitButton');

    // --- 2. Datos de Países ---
    const countries = [
        { name: 'Estados Unidos', code: '+1' }, { name: 'Canadá', code: '+1' },
        { name: 'Reino Unido', code: '+44' }, { name: 'España', code: '+34' },
        { name: 'México', code: '+52' }, { name: 'Argentina', code: '+54' },
        { name: 'Colombia', code: '+57' }, { name: 'Venezuela', code: '+58' },
        { name: 'Chile', code: '+56' }, { name: 'Perú', code: '+51' },
        { name: 'Ecuador', code: '+593' }, { name: 'Bolivia', code: '+591' },
        { name: 'Paraguay', code: '+595' }, { name: 'Uruguay', code: '+598' },
        { name: 'Brasil', code: '+55' }, { name: 'Alemania', code: '+49' },
        { name: 'Francia', code: '+33' }, { name: 'Italia', code: '+39' },
        { name: 'Australia', code: '+61' }, { name: 'India', code: '+91' },
        { name: 'China', code: '+86' }, { name: 'Japón', code: '+81' },
        { name: 'Sudáfrica', code: '+27' }, { name: 'Nigeria', code: '+234' },
        { name: 'Egipto', code: '+20' }, { name: 'Arabia Saudita', code: '+966' },
        { name: 'Emiratos Árabes Unidos', code: '+971' }, { name: 'Rusia', code: '+7' },
        { name: 'Portugal', code: '+351' }, { name: 'Bélgica', code: '+32' },
        { name: 'Países Bajos', code: '+31' }, { name: 'Suecia', code: '+46' },
        { name: 'Noruega', code: '+47' }, { name: 'Dinamarca', code: '+45' },
        { name: 'Finlandia', code: '+358' }, { name: 'Irlanda', code: '+353' },
        { name: 'Suiza', code: '+41' }, { name: 'Austria', code: '+43' },
        { name: 'Grecia', code: '+30' }, { name: 'Turquía', code: '+90' },
        { name: 'Corea del Sur', code: '+82' }, { name: 'Singapur', code: '+65' },
        { name: 'Malasia', code: '+60' }, { name: 'Indonesia', code: '+62' },
        { name: 'Tailandia', code: '+66' }, { name: 'Filipinas', code: '+63' },
        { name: 'Vietnam', code: '+84' }, { name: 'Nueva Zelanda', code: '+64' }
    ];

    /**
     * ¡La única función helper que lo maneja todo visualmente! (éxito, error, o limpieza).
     * Esta es una de las dos funciones permitidas.
     */
    const updateFieldStatus = (element, status, message = '') => {
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector('.error-message');
        const checkIcon = inputControl.querySelector('.fa-check-circle');
        const exclamationIcon = inputControl.querySelector('.fa-exclamation-circle');

        // Primero, limpia cualquier estado previo
        inputControl.classList.remove('success', 'error');
        if (errorDisplay) errorDisplay.textContent = '';
        if (checkIcon) checkIcon.style.visibility = 'hidden';
        if (exclamationIcon) exclamationIcon.style.visibility = 'hidden';

        // Luego, aplica el nuevo estado
        if (status === 'success') {
            inputControl.classList.add('success');
            if (checkIcon) checkIcon.style.visibility = 'visible';
        } else if (status === 'error') {
            inputControl.classList.add('error');
            if (errorDisplay) errorDisplay.textContent = message;
            if (exclamationIcon) exclamationIcon.style.visibility = 'visible';
        }
    };

    // --- 3. Configuración de los campos con sus validaciones en línea ---
    const formFields = [
        {
            element: usernameInput,
            validationFn: (username) => {
                if (username === '') return false;
                return username.length >= 6 && username.length <= 16;
            },
            errorMessage: 'El usuario es obligatorio y debe tener entre 6 y 16 caracteres, ¡no te pases!'
        },
        {
            element: emailInput,
            validationFn: (email) => {
                if (email === '') return false;
                return /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);
            },
            errorMessage: '¡El correo es obligatorio y debe ser de Gmail, mi hermano! Pon uno válido.'
        },
        {
            element: phoneInput,
            validationFn: (fullPhoneNumber) => {
                const currentCountryCode = countryCodeSelect.value;
                // Si está vacío o solo contiene el código de país, no es válido
                if (fullPhoneNumber === '' || fullPhoneNumber === currentCountryCode) {
                    return false;
                }
                const escapedCountryCode = currentCountryCode.replace(/[+]/g, '\\+');
                const phoneRegex = new RegExp(`^${escapedCountryCode}\\d{7,15}$`);
                return phoneRegex.test(fullPhoneNumber);
            },
            errorMessage: 'El número de teléfono es obligatorio, debe contener el código de país y luego entre 7 y 15 dígitos numéricos, ¡pilas!'
        },
        {
            element: passwordInput,
            validationFn: (password) => {
                if (password === '') return false;
                const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
                return password.length >= 4 && password.length <= 18 && passwordRegex.test(password);
            },
            errorMessage: 'La clave es obligatoria, debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo, ¡Activate en la pista!'
        },
        {
            element: confirmPasswordInput,
            validationFn: (confirmPassword) => {
                if (confirmPassword === '') return false;
                return confirmPassword === passwordInput.value;
            },
            errorMessage: '¡La confirmación es obligatoria y las contraseñas no son iguales, aweboniao!'
        }
    ];

    // --- 4. Lógica para verificar la validez del formulario y habilitar/deshabilitar el botón ---
    // Esta lógica se inyecta directamente donde se necesita.
    const checkFormAndToggleButton = () => {
        const allFieldsValid = formFields.every(field => {
            const value = field.element.value.trim();
            if (!field.validationFn(value)) {
                return false; // Si un campo no es válido, el formulario no es válido
            }
            return true; // Campo individual válido
        });
        submitButton.disabled = !allFieldsValid;
    };

    // --- 5. Población de códigos de país y setup inicial ---
    // (Esta lógica se ejecuta una vez al cargar el DOM)
    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country.code;
        option.textContent = country.name;
        countryCodeSelect.appendChild(option);
    });
    countryCodeSelect.value = '+58'; // Venezuela por defecto
    phoneInput.value = countryCodeSelect.value;
    phoneInput.placeholder = `Número de Teléfono (Ej: ${countryCodeSelect.value} XXXX-XXXXXXX)`;
    submitButton.disabled = true; // Deshabilitar el botón al cargar la página

    // --- 6. ¡Aquí le metemos los "escuchadores" de eventos! ---
    formFields.forEach(field => {
        field.element.addEventListener('input', () => {
            const value = field.element.value.trim();
            if (!field.validationFn(value)) {
                updateFieldStatus(field.element, 'error', field.errorMessage);
            } else {
                updateFieldStatus(field.element, 'success');
            }
            checkFormAndToggleButton();
        });
    });

    countryCodeSelect.addEventListener('change', () => {
        phoneInput.value = countryCodeSelect.value;
        phoneInput.placeholder = `Número de Teléfono (Ej: ${countryCodeSelect.value} XXXX-XXXXXXX)`;
        // Revalida el campo de teléfono después de cambiar el código
        const phoneFieldConfig = formFields[2]; // Obtener la config del teléfono
        const phoneValue = phoneInput.value.trim();
        if (!phoneFieldConfig.validationFn(phoneValue)) {
            updateFieldStatus(phoneInput, 'error', phoneFieldConfig.errorMessage);
        } else {
            updateFieldStatus(phoneInput, 'success');
        }
        checkFormAndToggleButton();
    });

    // --- 7. ¡El gran evento: cuando le das a 'Registrar'! ---
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validar todos los campos y actualizar su estado visual
        let isFormValid = true;
        formFields.forEach(field => {
            const value = field.element.value.trim();
            if (!field.validationFn(value)) {
                updateFieldStatus(field.element, 'error', field.errorMessage);
                isFormValid = false;
            } else {
                updateFieldStatus(field.element, 'success');
            }
        });

        if (isFormValid) {
            alert("Estas registrado manin,super chiquiluky");
            form.reset();

            document.querySelectorAll('.input-control input, .input-control select').forEach(element => {
                updateFieldStatus(element, 'clear');
            });
            submitButton.disabled = true;
        }
    });
});