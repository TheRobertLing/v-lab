<script setup lang="ts">
import { Spinner } from "@/shared/components/ui/spinner";
import { usePlayer, type Player } from "@vue-youtube/core";
import { ref, useTemplateRef } from "vue";

const emit = defineEmits<{
  (e: "ready", instance: Player): void;
}>();

const state = ref<"loading" | "ready" | "error">("loading");

const playerRef = useTemplateRef("player");
const { instance, onReady, onError } = usePlayer("_XYcCNY-ass", playerRef);

onReady(() => {
  state.value = "ready";
  emit("ready", instance.value!);
});

onError(() => {
  state.value = "error";
});
</script>

<template>
  <div v-if="state === 'loading'" class="absolute flex items-center justify-center">
    <Spinner class="size-8" />
  </div>

  <div v-if="state === 'error'" class="bg-background absolute flex items-center justify-center">
    oops an error has occured
  </div>

  <div ref="player" />
</template>
