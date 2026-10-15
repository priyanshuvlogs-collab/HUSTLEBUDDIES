/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GA_ID?: string;
  /** Set to '1' for static preview builds that have no /api/contact endpoint. */
  readonly VITE_PREVIEW_MODE?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
