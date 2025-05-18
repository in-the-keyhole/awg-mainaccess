/// <reference types='vitest' />
import { isAbsolute, resolve } from 'node:path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
    root: __dirname,
    plugins: [
        dts({ entryRoot: 'src' })
    ],
    build: {
        emptyOutDir: true,
        sourcemap: true,
        commonjsOptions: {
            transformMixedEsModules: true,
        },
        lib: {
            name: '@awg/web-services',
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
