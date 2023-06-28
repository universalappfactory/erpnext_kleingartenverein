import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { getProxyOptions } from 'frappe-ui/src/utils/vite-dev-server'
import { webserver_port } from '../../../sites/common_site_config.json'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 8080,
    proxy: getProxyOptions({ port: webserver_port }),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    extract: true
  },
  build: {
    outDir: `../${path.basename(path.resolve('..'))}/public/frontend/db`,
    emptyOutDir: true,
    target: 'es2015',
    cssCodeSplit: true, // Stelle sicher, dass dies auf true gesetzt ist, um das CSS zu splitten
    cssMinify: true,
    minify: true,
    rollupOptions: {
      input: [
        'src/main.ts',
        'index.html',
        `${path.resolve(__dirname)}/test.html`,
      ],
      external: /^lit-element/,
    },
    // terserOptions: {
    //   compress: {
    //     keep_classnames: true, // Bestimmte CSS-Klassen beibehalten
    //     keep_fnames: true // Bestimmte CSS-Klassen beibehalten
    //   }
    // }

  },
  optimizeDeps: {
    include: ['frappe-ui > feather-icons', 'showdown', 'engine.io-client'],

  },
})