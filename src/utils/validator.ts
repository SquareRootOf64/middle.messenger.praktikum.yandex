export function validateField(input: HTMLInputElement): boolean {
    const value = input.value.trim();
    let isValid = false;
    let errorMessage = '';

    switch (input.name) {
        case 'first_name':
        case 'second_name':
            isValid = /^[A-ZА-ЯЁ][a-zA-Zа-яёА-ЯЁ-]+$/.test(value);
            errorMessage = isValid ? '' : 'Имя и фамилия должны начинаться с заглавной буквы и не содержать пробелов, цифр и спецсимволов.';
            break;
        case 'login':
            isValid = /^(?=.*[a-zA-Z])([a-zA-Z0-9_-]{3,20})$/.test(value);
            errorMessage = isValid ? '' : 'Логин должен содержать от 3 до 20 символов, латиницу, может содержать цифры, но не состоять из них.';
            break;
        case 'email':
            isValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
            errorMessage = isValid ? '' : 'Неверный формат email.';
            break;
        case 'password':
        case 'oldPassword':
        case 'newPassword':
            isValid = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/.test(value);
            errorMessage = isValid ? '' : 'Пароль должен содержать от 8 до 40 символов, обязательно хотя бы одну заглавную букву и цифру.';
            break;
        case 'phone':
            isValid = /^\+?\d{10,15}$/.test(value);
            errorMessage = isValid ? '' : 'Телефон должен содержать от 10 до 15 цифр и может начинаться с плюса.';
            break;
        case 'message':
            isValid = value.length > 0;
            errorMessage = isValid ? '' : 'Сообщение не должно быть пустым.';
            break;
        default:
            break;
    }

    const errorElement = input.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.textContent = errorMessage;
    } else if (!isValid) {
        const error = document.createElement('span');
        error.className = 'error-message';
        error.textContent = errorMessage;
        input.parentNode?.insertBefore(error, input.nextSibling);
    }

    return isValid;
}

export function validateForm(form: HTMLFormElement): boolean {
    const inputs = form.querySelectorAll('input');
    let isFormValid = true;
    inputs.forEach((input) => {
        if (!validateField(input)) {
            isFormValid = false;
        }
    });
    return isFormValid;
}
