import template from './register.hbs';
import '../../pages/register/register.scss';
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
                // Дополните объект props нужными данными
            };
            app.innerHTML = template(props);

            // Пример использования EventBus
            const signInLink = document.querySelector('a');
            if (signInLink) {
                signInLink.addEventListener('click', (event) => {
                    event.preventDefault();
                    this.eventBus.emit('navigate', '/login');
                });
            }
        } else {
            console.error('App element not found in the DOM.');
        }
    }
}
