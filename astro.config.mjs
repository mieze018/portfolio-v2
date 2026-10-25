import { fileURLToPath } from 'node:url'
import react from '@astrojs/react'
import tailwind from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

export default defineConfig({
  site: 'https://www.mieze018.net',
  output: 'static',
  server: { port: 3000 },
  trailingSlash: 'never',
  integrations: [react()],
  vite: {
    plugins: [tailwind()],
    css: { postcss: { plugins: [] } },
    resolve: {
      alias: {
        libs: fileURLToPath(new URL('./libs', import.meta.url)),
        components: fileURLToPath(new URL('./components', import.meta.url)),
      },
    },
  },
})
