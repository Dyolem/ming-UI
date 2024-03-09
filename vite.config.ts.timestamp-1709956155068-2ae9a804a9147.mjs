// vite.config.ts
import { fileURLToPath } from "node:url";
import path from "node:path";
import { defineConfig } from "file:///D:/%E6%96%B0%E5%BB%BA%E6%96%87%E4%BB%B6%E5%A4%B9%20(3)/%E5%89%8D%E7%AB%AF%E6%9D%82%E9%A1%B9/ming-UI/node_modules/.pnpm/vite@5.1.4_@types+node@20.11.25_less@4.2.0/node_modules/vite/dist/node/index.js";
import { vitepressDemo } from "file:///D:/%E6%96%B0%E5%BB%BA%E6%96%87%E4%BB%B6%E5%A4%B9%20(3)/%E5%89%8D%E7%AB%AF%E6%9D%82%E9%A1%B9/ming-UI/node_modules/.pnpm/vite-plugin-vitepress-demo@2.2.1_typescript@5.3.3_vitepress@1.0.0-rc.44/node_modules/vite-plugin-vitepress-demo/dist/index.js";
var __vite_injected_original_import_meta_url = "file:///D:/%E6%96%B0%E5%BB%BA%E6%96%87%E4%BB%B6%E5%A4%B9%20(3)/%E5%89%8D%E7%AB%AF%E6%9D%82%E9%A1%B9/ming-UI/vite.config.ts";
var baseUrl = fileURLToPath(new URL(".", __vite_injected_original_import_meta_url));
var vite_config_default = defineConfig({
  plugins: [
    vitepressDemo({
      glob: ["**/demos/*.vue"]
    })
  ],
  resolve: {
    alias: [
      {
        find: /^tov-ui/,
        replacement: path.resolve(baseUrl, "packages/utils/src")
      },
      {
        find: /^@ming-UI\/utils/,
        replacement: path.resolve(baseUrl, "packages/utils/src")
      }
    ]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxcdTY1QjBcdTVFRkFcdTY1ODdcdTRFRjZcdTU5MzkgKDMpXFxcXFx1NTI0RFx1N0FFRlx1Njc0Mlx1OTg3OVxcXFxtaW5nLVVJXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxcdTY1QjBcdTVFRkFcdTY1ODdcdTRFRjZcdTU5MzkgKDMpXFxcXFx1NTI0RFx1N0FFRlx1Njc0Mlx1OTg3OVxcXFxtaW5nLVVJXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi8lRTYlOTYlQjAlRTUlQkIlQkElRTYlOTYlODclRTQlQkIlQjYlRTUlQTQlQjklMjAoMykvJUU1JTg5JThEJUU3JUFCJUFGJUU2JTlEJTgyJUU5JUExJUI5L21pbmctVUkvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBmaWxlVVJMVG9QYXRoIH0gZnJvbSAnbm9kZTp1cmwnXG5pbXBvcnQgcGF0aCBmcm9tICdub2RlOnBhdGgnXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHsgdml0ZXByZXNzRGVtbyB9IGZyb20gJ3ZpdGUtcGx1Z2luLXZpdGVwcmVzcy1kZW1vJ1xuXG5jb25zdCBiYXNlVXJsID0gZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuJywgaW1wb3J0Lm1ldGEudXJsKSlcbi8vIGltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHZpdGVwcmVzc0RlbW8oe1xuICAgICAgZ2xvYjogWycqKi9kZW1vcy8qLnZ1ZSddLFxuICAgIH0pLFxuICBdLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IFtcbiAgICAgIHtcbiAgICAgICAgZmluZDogL150b3YtdWkvLFxuICAgICAgICByZXBsYWNlbWVudDogcGF0aC5yZXNvbHZlKGJhc2VVcmwsICdwYWNrYWdlcy91dGlscy9zcmMnKSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGZpbmQ6IC9eQG1pbmctVUlcXC91dGlscy8sXG4gICAgICAgIHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoYmFzZVVybCwgJ3BhY2thZ2VzL3V0aWxzL3NyYycpLFxuICAgICAgfSxcbiAgICBdLFxuICB9LFxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBK1UsU0FBUyxxQkFBcUI7QUFDN1csT0FBTyxVQUFVO0FBQ2pCLFNBQVMsb0JBQW9CO0FBQzdCLFNBQVMscUJBQXFCO0FBSG1JLElBQU0sMkNBQTJDO0FBS2xOLElBQU0sVUFBVSxjQUFjLElBQUksSUFBSSxLQUFLLHdDQUFlLENBQUM7QUFJM0QsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsY0FBYztBQUFBLE1BQ1osTUFBTSxDQUFDLGdCQUFnQjtBQUFBLElBQ3pCLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTDtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sYUFBYSxLQUFLLFFBQVEsU0FBUyxvQkFBb0I7QUFBQSxNQUN6RDtBQUFBLE1BQ0E7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLGFBQWEsS0FBSyxRQUFRLFNBQVMsb0JBQW9CO0FBQUEsTUFDekQ7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
