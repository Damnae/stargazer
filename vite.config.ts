import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => 
{
  return {
    plugins: [vue()],
    base: command === 'serve' ? '/' : '/stargazer/',
  }
})
