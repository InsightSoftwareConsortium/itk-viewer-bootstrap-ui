import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh(), cssInjectedByJsPlugin()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src', 'bootstrapUIMachineOptions.js'),
      name: 'bootstrapUIMachineOptions',
      formats: ['es'],
      fileName: 'bootstrapUIMachineOptions.js'
    }
  },
  resolve: {
    alias: {
      // used in pydata_sphinx_theme
      '../basic.css': './src/styles/sphinx-basic.css',
      '~bootstrap/scss/bootstrap': 'bootstrap/scss/bootstrap'
    }
  }
})
