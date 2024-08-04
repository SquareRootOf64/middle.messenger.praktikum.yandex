import template from './register.hbs';
import './register.scss';
import EventBus from '../../utils/EventBus';
import {validateField, validateForm} from "../../utils/validator";

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

            // Добавляем обработчики событий
            const form = document.querySelector('form');
            if (form) {
                form.addEventListener('submit', (event) => {
                    event.preventDefault();
                    if (validateForm(form)) {
                        const formData = new FormData(form);
                        const data = {
                            first_name: formData.get('first_name'),
                            second_name: formData.get('second_name'),
                            login: formData.get('login'),
                            email: formData.get('email'),
                            password: formData.get('password'),
                            phone: formData.get('phone')
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

