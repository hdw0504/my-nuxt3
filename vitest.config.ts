import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vitest/config'

// https://github.com/Qiskit/saiba/blob/ed74ec7471c8ae481928ffd22d8e9f3bced02ed5/vitest.config.ts
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    deps: {
      inline: ['@nuxt/test-utils-edge'],
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, '.'),
    },
  },
  plugins: [
    AutoImport({
      imports: ['vue', '@vueuse/core'],
      vueTemplate: true,
      dts: true,
    }),
    Components({
      dirs: ['./components'],
    }),
  ],
})
