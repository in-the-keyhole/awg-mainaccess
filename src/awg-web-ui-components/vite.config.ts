/// <reference types='vitest' />
import { isAbsolute } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';

export default defineConfig({
    root: __dirname,
    plugins: [
        react(),
        dts({ entryRoot: 'src' })
    ],
    build: {
        target: "esnext",
        emptyOutDir: true,
        sourcemap: true,
        commonjsOptions: {
            transformMixedEsModules: true,
        },
        lib: {
            name: '@awg/web-ui-components',
            fileName: 'index',
            entry: 'src/index.ts',
            formats: ['es']
        },
        rollupOptions: {
            external: id => !isAbsolute(id) && !id.startsWith("."),
            output: {
                preserveModules: true,
                preserveModulesRoot: 'src',
                entryFileNames: '[name].mjs',
                assetFileNames: '[name][extname]',
            }
        }
    },
    define: {
        'import.meta.vitest': undefined
    },
    test: {
        includeSource: [
            "jest.config.ts",
            "**/*.spec.ts",
            "**/*.test.ts",
            "**/*.spec.tsx",
            "**/*.test.tsx",
            "**/*.spec.js",
            "**/*.test.js",
            "**/*.spec.jsx",
            "**/*.test.jsx"
        ]
    }
})
