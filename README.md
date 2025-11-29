# Brahma-Firelight + React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and Brahma-Firelight (A Rust based high speed server writen on top of TOKIO)

## Get Started!!

```bash
npm install
npm run build
npm run dev
```

## To set API proxy during dev (vite.config.ts/js)

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:2000", // your backend port (brahma-firelight API)
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
```

### Brahma-Firelight `The Ultra Fast Rust based JavaScript Framework` [Read Docs](https://shyam20001.github.io/rsjs/)
