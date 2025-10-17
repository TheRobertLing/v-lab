<script setup lang="ts">
import { Badge } from "@/shared/components/ui/badge";
import { Separator } from "@/shared/components/ui/separator";
import type { Video } from "../types";

const props = defineProps<{
  activeId: string;
  playlist: Video[];
}>();

const emit = defineEmits<{
  (e: "newVid", id: string): void;
}>();

function handleClick(id: string) {
  if (id !== props.activeId) {
    emit("newVid", id);
  }
}

function handleKeydown(event: KeyboardEvent, id: string) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    handleClick(id);
  }
}
</script>

<template>
  <div class="bg-card cursor-pointer space-y-4 rounded-lg border p-4">
    <h3 class="text-muted-foreground mb-4 text-center font-medium">
      a custom curated playlist of my favourite songs from mayday
    </h3>

    <Separator />

    <div role="list" aria-label="Video playlist" class="space-y-2">
      <div
        v-for="video in playlist"
        :key="video.id"
        role="button"
        tabindex="0"
        :aria-label="`Play ${video.title} by ${video.channelTitle}, duration ${video.duration}`"
        :aria-pressed="activeId === video.id"
        class="hover:bg-secondary flex h-25 items-center justify-between gap-2 rounded-xl p-2"
        :class="activeId === video.id ? 'bg-secondary' : ''"
        @click="handleClick(video.id)"
        @keydown="handleKeydown($event, video.id)"
      >
        <div class="relative h-full">
          <img
            :src="video.thumbnail"
            :alt="`Thumbnail for ${video.title}`"
            class="aspect-video h-full rounded-xl object-cover"
          />
          <Badge variant="secondary" class="absolute right-0.5 bottom-0.5 bg-black/80 font-medium">
            {{ video.duration }}
          </Badge>
        </div>

        <div class="flex h-full flex-1 flex-col justify-center gap-2 overflow-hidden">
          <span class="text-foreground line-clamp-2 text-lg leading-tight font-medium">
            {{ video.title }}
          </span>
          <span class="text-muted-foreground truncate text-sm">
            {{ video.channelTitle }}
          </span>
        </div>

        <div
          class="mx-2 flex size-4 items-end justify-center space-x-[3px]"
          v-if="activeId === video.id"
          aria-hidden="true"
        >
          <div class="bar animate-wave1" />
          <div class="bar animate-wave2" />
          <div class="bar animate-wave3" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bar {
  width: 3px;
  height: 100%;
  background-color: currentColor;
  transform-origin: bottom;
}

@keyframes wave {
  0%,
  100% {
    transform: scaleY(0.3);
  }
  50% {
    transform: scaleY(1);
  }
}

.animate-wave1 {
  animation: wave 0.9s ease-in-out infinite;
}
.animate-wave2 {
  animation: wave 0.9s ease-in-out 0.15s infinite;
}
.animate-wave3 {
  animation: wave 0.9s ease-in-out 0.3s infinite;
}
</style>
