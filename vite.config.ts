import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { readdir, } from 'fs/promises'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(async ({ command, mode, ssrBuild }) => 
{
  const gamecoreFiles = await readdir(`${path.resolve(__dirname, 'src')}/views/gamecore/blocks/`)
  const gamecorePaths = gamecoreFiles.map(f => `./src/views/gamecore/blocks/${f}`)
  gamecorePaths.push('./src/views/gamecore/MissingBlock.vue')

  console.log(gamecorePaths)
  return {
    plugins: [vue()],
    base: command === 'serve' ? '/' : '/', // '/stargazer/',
    resolve: 
    {
      alias: 
      {
          "@": `${path.resolve(__dirname, 'src')}/`,
      },
    },
    build: 
    {
      rollupOptions: 
      {
        output: 
        {
          // https://rollupjs.org/guide/en/#outputmanualchunks
          manualChunks: { 'gamecore': gamecorePaths, },
        },
      },
    },
  }
})
