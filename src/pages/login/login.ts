import template from './login.hbs';
import EventBus from '../../utils/EventBus';

export default class Login {
    eventBus: EventBus;

    constructor(eventBus: EventBus) {
        this.eventBus = eventBus;
    }

    render() {
        const app = document.getElementById('app');
        if (app) {
            const props = {
                title: "Welcome to the Club!",
                subtitle: "Sign in",
                loginLabel: "Login",
                passwordLabel: "Password",
                enterButtonText: "Enter",
                signUpText: "Sign up",
            };
            app.innerHTML = template(props);

            // Пример использования EventBus
            const signUpLink = document.querySelector('a');
            if (signUpLink) {
                signUpLink.addEventListener('click', (event) => {
                    event.preventDefault();
                    window.location.href = '/register';
                });
            }
            const enterButton = document.querySelector('button');
            if (enterButton) {
                enterButton.addEventListener('click', (event) => {
                    event.preventDefault();
                    window.location.href = '/chats';
                });
            }
        } else {
            console.error('App element not found in the DOM.');
        }
    }
}
