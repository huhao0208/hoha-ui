import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import eslint from 'vite-plugin-eslint'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import checker from 'vite-plugin-checker';
export default defineConfig({
    plugins: [
        vue(),
        vueSetupExtend(),
        vueJsx(),
        eslint({
            exclude:'src/**/*',
            cache: false
        }),
        createSvgIconsPlugin({
            // 要缓存的图标文件夹
            iconDirs: [path.resolve(__dirname, "src/svg")],
            // 执行 icon name 的格式
            symbolId: "icon-[name]",
        }),
        checker({
            vueTsc: true,
        }),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
    },
    server: {
        port: 3000,
        cors: true,
        proxy: {},
        // hmr: {
        //   overlay: false
        // }
    },
    envDir: path.resolve(__dirname, "env"),
    build: {
        outDir: path.resolve(__dirname, "../dist"),
    },
});
