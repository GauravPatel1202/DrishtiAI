

import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react' // or your framework plugin

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current directory
  const env = loadEnv(mode, process.cwd(), 'VITE_')

  return {
     plugins: [react(), tailwindcss()],
    server: {
      port: parseInt(env.VITE_PORT || '3000'),
      host: env.VITE_HOST === 'true' ? true : env.VITE_HOST || '0.0.0.0',
      open: env.VITE_OPEN === 'true',
      strictPort: true
    },
    define: {
      __APP_ENV__: JSON.stringify(env.VITE_ENVIRONMENT),
    },
  }
})
