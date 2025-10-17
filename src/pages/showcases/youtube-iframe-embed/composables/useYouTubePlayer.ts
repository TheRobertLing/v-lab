import type { Player } from "@vue-youtube/core";
import { INITIAL_VIDEO_ID } from "../config";
import { onUnmounted, ref } from "vue";

export function useYoutubePlayer(initialVideoId: string = INITIAL_VIDEO_ID) {
  const playerInstance = ref<Player | null>(null);
  const activeId = ref<string>(initialVideoId);

  function handleReady(instance: Player) {
    playerInstance.value = instance;
  }

  function handleVideoChange(id: string) {
    if (!playerInstance.value) return;
    activeId.value = id;
    playerInstance.value.loadVideoById(id);
  }

  onUnmounted(() => {
    playerInstance.value?.destroy();
  });

  return {
    activeId,
    handleReady,
    handleVideoChange,
  };
}
