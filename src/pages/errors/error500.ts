import template from './error500';
import './error500.scss';
import EventBus from '../../utils/EventBus';

export default class Error500 {
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
        } else {
            console.error('App element not found in the DOM.');
        }
    }
}
