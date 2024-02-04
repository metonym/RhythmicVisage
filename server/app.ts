import { cors } from "@elysiajs/cors";
import { staticPlugin } from "@elysiajs/static";
import { Elysia, t } from "elysia";
import { Stream } from "@elysiajs/stream";
import { PORT } from "./constants";
import { queryEngine } from "./llama/engine";
import { format, format_2, format_3 } from "./llama/prompt";
import { getSpotifyTracks } from "./api/spotify-web";
import type { SpotifyTrackURI } from "types";

const app = new Elysia();

if (import.meta.env.NODE_ENV === "development") {
  // In development, the backend and frontend run on different ports.
  // We need to enable CORS to allow the frontend to make requests to the backend.
  app.use(
    cors({
      // The default Vite server port.
      origin: ["localhost:4321"],
      methods: ["POST"],
    }),
  );
}

if (import.meta.env.NODE_ENV === "production") {
  // In production, the server serves the compiled frontend assets.
  // CORS is not needed because the frontend and backend are served from the same origin.
  app.use(
    staticPlugin({
      assets: "dist",
      prefix: "/",
      indexHTML: true,
    }),
  );
}

app
  .get(
    "/api/stream",
    (req) => {
      const query = req.query.query;

      // The frontend will use a `contentedtitable` for inputting text
      // so we need to escape the query to prevent the user from injecting HTML.
      const text = Bun.escapeHTML(query);

      return new Stream(async (stream) => {
        const response = await queryEngine.query({
          query: text + `\n${format_3}`,
          stream: true,
        });

        for await (const chunk of response) {
          stream.send({
            status: "ok",
            data: chunk.response,
          });
        }

        stream.send({
          status: "done",
          data: "",
        });
        stream.close();
      });
    },
    {
      query: t.Object({ query: t.String() }),
    },
  )
  .post(
    "/api/query",
    async (req) => {
      const query = req.body.query;

      // The frontend will use a `contentedtitable` for inputting text
      // so we need to escape the query to prevent the user from injecting HTML.
      const text = Bun.escapeHTML(query);
      const stream = req.body.stream;

      console.log("Querying", text);

      if (stream) {
        return new Stream(async (stream) => {
          const response = await queryEngine.query({
            query: text + `\n${format_2}`,
            stream: true,
          });

          for await (const chunk of response) {
            console.log("chunk", chunk.response);
            stream.send(chunk.response);
          }

          stream.close();
        });
      } else {
        const response = await queryEngine.query({
          query: text + `\n${format}`,
        });

        return {
          response: response.toString(),
        };
      }
    },
    {
      body: t.Object({ query: t.String(), stream: t.Boolean() }),
    },
  )
  .post(
    "/api/spotify",
    async (req) => {
      const trackUris = req.body.track_uris as SpotifyTrackURI[];
      const data = await getSpotifyTracks(trackUris);

      return {
        data,
      };
    },
    {
      body: t.Object({ track_uris: t.Array(t.String()) }),
    },
  )
  .get("/404", (req) => {
    req.set.redirect = "/";
  });

app.onError(console.error);

app.listen(PORT, (server) => {
  console.log(
    `[${import.meta.env.NODE_ENV}] Serving http://${server.hostname}:${server.port}`,
  );
});
