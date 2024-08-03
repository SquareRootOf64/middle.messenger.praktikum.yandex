import template from '../../templates/login.hbs';
import '../../pages/login/login.scss';
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
                    this.eventBus.emit('navigate', '/register');
                });
            }
        } else {
            console.error('App element not found in the DOM.');
        }
    }
}
