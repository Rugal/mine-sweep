/// <reference types="vite/client" />

// https://vitejs.dev/guide/env-and-mode.html
interface ImportMetaEnv {
  readonly VITE_RAIZEKUSU_HOST: string
  readonly VITE_VALSTRAX_HOST: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
