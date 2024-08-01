import { defineConfig } from 'vite';
import handlebars from './vite-plugin-handlebars-precompile';
import { resolve } from 'node:path';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                chats: resolve(__dirname, 'src/chats/chats.html'),
                error404: resolve(__dirname, 'src/errors/error404.html'),
                error500: resolve(__dirname, 'src/errors/error500.html'),
                profile: resolve(__dirname, 'src/profile/profile.html'),
                register: resolve(__dirname, 'src/register/register.html'),
            },
        },
    },
    plugins: [handlebars()],
})
