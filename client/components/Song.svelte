<script lang="ts">
  import { fade } from "svelte/transition";

  export let song: any = {};
</script>

<li class="relative flex" transition:fade={{ delay: 250, duration: 300 }}>
  <div class="w-32 h-32">
    {#if song}
      <img class="w-full" src={song?.album?.images[0].url} alt="" />
    {/if}
  </div>
  <div class="flex flex-col p-4 text-gray-900">
    {#if song}
      <div class="text-3xl">{song?.name}</div>
      <div>{song?.artists?.[0]?.name}</div>
    {/if}
  </div>
</li>
