interface ImportMetaEnv {
  readonly SSR: boolean;
  readonly PUBLIC_SPOTIFY_CLIENT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
