<script lang="ts">
  import debounce from "lodash.debounce";
  import { onMount } from "svelte";
  import Songs from "./Songs.svelte";

  let text: string = "My top 10 tracks of 2023";
  let results: string[] = [];

  const handleStream = async () => {
    const url = `/api/stream?query=${encodeURIComponent(text)}`;

    await fetch(url);
    const events = new EventSource(url);

    let result = "";

    events.onmessage = (event: MessageEvent) => {
      const parsedData = JSON.parse(event.data);

      if (parsedData.data === ",") {
        results = [...results, result];
        result = "";
      } else {
        result += parsedData.data;
      }

      if (parsedData.status === "done") {
        events.close();
      }
    };
  };

  const handleQuery = async () => {
    if (text.trim().length === 0) return;
    handleStream();
  };

  const handleInput = debounce(handleQuery, 800);

  onMount(() => {
    handleQuery();
  });
</script>

<div class="bg-indigo-950 relative h-screen w-full">
  <div class="relative flex w-full h-full">
    <div class="p-10 absolute top-0 left-0 w-[38%] h-full">
      <div
        data-gramm="false"
        bind:textContent={text}
        on:input={handleInput}
        spellcheck="false"
        contenteditable="plaintext-only"
        class="h-full text-white font-sans text-8xl leading-[90px] focus:outline-none"
      />
    </div>
    <div
      class="p-10 absolute top-0 left-[38%] w-[62%] h-full text-white bg-indigo-300 overflow-y-auto"
    >
      <Songs {results} />
    </div>
  </div>
</div>
