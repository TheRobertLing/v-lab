<script setup lang="ts">
import type { ShowcaseItem } from "@/routes";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";

defineProps<ShowcaseItem>();
</script>

<template>
  <RouterLink
    :to="path"
    class="group flex w-72 cursor-pointer flex-col items-center text-center transition-shadow"
    :aria-label="`Showcase item for ${name}`"
  >
    <Card class="bg-background w-full gap-3 py-0">
      <CardContent class="px-0"
        ><div class="bg-muted/10 relative aspect-video w-full overflow-hidden rounded-t-lg border-b">
          <img
            :src="previewImgPath"
            :alt="name"
            class="size-full rounded-t-xl object-contain brightness-90 transition-transform group-hover:scale-105"
          />
          <div class="absolute inset-0 bg-black/10"></div>
        </div>
      </CardContent>
      <CardHeader class="text-muted-foreground px-0 transition-colors group-hover:text-[#42b883]">
        <CardTitle>{{ name }}</CardTitle>
      </CardHeader>
    </Card>
  </RouterLink>
</template>
