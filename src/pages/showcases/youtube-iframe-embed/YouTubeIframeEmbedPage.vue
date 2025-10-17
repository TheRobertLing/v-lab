<script setup lang="ts">
import Playlist from "./component/Playlist.vue";
import VideoPlayer from "./component/VideoPlayer.vue";
import { useYoutubePlayer } from "./composables/useYouTubePlayer";
import { playlist } from "./config";

const { activeId, handleReady, handleVideoChange } = useYoutubePlayer();
</script>

<template>
  <main class="mx-auto flex min-h-screen max-w-5xl min-w-80 flex-col space-y-4 p-4">
    <section class="relative aspect-video w-full border [&>*]:size-full [&>*]:flex-1">
      <VideoPlayer @ready="handleReady" />
    </section>
    <section class="flex-1">
      <Playlist @new-vid="handleVideoChange" :playlist="playlist" :active-id="activeId" />
    </section>
  </main>
</template>
