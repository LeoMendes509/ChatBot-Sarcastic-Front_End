import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // 🔧 Configurações do servidor local (desenvolvimento)
  server: {
    port: 5173,        // fixa a porta
    strictPort: true,  // não pula para 5174 se 5173 estiver ocupada
    open: true,        // abre o navegador automaticamente
  },

  // 🌍 Configurações de build (para deploy)
  build: {
    outDir: 'dist',    // pasta de saída do build
  },
})
