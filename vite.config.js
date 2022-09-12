import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/assets/sass/app.scss',
                'resources/app.js',
            ],
            refresh: true
        }),            
        react()
    ],
    resolve: {
        alias: {
            '@': '/resources/ts',
        }
    }
});