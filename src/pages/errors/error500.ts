import template from './error500.hbs';
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

            app.innerHTML = template({});
        } else {
            console.error('App element not found in the DOM.');
        }
    }
}
