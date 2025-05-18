/// <reference types='vitest' />
import { resolve } from 'node:path'
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    root: __dirname,
    server: {
        port: 4200,
        changeOrigin: true,
        host: 'localhost',
    },
    preview: {
        port: 4300,
        host: 'localhost',
    },
    plugins: [
        react()
    ],
    resolve: {
        alias: {
            "@mui/styled-engine": resolve(__dirname, "node_modules/@mui/styled-engine"),
        }
    },
    build: {
        minify: false,
        sourcemap: true,
        emptyOutDir: true,
        rollupOptions: {
            output: {
                format: 'cjs',
                interop: 'auto',
                entryFileNames: '[name].js',
                assetFileNames: '[name][extname]'
            }
        }
    },
    define: {
        'import.meta.vitest': undefined
    },
    test: {
        watch: false,
        globals: true,
        environment: 'jsdom',
        include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        includeSource: ['src/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        reporters: ['default'],
        coverage: {
            reportsDirectory: 'coverage',
            provider: 'v8' as const,
        },
    },
});
