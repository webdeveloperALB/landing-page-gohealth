import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'GoHealth Albania',
        short_name: 'GoHealth',
        description: 'Book your medical appointments online with GoHealth Albania.',
        theme_color: '#008CBA',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/NavbarLogo.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/NavbarLogo.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})
