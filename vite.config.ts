/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // describe, it, expect 등을 전역으로 사용
    environment: "jsdom", // 브라우저 환경 시뮬레이션
    setupFiles: "./src/setupTests.ts", // 테스트 전역 설정 파일
    css: true, // CSS 파일 처리 활성화 (필요시)
  },
});
