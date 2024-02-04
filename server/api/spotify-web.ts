import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from "server/constants";
import type { SpotifyTrack } from "types";

/**
 * The Spotify Web API is used to get track metadata.
 * @see https://developer.spotify.com/documentation/web-api
 */

// Use the client credentials flow to authenticate with the Spotify API.
// This is the recommended way to authenticate when you don't need to access user data.
// The Spotify SDK will refresh the bearer token when it expires after an hour.
const api = SpotifyApi.withClientCredentials(
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
);

type SpotifyTrackURIs = ReadonlyArray<SpotifyTrack["spotify_track_uri"]>;

// Utility function to extract the track IDs from the Spotify URIs.
const getSpotifyTrackIds = (track_uris: SpotifyTrackURIs) => {
  return track_uris.map((uri) => uri.replace("spotify:track:", ""));
};

export const getSpotifyTracks = async (track_uris: SpotifyTrackURIs) => {
  return await api.tracks.get(getSpotifyTrackIds(track_uris));
};
