import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { cjsInterop } from 'vite-plugin-cjs-interop';

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
        cjsInterop({
            dependencies: [
                '@emotion/styled/base',
                '@emotion/*',
            ],
        }),
        react()
    ],
    build: {
        target: "es2020",
        minify: false,
        sourcemap: true,
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
});
