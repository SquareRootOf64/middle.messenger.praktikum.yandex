import template from './profile';
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
                // Дополните объект props нужными данными
            };
            app.innerHTML = template(props);

            // Пример использования EventBus
            const chatsLink = document.querySelector('a');
            if (chatsLink) {
                chatsLink.addEventListener('click', (event) => {
                    event.preventDefault();
                    this.eventBus.emit('navigate', '/chats');
                });
            }
        } else {
            console.error('App element not found in the DOM.');
        }
    }
}
