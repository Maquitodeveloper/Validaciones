document.addEventListener('DOMContentLoaded', () => {
    // ¡Aja! Aquí agarramos los elementos del HTML, como quien dice, los pilares de la casa.
    const form = document.getElementById('registrationForm');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const countryCodeSelect = document.getElementById('countryCode');
    const phoneInput = document.getElementById('phone');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const successMessageDiv = document.querySelector('.success-message'); // Ya no lo usaremos para el mensaje principal
    const submitButton = document.getElementById('submitButton'); // ¡Aquí agarramos el botón de enviar!

    // ¡Échale pierna! Aquí tenemos la lista de países y sus códigos, ¡pa' que no te peles!
    const countries = [
        { name: 'Estados Unidos', code: '+1' },
        { name: 'Canadá', code: '+1' },
        { name: 'Reino Unido', code: '+44' },
        { name: 'España', code: '+34' },
        { name: 'México', code: '+52' },
        { name: 'Argentina', code: '+54' },
        { name: 'Colombia', code: '+57' },
        { name: 'Venezuela', code: '+58' },
        { name: 'Chile', code: '+56' },
        { name: 'Perú', code: '+51' },
        { name: 'Ecuador', code: '+593' },
    // AÑADIDOS MÁS PAÍSES
        { name: 'Bolivia', code: '+591' },
        { name: 'Paraguay', code: '+595' },
        { name: 'Uruguay', code: '+598' },
        { name: 'Brasil', code: '+55' },
        { name: 'Alemania', code: '+49' },
        { name: 'Francia', code: '+33' },
        { name: 'Italia', code: '+39' },
        { name: 'Australia', code: '+61' },
        { name: 'India', code: '+91' },
        { name: 'China', code: '+86' },
        { name: 'Japón', code: '+81' },
        { name: 'Sudáfrica', code: '+27' },
        { name: 'Nigeria', code: '+234' },
        { name: 'Egipto', code: '+20' },
        { name: 'Arabia Saudita', code: '+966' },
        { name: 'Emiratos Árabes Unidos', code: '+971' },
        { name: 'Rusia', code: '+7' },
        { name: 'Portugal', code: '+351' },
        { name: 'Bélgica', code: '+32' },
        { name: 'Países Bajos', code: '+31' },
        { name: 'Suecia', code: '+46' },
        { name: 'Noruega', code: '+47' },
        { name: 'Dinamarca', code: '+45' },
        { name: 'Finlandia', code: '+358' },
        { name: 'Irlanda', code: '+353' },
        { name: 'Suiza', code: '+41' },
        { name: 'Austria', code: '+43' },
        { name: 'Grecia', code: '+30' },
        { name: 'Turquía', code: '+90' },
        { name: 'Corea del Sur', code: '+82' },
        { name: 'Singapur', code: '+65' },
        { name: 'Malasia', code: '+60' },
        { name: 'Indonesia', code: '+62' },
        { name: 'Tailandia', code: '+66' },
        { name: 'Filipinas', code: '+63' },
        { name: 'Vietnam', code: '+84' },
        { name: 'Nueva Zelanda', code: '+64' }
    ];

    // Esta función es pa' rellenar el selector de códigos de país, ¡para que se vea todo bien calidoso!
    function populateCountryCodes() {
        countries.forEach(country => {
            const option = document.createElement('option');
            option.value = country.code;
            option.textContent = country.name; // Solo muestra el nombre del país en el selector
            countryCodeSelect.appendChild(option);
        });
        // Ponemos a Venezuela por defecto, ¡porque somos la gente de aquí!
        countryCodeSelect.value = '+58';
        phoneInput.value = countryCodeSelect.value; // Escribe el código del país directamente en el input
        phoneInput.placeholder = `Número de Teléfono (Ej: ${countryCodeSelect.value} XXXX-XXXXXXX)`;
    }

    /**
     * ¡Esto es pa' cuando todo está bien, una belleza! Pone el campo en modo 'success'.
     * @param {HTMLElement} element El elemento input HTML, ¡el que estamos validando pues!
     */
    function setSuccess(element) {
        const inputControl = element.parentElement; // El 'input-control' que lo arropa
        const errorDisplay = inputControl.querySelector('.error-message'); // El mensajito de error
        const checkIcon = inputControl.querySelector('.fa-check-circle'); // El chulito verde
        const exclamationIcon = inputControl.querySelector('.fa-exclamation-circle'); // La exclamación roja

        if (errorDisplay) errorDisplay.textContent = ''; // Limpiamos el perol de error
        inputControl.classList.remove('error'); // Quitamos la clase 'error'
        inputControl.classList.add('success'); // Y ponemos la de 'success', ¡chévere!

        if (checkIcon) checkIcon.style.visibility = 'visible'; // Hacemos visible el chulito
        if (exclamationIcon) exclamationIcon.style.visibility = 'hidden'; // Escondemos la exclamación
    }

    /**
     * ¡Ay, bendito! Esto es pa' cuando algo sale mal. Pone el campo en modo 'error'.
     * @param {HTMLElement} element El elemento input HTML, ¡el que dio el pelón!
     * @param {string} message El mensaje de error que vamos a mostrar, ¡claro está!
     */
    function setError(element, message) {
        const inputControl = element.parentElement; // El 'input-control'
        const errorDisplay = inputControl.querySelector('.error-message'); // El mensajito de error
        const checkIcon = inputControl.querySelector('.fa-check-circle'); // El chulito verde
        const exclamationIcon = inputControl.querySelector('.fa-exclamation-circle'); // La exclamación roja

        if (errorDisplay) errorDisplay.textContent = message; // Ponemos el mensaje del despelote
        inputControl.classList.add('error'); // Le metemos la clase 'error'
        inputControl.classList.remove('success'); // Le quitamos la de 'success, ¡ni de vaina!

        if (exclamationIcon) exclamationIcon.style.visibility = 'visible'; // Hacemos visible la exclamación
        if (checkIcon) checkIcon.style.visibility = 'hidden'; // Escondemos el chulito
    }

    /**
     * ¡Pa' dejar todo limpio y como nuevo! Quita las clases y esconde los iconos.
     * @param {HTMLElement} element El elemento input HTML.
     */
    function clearStatus(element) {
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector('.error-message');
        const checkIcon = inputControl.querySelector('.fa-check-circle');
        const exclamationIcon = inputControl.querySelector('.fa-exclamation-circle');

        if (errorDisplay) errorDisplay.textContent = '';
        inputControl.classList.remove('success', 'error');
        if (checkIcon) checkIcon.style.visibility = 'hidden';
        if (exclamationIcon) exclamationIcon.style.visibility = 'hidden';
    }

    /**
     * ¡Aquí está la magia, mi pana! Una sola función pa' validar cualquier campo.
     * Así no repetimos código, ¡somos unos tigres!
     * @param {HTMLElement} element El input que vamos a revisar.
     * @param {function} validationFn La función que sabe cómo validar este campo en específico.
     * @param {string} errorMessage El mensaje de error por si se porta mal.
     * @returns {boolean} `true` si está bien, `false` si hay que mandar a revisar.
     */
    function validateField(element, validationFn, errorMessage) {
        const value = element.value.trim();
        // Si está vacío (y no es una contraseña, que esas tienen su propio cuento)
        if (value === '' && element.type !== 'password') {
            setError(element, `${element.previousElementSibling.textContent} es obligatorio, ¡pendiente!`);
            return false;
        } else if (!validationFn(value, element)) { // Si la validación específica da "no"
            setError(element, errorMessage);
            return false;
        } else {
            setSuccess(element); // ¡Chévere, todo en orden!
            return true;
        }
    }

    // --- ¡Las funciones de validación, una por una, como Dios manda! ---

    // Pa'l usuario, ¡que no sea ni muy corto ni muy largo el cuento!
    const validateUsername = (username) => {
        if (username.length < 6) return false;
        if (username.length > 16) return false;
        return true;
    };

    // Pa'l correo, ¡tiene que ser de Gmail, sin excepciones!
    const validateEmail = (email) => {
        const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        return gmailRegex.test(email);
    };

    // Pa'l teléfono, el número completo con el código del país
    const validatePhone = (fullPhoneNumber) => {
        const currentCountryCode = countryCodeSelect.value;
        const escapedCountryCode = currentCountryCode.replace(/[+]/g, '\\+'); // Escapar el '+' para la regex
        // Validamos que empiece con el código del país y luego tenga entre 7 y 15 dígitos adicionales.
        const phoneRegex = new RegExp(`^${escapedCountryCode}\\d{7,15}$`);
        return phoneRegex.test(fullPhoneNumber);
    };

    // Pa' la contraseña, ¡tiene que ser robusta, como un roble!
    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
        if (password.length < 4) return false;
        if (password.length > 18) return false;
        return passwordRegex.test(password);
    };

    // Pa' confirmar la contraseña, ¡que sean idénticas, ni una pizca más ni menos!
    const validateConfirmPassword = (confirmPassword) => {
        return confirmPassword === passwordInput.value;
    };

    // --- Función para verificar el estado general del formulario y habilitar/deshabilitar el botón ---
    function checkFormValidity() {
        const isUsernameValid = validateUsername(usernameInput.value.trim());
        const isEmailValid = validateEmail(emailInput.value.trim());
        const isPhoneValid = validatePhone(phoneInput.value.trim());
        const isPasswordValid = validatePassword(passwordInput.value.trim());
        const isConfirmPasswordValid = validateConfirmPassword(confirmPasswordInput.value.trim());

        // El botón se habilita solo si TODOS los campos son válidos
        if (isUsernameValid && isEmailValid && isPhoneValid && isPasswordValid && isConfirmPasswordValid) {
            submitButton.disabled = false;
        } else {
            submitButton.disabled = true;
        }
    }

    // ¡Aquí le metemos los "escuchadores" de eventos, pa' que valide en vivo y directo!
    usernameInput.addEventListener('input', () => {
        validateField(usernameInput, validateUsername, 'El usuario debe tener entre 6 y 16 caracteres, ¡no te pases!');
        checkFormValidity(); // ¡Revisa la validez del formulario al cambiar el usuario!
    });
    emailInput.addEventListener('input', () => {
        validateField(emailInput, validateEmail, '¡Ese correo no es de Gmail, mi hermano! Pon uno válido.');
        checkFormValidity(); // ¡Revisa la validez del formulario al cambiar el email!
    });

    // ¡Cuando cambias el país, el valor del teléfono se actualiza con el código y el placeholder!
    countryCodeSelect.addEventListener('change', () => {
        phoneInput.value = countryCodeSelect.value; // Escribe el nuevo código del país directamente en el input
        phoneInput.placeholder = `Número de Teléfono (Ej: ${countryCodeSelect.value} XXXX-XXXXXXX)`;
        // Si el teléfono ya tiene algo escrito (aparte del código), lo validamos de una vez
        if (phoneInput.value.trim() !== countryCodeSelect.value) { // Solo validamos si hay algo más que el código
            validateField(phoneInput, validatePhone, 'El número de teléfono debe contener el código de país y luego entre 7 y 15 dígitos, ¡activate loco!');
        } else {
            // Si solo está el código de país, limpia el estado de éxito/error del teléfono
            clearStatus(phoneInput);
        }
        checkFormValidity(); // ¡Revisa la validez del formulario al cambiar el código de país!
    });

    phoneInput.addEventListener('input', () => {
        validateField(phoneInput, validatePhone, 'El número de teléfono debe contener el código de país y luego entre 7 y 15 dígitos numéricos, ¡pilas!');
        checkFormValidity(); // ¡Revisa la validez del formulario al cambiar el teléfono!
    });
    passwordInput.addEventListener('input', () => {
        validateField(passwordInput, validatePassword, 'La clave debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo, ¡Activate en la pista!');
        checkFormValidity(); // ¡Revisa la validez del formulario al cambiar la contraseña!
    });
    confirmPasswordInput.addEventListener('input', () => {
        validateField(confirmPasswordInput, validateConfirmPassword, '¡Las contraseñas no son iguales, aweboniao!');
        checkFormValidity(); // ¡Revisa la validez del formulario al cambiar la confirmación de contraseña!
    });

    // ¡De una vez llenamos los códigos de país cuando carga la página!
    populateCountryCodes();
    // Deshabilitar el botón al cargar la página
    submitButton.disabled = true;

    // --- ¡El gran evento: cuando le das a 'Registrar', aquí se arma el zafarrancho de validación! ---
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // ¡No dejes que se mande el formulario sin permiso!

        // Volvemos a validar todo en el submit final
        const isUsernameValid = validateField(usernameInput, validateUsername, 'Ese nombre tuyo no me sirve, entre 6 a 16 nada mas ');
        const isEmailValid = validateField(emailInput, validateEmail, '¡Ese Gmail,no existe! Pon uno válido locoide.');
        const isPhoneValid = validateField(phoneInput, validatePhone, 'El número de teléfono debe tener entre 7 y 15 dígitos,¡panitaa!');
        const isPasswordValid = validateField(passwordInput, validatePassword, 'La clave debe tener 8 caracteres, una mayúscula, una minúscula, un número y un símbolo');
        const isConfirmPasswordValid = validateField(confirmPasswordInput, validateConfirmPassword, '¡No es la misma aweboniad@!');

        // Si todo está como debe ser, ¡éxito total!
        if (isUsernameValid && isEmailValid && isPhoneValid && isPasswordValid && isConfirmPasswordValid) {
            // ¡Mostramos el mensaje de que todo salió nítido, pero ahora como un alert!
            alert("🤪Estas registrado manin,super chiquiluky🤪");

            form.reset(); // ¡Dejamos el formulario limpio, como una patena!

            // Limpiamos el estatus de todos los campos, ¡los dejamos blanquitos!
            document.querySelectorAll('.input-control input, .input-control select').forEach(element => {
                clearStatus(element);
            });

            // Deshabilitar el botón de nuevo después de un envío exitoso
            submitButton.disabled = true;
        } else {
            // Si algo falló, nos aseguramos de que el mensaje de éxito (el div) esté escondido, por si acaso
            if (successMessageDiv) {
                successMessageDiv.classList.add('hidden');
            }
        }
    });
});