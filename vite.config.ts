import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

import { fileURLToPath } from 'url'
import { dirname } from 'path'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
    plugins: [
        react(),
        dts({
            insertTypesEntry: true
        })
    ],
    build: {
        outDir: 'lib',
        cssTarget: 'chrome61', // 防止 vite 将 rgba() 颜色转化为 #RGBA 十六进制
        lib: {
            entry: path.resolve(__dirname, 'packages/index.ts'),
            name: 'PackageName',
            fileName: 'package-name'
        },
        rollupOptions: {
            external: ['react', 'react-dom'],
            output: {
                globals: {
                    react: 'react',
                    'react-dom': 'react-dom'
                }
            }
        }
    },
    server: {
        host: '0.0.0.0',
        port: 7788,
        hmr: true
    }
})
