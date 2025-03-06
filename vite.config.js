import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],

  server: {
    host: '0.0.0.0',
    port:5173,

    proxy: {
      "/api": {
        target: "http://34.17.23.145:5173", 
        target: "http://10.210.0.2:5001", 
        changeOrigin: true,
        secure: false,
      },
    },
  }
})