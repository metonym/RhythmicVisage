# RhythmicVisage

> LLM-driven graphic design using my personal Spotify streaming history.

## Stack

- Frontend: Astro, Svelte, Tailwind CSS
- Backend: Bun, ElysiaJS
- Libraries & APIs: LlamaIndex, OpenAI, Spotify

## Installation

Prerequisites: [Bun](https://bun.sh/docs/installation)

To run this locally, you will need to provide the following environment variables:

- `OPENAI_API_KEY`
- `SPOTIFY_CLIENT_ID`
- `SPOTIFY_CLIENT_SECRET`

```sh
# Create a .env file and fill in the values.
cp .env.template .env
```

### Development

In development, backend and frontend are run separately on different ports.

Backend code is located in the `server` directory. To run it in development mode:

```sh
bun dev:server
```

Frontend code is found in the `client` directory.

```sh
bun dev:client
```

### Production

To create a local production build, we need to compile the frontend code and then run the server.

There is no build step for the backend code because Bun can execute TypeScript directly.

```sh
# Compile the frontend code
bun build:client

# Run the server
NODE_ENV=production bun start:server
```
