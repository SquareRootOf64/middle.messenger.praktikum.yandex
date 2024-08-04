import EventBus from './src/utils/EventBus';
import Login from './src/pages/login/login';
import Register from './src/pages/register/register';
import Chats from './src/pages/chats/chats';
import Profile from './src/pages/profile/profile';
import Error404 from './src/pages/errors/error404';
import Error500 from './src/pages/errors/error500';

// Инициализация EventBus
const eventBus = new EventBus();

// Функция для рендеринга страницы на основе текущего пути
function renderPage() {
    const app = document.getElementById('app');
    if (!app) {
        console.error('App element not found in the DOM.');
        return;
    }

    const path = window.location.pathname;

    switch (path) {
        case '/':
        case '/login':
            const loginPage = new Login(eventBus);
            loginPage.render();
            break;
        case '/register':
            const registerPage = new Register(eventBus);
            registerPage.render();
            break;
        case '/chats':
            const chatsPage = new Chats(eventBus);
            chatsPage.render();
            break;
        case '/profile':
            const profilePage = new Profile(eventBus);
            profilePage.render();
            break;
        case '/error404':
            const error404Page = new Error404(eventBus);
            error404Page.render();
            break;
        case '/error500':
            const error500Page = new Error500(eventBus);
            error500Page.render();
            break;
        default:
            const errorPage = new Error404(eventBus);
            errorPage.render();
            break;
    }
}

// Инициализация рендеринга при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    renderPage();
});
