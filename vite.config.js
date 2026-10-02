import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { VitePWA } from 'vite-plugin-pwa'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig(({ mode }) => ({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.js',
      registerType: 'autoUpdate',
      injectRegister: 'script-defer',
      injectManifest: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}']
      },
      manifest: {
        name: 'FreshCart | Fresh Groceries Delivered to Your Door',
        short_name: 'FreshCart',
        description: 'Shop fresh groceries, fashion, electronics and more at FreshCart.',
        theme_color: '#00dc82',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: '/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
          { src: '/favicon/web-app-manifest-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: '/favicon/web-app-manifest-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: '/favicon/web-app-manifest-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ]
      }
    }),
    mode === 'analyze' &&
      visualizer({ filename: 'stats.html', gzipSize: true, open: true })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
}))