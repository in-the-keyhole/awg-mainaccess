/// <reference types='vitest' />
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr' 
import sourcemaps from 'rollup-plugin-sourcemaps2';

export default defineConfig({
    root: __dirname,
    plugins: [
        react(),
        svgr()
    ],
    resolve: {
        alias: {
            "@emotion/styled": resolve(__dirname, "../../node_modules/@emotion/styled"),
        }
    },
    build: {
        emptyOutDir: true,
        minify: false,
        sourcemap: true,
        rollupOptions: {
            plugins: [
                sourcemaps()
            ],
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
        }
    }
});
