import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: ['./vitest.setup.ts'],
        css: true,
        // only test files in the src directory
        include: ['src/**/*.spec.tsx', 'src/**/*.spec.ts'],
    },
    resolve: {
        alias: {
            '@': '/src',
        },
    },
})