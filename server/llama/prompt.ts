export const format = `Format the response as JSON where the "data" field is an array of objects.
Include the full timestamp, track name, artist, duration in ms, and the spotify track ID.

Example format:

{
    "data": [
        {
            "timestamp": "2023-10-01T12:00:00Z",
            "track": "Track Name",
            "artist": "Artist Name",
            "duration": 1000,
            "spotify_track_id": "spotify:track:abc123"
        }
    ]
}
`;

export const format_2 = `If the response consists of multiple objects, separate them with a "---".
Include the full timestamp, track name, artist, duration in ms, and the spotify track ID.

Example format:

timestamp: 2023-10-01T12:00:00Z
track: Track Name
artist: Artist Name
duration: 1000
spotify_track_id: spotify:track:abc123

---

timestamp: 2023-10-01T12:00:00Z
track: Track Name
artist: Artist Name
duration: 1000
spotify_track_id: spotify:track:abc123
`;

export const format_3 = `Only returns the track id. Separate multiple track ids with a comma.

Example format:
spotify:track:abc123,spotify:track:abc123
`;
