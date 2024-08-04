import template from './login.hbs';
import EventBus from '../../utils/EventBus';
import {validateField, validateForm} from "../../utils/validator";

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
                signUpText: "Sign up"
            };

            app.innerHTML = template(props);

            const form = document.querySelector('form');
            if (form) {
                form.addEventListener('submit', (event) => {
                    event.preventDefault();
                    if (validateForm(form)) {
                        const formData = new FormData(form);
                        const data = {
                            login: formData.get('login'),
                            password: formData.get('password')
                        };
                        console.log(data);
                    }
                });

                const inputs = form.querySelectorAll('input');
                inputs.forEach((input) => {
                    input.addEventListener('blur', () => validateField(input));
                });
            } else {
                console.error('Form not found in the DOM.');
            }

            const signUpLink = document.querySelector('a');
            if (signUpLink) {
                signUpLink.addEventListener('click', (event) => {
                    event.preventDefault();
                    window.location.href = '/register';
                });
            }
        } else {
            console.error('App element not found in the DOM.');
        }
    }
}

