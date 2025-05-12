interface ImportMetaEnv {
  readonly VITE_BACKEND_URL: string;
  // add other environment variables here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
