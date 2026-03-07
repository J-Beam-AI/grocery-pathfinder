import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg'],
      manifest: {
        name: 'Grocery Pathfinder',
        short_name: 'Pathfinder',
        description: 'Optimal shopping route through your store',
        theme_color: '#3b82f6',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: 'icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,ico,png,woff2}'],
        runtimeCaching: [
          {
            // Cache everything else with a network-first strategy
            urlPattern: /^https?:\/\/.*/,
            handler: 'NetworkFirst',
            options: { cacheName: 'runtime-cache' },
          },
        ],
      },
    }),
  ],
  test: {
    environment: 'node',
  },
})
