declare module "types" {
  /** YYYY-MM-DD */
  export type DateString = string;

  /** HH:MM:SS */
  export type TimeString = string;

  /**
   * The timestamp format is ISO 8601 (Coordinated Universal Time (UTC).
   * @example "YYYY-MM-DDTHH:MM:SSZ"
   */
  export type SpotifyTrackTimestamp = `${DateString}T${TimeString}Z`;

  /**
   * The part after "spotify:track:" is the Spotify track ID.
   * The ID can be used to look up the track on Spotify using the Web API.
   * @example "spotify:track:2xuaei9Z74TRFnUXDxRXPl",
   */
  export type SpotifyTrackURI = `spotify:track:${string}`;

  export type SpotifyTrack = {
    ts: SpotifyTrackTimestamp;
    username: string;
    platform: string;
    ms_played: number;
    conn_country: string;
    ip_addr_decrypted: string;
    user_agent_decrypted: null | string;
    master_metadata_track_name: string;
    master_metadata_album_artist_name: string;
    master_metadata_album_album_name: string;
    spotify_track_uri: SpotifyTrackURI;
    episode_name: null | string;
    episode_show_name: null | string;
    spotify_episode_uri: null | string;
    reason_start: string;
    reason_end: string;
    shuffle: boolean;
    skipped: boolean;
    offline: boolean;
    offline_timestamp: number;
    incognito_mode: boolean;
  };
}
