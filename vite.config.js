import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // 自动导包
    AutoImport({
      imports: [
        // 插件预设支持导入的api
        "vue",
      ],
    }),
  ],
});
