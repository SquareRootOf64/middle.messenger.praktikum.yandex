import template from './chats.html';
import 'chats.scss';
import EventBus from '../../utils/EventBus';

export default class Chats {
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
            const profileLink = document.querySelector('a');
            if (profileLink) {
                profileLink.addEventListener('click', (event) => {
                    event.preventDefault();
                    this.eventBus.emit('navigate', '/profile');
                });
            }
        } else {
            console.error('App element not found in the DOM.');
        }
    }
}
