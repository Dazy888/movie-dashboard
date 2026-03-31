import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Це допомагає уникнути проблем з подвійними версіями Apollo
      '@apollo/client': path.resolve(__dirname, 'node_modules/@apollo/client'),
    },
  },
  optimizeDeps: {
    // Примусово попередньо збираємо Apollo, щоб перетворити CommonJS в ESM
    include: ['@apollo/client/core', '@apollo/client/react'],
    exclude: ['@apollo/client/testing']
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true, // Важливо для Apollo Client 4
    },
  },
})
