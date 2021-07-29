import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src', 'main.jsx'),
      name: 'materialUIMachineOptions',
      formats: ['es'],
      fileName: 'materialUIMachineOptions.js',
    },
  },
})
