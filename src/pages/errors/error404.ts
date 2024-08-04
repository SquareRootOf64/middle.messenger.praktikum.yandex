import template from './error404.hbs';
import './error404.scss';
import EventBus from '../../utils/EventBus';

export default class Error404 {
    eventBus: EventBus;

    constructor(eventBus: EventBus) {
        this.eventBus = eventBus;
    }

    render() {
        const app = document.getElementById('app');
        if (app) {
            const props = {

            };
            app.innerHTML = template(props);


            const backToChatsLink = document.querySelector('a');
            if (backToChatsLink) {
                backToChatsLink.addEventListener('click', (event) => {
                    event.preventDefault();
                    window.location.href = '/chats';
                });
            }

        } else {
            console.error('App element not found in the DOM.');
        }
    }
}

