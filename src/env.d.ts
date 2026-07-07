

/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly WEBHOOK_SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}