import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import {fileURLToPath, URL} from 'node:url';
import vuetify from 'vite-plugin-vuetify';

// https://vite.dev/config/
export default defineConfig({
  base: '/test-pages/',
  server: {
    port: 4575
  },
  plugins: [
    vue(),
    vuetify({
      autoImport: true,
      styles: {
        configFile: './src/app/ui/assets/style/vuetify/settings.scss'
      }
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        additionalData: '@use "@app/ui/assets/style/settings/index" as *;'
      }
    }
  },
  resolve: {
    alias: {
      '@modules': fileURLToPath(new URL('./src/modules', import.meta.url)),
      '@remote': fileURLToPath(new URL('./src/remote', import.meta.url)),
      '@app': fileURLToPath(new URL('./src/app', import.meta.url))
    }
  }
});
