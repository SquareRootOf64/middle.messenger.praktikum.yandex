document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form') as HTMLFormElement;
    const loginInput = document.querySelector('#login') as HTMLInputElement;
    const passwordInput = document.querySelector('#password') as HTMLInputElement;
    const enterButton = document.querySelector('.enter-button a') as HTMLAnchorElement;

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const login = loginInput.value;
        const password = passwordInput.value;

        if (login && password) {
            console.log('Login:', login);
            console.log('Password:', password);

            // Here handle the login logic, e.g., send a request to the server

            // For now, just redirecting to the chat page
            window.location.href = 'src/chats/chats.html';
        } else {
            alert('Please enter both login and password');
        }
    });

    enterButton.addEventListener('click', (event) => {
        event.preventDefault();
        form.dispatchEvent(new Event('submit'));
    });
});
