import template from './chats.hbs';
import './chats.scss';
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
                title: "Chats",
                chatList: ["Anny", "Polly", "Steve", "Mary"],
                messages: [
                    { user: "Пользователь 1", text: "Привет!", right: false },
                    { user: "Пользователь 2", text: "Здравствуй!", right: true },
                    { user: "Пользователь 1", text: "Как дела?", right: false },
                    { user: "Пользователь 2", text: "Всё отлично, спасибо!", right: true }
                ]
            };
            app.innerHTML = template(props);

            // Пример использования EventBus
            const profileLink = document.querySelector('.button-my-profile a');
            if (profileLink) {
                profileLink.addEventListener('click', (event) => {
                    event.preventDefault();
                    this.eventBus.emit('navigate', '/profile');
                });
            }

            const logoutLink = document.querySelector('.button-logout a');
            if (logoutLink) {
                logoutLink.addEventListener('click', (event) => {
                    event.preventDefault();
                    this.eventBus.emit('navigate', '/login');
                });
            }
        } else {
            console.error('App element not found in the DOM.');
        }
    }
}


