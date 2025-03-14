import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from "vite-tsconfig-paths"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  define: {
    global: "window", // Định nghĩa global là window trong trình duyệt
  },
  build: {
    outDir: 'dist', // Đảm bảo thư mục đầu ra là 'dist'
  },
})
