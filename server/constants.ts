// Bun automatically parses and injects environment variables from the .env file.
// The OPENAI_API_KEY is read automatically by `llamaindex`.

export const SPOTIFY_CLIENT_ID = import.meta.env.SPOTIFY_CLIENT_ID;
export const SPOTIFY_CLIENT_SECRET = import.meta.env.SPOTIFY_CLIENT_SECRET;

export const PORT = import.meta.env.PORT ?? 3000;
export const SITE_URL = import.meta.env.SITE_URL ?? "http://localhost:3000/";
