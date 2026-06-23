import { defineConfig } from 'vite'

export default defineConfig({
build: {
    lib: {
      entry: 'main.ts',
      name: 'App',
      fileName: 'app'
    },
    outDir: 'dist'
  }

})