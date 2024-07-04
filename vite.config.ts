import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@mswjs/data': '@mswjs/data',
      'msw': 'msw'
    }
  },
  optimizeDeps: {
    include: ['msw']
  }
})
