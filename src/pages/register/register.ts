import template from './register.hbs';
import './register.scss';
import EventBus from '../../utils/EventBus';

export default class Register {
    eventBus: EventBus;

    constructor(eventBus: EventBus) {
        this.eventBus = eventBus;
    }

    render() {
        const app = document.getElementById('app');
        if (app) {
            const props = {
                title: "Sign up",
                firstNameLabel: "First name",
                secondNameLabel: "Second name",
                loginLabel: "Login",
                emailLabel: "Email",
                passwordLabel: "Password",
                phoneLabel: "Phone",
                createUserButtonText: "Create user",
                signInText: "Sign in"
            };

            app.innerHTML = template(props);

            // Пример использования EventBus
            const signInLink = document.querySelector('a');
            if (signInLink) {
                signInLink.addEventListener('click', (event) => {
                    event.preventDefault();
                    window.location.href = '/login';
                });
            }
            } else {
                console.error('App element not found in the DOM.');
            }
    }
}
