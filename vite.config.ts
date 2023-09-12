import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { readdir, } from 'fs/promises'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(async ({ command, mode, ssrBuild }) => 
{
  const gamecoreFiles = await readdir(`${path.resolve(__dirname, 'src')}/gamecore/tasks/`)
  const gamecorePaths = gamecoreFiles.map(f => `./src/gamecore/tasks/${f}`)
  gamecorePaths.push('./src/gamecore/MissingTask.vue')

  console.log(gamecorePaths)
  return {
    plugins: [vue()],
    base: command === 'serve' ? '/' : '/stargazer/',
    resolve: 
    {
      alias: 
      {
          "@": `${path.resolve(__dirname, 'src')}/`,
      },
    },
    build: 
    {
      target: 'es2022',
      rollupOptions: 
      {
        output: 
        {
          // https://rollupjs.org/guide/en/#outputmanualchunks
          manualChunks: { 'tasks': gamecorePaths, },
        },
      },
    },
  }
})
