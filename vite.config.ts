import { defineConfig } from 'vite';
import handlebars from './vite-plugin-handlebars-precompile';
import { resolve } from 'node:path';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                //login: resolve(__dirname, 'login.hbs'),
                chats: resolve(__dirname, 'src/pages/chats/chats.html'),
                error404: resolve(__dirname, 'src/pages/errors/error404.html'),
                error500: resolve(__dirname, 'src/pages/errors/error500.html'),
                profile: resolve(__dirname, 'src/pages/profile/profile.html'),
                register: resolve(__dirname, 'src/pages/register/register.html'),
            },
        },
    },
    plugins: [handlebars()],
})
