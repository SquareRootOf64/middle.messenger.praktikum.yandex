import template from './profile.hbs';
import '../../pages/profile/profile.scss';
import EventBus from '../../utils/EventBus';

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

            // Пример использования EventBus
            const backLink = document.querySelector('a');
            if (backLink) {
                backLink.addEventListener('click', (event) => {
                    event.preventDefault();
                    this.eventBus.emit('navigate', '/chats');
                });
            }
        } else {
            console.error('App element not found in the DOM.');
        }
    }
}
