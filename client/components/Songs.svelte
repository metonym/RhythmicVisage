<script lang="ts">
  import Song from "./Song.svelte";

  export let results: string[] = [];

  let songs: string[] = [];
  let songsById: Record<string, any> = {};

  const fetchSong = async (track_uri: string) => {
    const response = await fetch("/api/spotify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ track_uris: [track_uri] }),
    });
    const data = await response.json();

    if (data) {
      songs.push(data.data);
      songsById[track_uri] = data.data;
    }
  };

  $: if (results.length > 0) {
    const new_result = results[results.length - 1];

    if (new_result) {
      if (!songsById[new_result]) {
        songs = [...songs, new_result];
        fetchSong(new_result);
      }
    }
  }
</script>

<ol class="space-y-4">
  {#each results as item}
    {@const song = songsById[item]}
    {#if song}
      <Song song={song[0]} />
    {/if}
  {/each}
</ol>
