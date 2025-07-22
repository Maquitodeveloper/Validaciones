document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const countryCodeSelect = document.getElementById('countryCode');
    const phoneInput = document.getElementById('phone');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const submitButton = document.getElementById('submitButton');
    const toggle = document.getElementById('toggle-password')
    const backgroundVideo = document.getElementById('backgroundVideo');

    // ---Datos de Paises en un lista de una vez sin tanto peo ---
    const countries = [
        { name: 'Estados Unidos', code: '+1' }, { name: 'Canada', code: '+1' },
        { name: 'Reino Unido', code: '+44' }, { name: 'Espana', code: '+34' },
        { name: 'Mexico', code: '+52' }, { name: 'Argentina', code: '+54' },
        { name: 'Colombia', code: '+57' }, { name: 'Venezuela', code: '+58' },
        { name: 'Chile', code: '+56' }, { name: 'Peru', code: '+51' },
        { name: 'Ecuador', code: '+593' }, { name: 'Bolivia', code: '+591' },
        { name: 'Paraguay', code: '+595' }, { name: 'Uruguay', code: '+598' },
        { name: 'Brasil', code: '+55' }, { name: 'Alemania', 'code': '+49' },
        { name: 'Francia', code: '+33' }, { name: 'Italia', code: '+39' },
        { name: 'Australia', code: '+61' }, { name: 'India', code: '+91' },
        { name: 'China', code: '+86' }, { name: 'Japon', code: '+81' },
        { name: 'Sudafrica', code: '+27' }, { name: 'Nigeria', code: '+234' },
        { name: 'Egipto', code: '+20' }, { name: 'Arabia Saudita', code: '+966' },
        { name: 'Emiratos Arabes Unidos', code: '+971' }, { name: 'Rusia', code: '+7' },
        { name: 'Portugal', code: '+351' }, { name: 'Belgica', code: '+32' },
        { name: 'Paises Bajos', code: '+31' }, { name: 'Suecia', code: '+46' },
        { name: 'Noruega', code: '+47' }, { name: 'Dinamarca', code: '+45' },
        { name: 'Finlandia', code: '+358' }, { name: 'Irlanda', code: '+353' },
        { name: 'Suiza', code: '+41' }, { name: 'Austria', code: '+43' },
        { name: 'Grecia', code: '+30' }, { name: 'Turquia', code: '+90' },
        { name: 'Corea del Sur', code: '+82' }, { name: 'Singapur', code: '+65' },
        { name: 'Malasia', code: '+60' }, { name: 'Indonesia', code: '+62' },
        { name: 'Tailandia', code: '+66' }, { name: 'Filipinas', code: '+63' },
        { name: 'Vietnam', code: '+84' }, { name: 'Nueva Zelanda', code: '+64' }
    ];

    const updateFieldStatus = (element, status, message = '') => {
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector('.error-message');
        const checkIcon = inputControl.querySelector('.fa-check-circle');
        const exclamationIcon = inputControl.querySelector('.fa-exclamation-circle');

        // Primero, limpia 
        inputControl.classList.remove('success', 'error');
        if (errorDisplay) errorDisplay.textContent = '';
        if (checkIcon) checkIcon.style.visibility = 'hidden';
        if (exclamationIcon) exclamationIcon.style.visibility = 'hidden';

    
        if (status === 'success') {
            inputControl.classList.add('success');
            if (checkIcon) checkIcon.style.visibility = 'visible';
        } else if (status === 'error') {
            inputControl.classList.add('error');
            if (errorDisplay) errorDisplay.textContent = message;
            if (exclamationIcon) exclamationIcon.style.visibility = 'visible';
        }
    };

    // --- 3. Configuracion de los campos [fields]---
    const formFields = [
        {
            element: usernameInput,
            validationFn: (username) => {
                if (username === '') return false;
                return username.length >= 6 && username.length <= 16;
            },
            errorMessage: 'El nombre debe tener de 6 a 16 caracteres'
        },
        {
            element: emailInput,
            validationFn: (email) => {
                if (email === '') return false;
                return /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);
            },
            errorMessage: '¡El correo es obligatorio y debe ser de Gmail! '
        },
        {
            element: phoneInput,
            validationFn: (fullPhoneNumber) => {
                const currentCountryCode = countryCodeSelect.value;
                // Si esta vacio o solo contiene el codigo de pais, no sirve
                if (fullPhoneNumber === '' || fullPhoneNumber === currentCountryCode) {
                    return false;
                }
                const escapedCountryCode = currentCountryCode.replace(/[+]/g, '\\+');
                const phoneRegex = new RegExp(`^${escapedCountryCode}\\d{7,15}$`);
                return phoneRegex.test(fullPhoneNumber);
            },
            errorMessage: 'El numero de telefono debe contener entre 7 y 15 digitos'
        },
        {
            element: passwordInput,
            validationFn: (password) => {
                if (password === '') return false;
                const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
                return password.length >= 4 && password.length <= 18 && passwordRegex.test(password);
            },
            errorMessage: 'Debe tener al menos 8 caractere($,1,M,m)'
        },
        {
            element: confirmPasswordInput,
            validationFn: (confirmPassword) => {
                if (confirmPassword === '') return false;
                return confirmPassword === passwordInput.value;
            },
            errorMessage: '¡Las contrasenas no son iguales, Aweboniao!'
        }
    ];

    // --- 4. Habilitar/deshabilitar el botoM---
    const checkFormAndToggleButton = () => {
        const allFieldsValid = formFields.every(field => {
            const value = field.element.value.trim();
            if (!field.validationFn(value)) {
                return false;
            }
            return true;
        });
        submitButton.disabled = !allFieldsValid;
    };

    // --- 5. Codigos de pais ---
    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country.code;
        option.textContent = country.name;
        countryCodeSelect.appendChild(option);
    });
    countryCodeSelect.value = '+58'; // Venecozuela
    phoneInput.value = countryCodeSelect.value;
    phoneInput.placeholder = `Numero de Telefono (Ej: ${countryCodeSelect.value} XXXX-XXXXXXX)`;
    submitButton.disabled = true; // Deshabilitar el boton al cargar la pagina

    // --- 6. ¡Aqui le metemos los pajuitos
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
        phoneInput.placeholder = `Numero de Telefono (Ej: ${countryCodeSelect.value} XXXX-XXXXXXX)`;
        // Vuelve a validar el campo de telefono 
        const phoneFieldConfig = formFields[2];
        const phoneValue = phoneInput.value.trim();
        if (!phoneFieldConfig.validationFn(phoneValue)) {
            updateFieldStatus(phoneInput, 'error', phoneFieldConfig.errorMessage);
        } else {
            updateFieldStatus(phoneInput, 'success');
        }
        checkFormAndToggleButton();
    });

    // --- 6. ¡'Registrar'! que locurita CHAMO TENGO SUENO Y SIGO EN ESTO HELP SACQUENME DE VENEZUELA ---
    form.addEventListener('submit', (e) => {
        e.preventDefault();

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
            alert("😜🤪Felicidades ya estas registrado😜🤪");
            form.reset();

            document.querySelectorAll('.input-control input, .input-control select').forEach(element => {
                updateFieldStatus(element, 'clear');
            });
            submitButton.disabled = true;

            // --- ¡EL INIESTASO! ---
           
            form.style.display = 'none';

            document.body.style.backgroundColor = '#000000'; 

            // Muestra el INIESTASO que gran video easy asi se terminan las cositas easy 
            backgroundVideo.style.display = 'block'; // Hace visible el videito enfoca enfoca
            backgroundVideo.play(); 
        }
    });
});
