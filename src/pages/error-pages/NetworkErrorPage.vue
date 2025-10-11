<script setup lang="ts">
import { Home, WifiOff, WifiSync } from "lucide-vue-next";
</script>

<template>
  <main
    class="text-foreground flex h-screen flex-col items-center justify-center text-center font-mono"
  >
    <WifiOff class="mb-4 size-12" aria-hidden="true" />
    <h1 class="text-4xl font-semibold tracking-tight text-[#42b883]">
      network error
    </h1>
    <p class="text-muted-foreground mt-2 text-lg">
      connection lost or unavailable
    </p>
    <div class="mt-6 flex items-center gap-3">
      <RouterLink
        to="/"
        class="border-border text-muted-foreground hover:text-foreground hover:border-foreground/40 hover:bg-muted/10 flex items-center gap-2 rounded-md border px-4 py-2 transition-colors"
      >
        <Home class="size-5" aria-hidden="true" />
        <span>go to homepage</span>
      </RouterLink>

      <button
        class="border-border text-muted-foreground hover:text-foreground hover:border-foreground/40 hover:bg-muted/10 flex cursor-pointer items-center gap-2 rounded-md border px-4 py-2 transition-colors"
        @click="$router.go(0)"
      >
        <WifiSync class="size-5" aria-hidden="true" />
        <span>try again</span>
      </button>
    </div>
  </main>
</template>
