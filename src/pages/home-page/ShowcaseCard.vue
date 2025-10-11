<script setup lang="ts">
import type { ShowcaseItem } from "@/routes";

defineProps<ShowcaseItem>();
</script>

<template>
  <RouterLink
    :to="path"
    class="group flex w-72 cursor-pointer flex-col items-center rounded-lg text-center transition-shadow"
    :aria-label="`Demo card for ${name}`"
  >
    <div
      class="bg-muted/10 relative aspect-video w-full overflow-hidden rounded-lg border"
    >
      <img
        :src="previewImgPath"
        :alt="name"
        class="h-full w-full object-cover brightness-90 transition-transform duration-300 group-hover:scale-105"
      />
      <div class="absolute inset-0 bg-black/10"></div>
    </div>

    <h3
      class="text-muted-foreground mt-3 font-medium transition-colors group-hover:text-[#42b883]"
    >
      {{ name }}
    </h3>
  </RouterLink>
</template>
