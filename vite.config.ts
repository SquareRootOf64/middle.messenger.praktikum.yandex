import { defineConfig } from 'vite';
import handlebars from './vite-plugin-handlebars-precompile';
import { resolve } from 'node:path';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                chats: resolve(__dirname, 'src/pages/chats/chats.hbs'),
                error404: resolve(__dirname, 'src/pages/errors/error404.hbs'),
                error500: resolve(__dirname, 'src/pages/errors/error500.hbs'),
                profile: resolve(__dirname, 'src/pages/profile/profile.hbs'),
                register: resolve(__dirname, 'src/pages/register/register.hbs'),
            },
        },
    },
    plugins: [handlebars()],
})
