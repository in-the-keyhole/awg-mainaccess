import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig(() => ({
    base: '/landing',
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
        react(), 
    ],
    build: {
        emptyOutDir: true,
        reportCompressedSize: true,
        commonjsOptions: {
            transformMixedEsModules: true,
        },
        rollupOptions: {
            output: {
                entryFileNames: '[name].js',
                assetFileNames: '[name][extname]',
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
}));
