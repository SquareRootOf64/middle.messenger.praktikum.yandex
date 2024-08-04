import template from './profile.hbs';
import '../../pages/profile/profile.scss';
import EventBus from '../../utils/EventBus';
import {validateField, validateForm} from "../../utils/validator";


export default class Profile {
    eventBus: EventBus;

    constructor(eventBus: EventBus) {
        this.eventBus = eventBus;
    }

    render() {
        const app = document.getElementById('app');
        if (app) {
            const props = {
                title: "User Settings",
                firstNameLabel: "First Name:",
                secondNameLabel: "Second Name:",
                displayNameLabel: "Display Name:",
                loginLabel: "Login:",
                emailLabel: "Email:",
                phoneLabel: "Phone:",
                avatarLabel: "Avatar:",
                oldPasswordLabel: "Old Password:",
                newPasswordLabel: "New Password:",
                saveChangesButtonText: "Save Changes",
                backLinkText: "Back"
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
                            display_name: formData.get('display_name'),
                            login: formData.get('login'),
                            email: formData.get('email'),
                            phone: formData.get('phone'),
                            avatar: formData.get('avatar'),
                            oldPassword: formData.get('oldPassword'),
                            newPassword: formData.get('newPassword')
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

            const backLink = document.querySelector('a');
            if (backLink) {
                backLink.addEventListener('click', (event) => {
                    event.preventDefault();
                    window.location.href = '/chats';
                });
            }
        } else {
            console.error('App element not found in the DOM.');
        }
    }
}
