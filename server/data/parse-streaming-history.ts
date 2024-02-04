import fs from "node:fs";
import type { DateString, SpotifyTrack } from "types";

function parseStreamingHistory() {
  console.time("parse");
  let text = `I am a Spotify user for the past seven years. Below is a summary of my listening history.\n\n`;

  const files = fs.readdirSync("./server/data/streaming-history/raw");

  for (const file of files) {
    // For now, try indexing on a single file.
    if (!file.endsWith("2023_15.json")) continue;

    const data = fs.readFileSync(
      `./server/data/streaming-history/raw/${file}`,
      "utf-8",
    );
    const tracks = JSON.parse(data) as SpotifyTrack[];

    text += parseTracks(tracks);
  }

  fs.writeFileSync(
    "./server/data/streaming-history/text.ts",
    `export const text = \`${text};\``,
  );
  console.timeEnd("parse");
}

// Format the streaming history for one file.
function parseTracks(tracks: ReadonlyArray<SpotifyTrack>) {
  const tracksByDate = new Map<DateString, SpotifyTrack[]>();

  for (const track of tracks) {
    const [date] = track.ts.split("T");
    if (!date) continue;

    if (tracksByDate.has(date)) {
      tracksByDate.set(date, tracksByDate.get(date)!.concat(track));
    } else {
      tracksByDate.set(date, [track]);
    }
  }

  let data = "";

  Array.from(tracksByDate).forEach(([date, tracks]) => {
    data += `On ${date}, I listened to the following songs:\n`;
    tracks.forEach((track, index) => {
      data += `  - At ${track.ts}, I listened to "${track.master_metadata_track_name}" by artist "${track.master_metadata_album_artist_name}" for ${track.ms_played}ms. The track ID is "${track.spotify_track_uri}"\n`;

      if (index === tracks.length - 1) data += "\n";
    });
  });

  return data;
}

parseStreamingHistory();
