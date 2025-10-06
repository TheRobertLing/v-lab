<script setup lang="ts">
import { useDark } from "@/composables";
import { ArrowDown, ArrowUpRight } from "lucide-vue-next";
import slug from "slug";
const { theme, toggleDark } = useDark();

const registry = [
  { name: "Reddit Navbar" },
  { name: "Reddit Navbar 2" },
  { name: "YouTube Player" },
  { name: "Spotify Widget" },
  { name: "Twitter Feed" },
  { name: "GitHub Card" },
  { name: "Weather Dashboard" },
  { name: "Google Search Bar" },
  { name: "Netflix Carousel" },
  { name: "Amazon Product Card" },
  { name: "Amazon Product Card 1" },
  { name: "Amazon Product Card 2" },
  { name: "Amazon Product Card 3" },
  { name: "Amazon Product Card 4" },
  { name: "Amazon Product Card 5" },
  { name: "Amazon Product Card 6" },
  { name: "Amazon Product Card 7" },
  { name: "Amazon Product Card 8" },
  { name: "Amazon Product Card 9" },
  { name: "Amazon Product Card 10" },
].map((item) => ({ ...item, slug: slug(item.name) }));
</script>

<template>
  <section
    role="banner"
    class="h-screen bg-background relative flex flex-col items-center justify-center text-center font-mono text-foreground"
  >
    <header>
      <h1 class="text-3xl font-semibold tracking-tight">
        <span class="text-[#42b883]">V</span>-Lab
      </h1>
      <p class="mt-4 text-muted-foreground">
        a showcase of various ui components recreated in vue.js
      </p>
    </header>

    <nav
      aria-label="External links"
      class="flex gap-2 flex-wrap justify-center text-sm font-medium text-muted-foreground mt-4"
    >
      <a
        href="https://github.com"
        target="_blank"
        rel="noopener noreferrer"
        class="hover:text-foreground transition-colors p-1"
      >
        r-studio.
      </a>
      <a
        href="https://github.com"
        target="_blank"
        rel="noopener noreferrer"
        class="hover:text-foreground transition-colors p-1"
      >
        github.
      </a>
      <button
        type="button"
        aria-label="Toggle dark mode"
        class="cursor-pointer hover:text-foreground transition-colors p-1 w-14 text-left"
        @click="toggleDark"
      >
        {{ theme }}.
      </button>
    </nav>

    <a
      href="#showcase"
      aria-label="Scroll to showcase section"
      class="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer text-muted-foreground hover:text-foreground transition-colors size-12"
    >
      <ArrowDown
        aria-hidden="true"
        class="size-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-bounce"
      />
    </a>
  </section>

  <!-- Showcase Section -->
  <section
    id="showcase"
    aria-labelledby="showcase-title"
    class="min-h-screen font-mono text-foreground max-w-7xl mx-auto pt-32 flex flex-col items-center"
  >
    <header class="text-center mb-16">
      <h2
        id="showcase-title"
        class="text-3xl font-semibold tracking-tight text-muted-foreground"
      >
        Showcase
      </h2>
      <p class="mt-4 text-sm text-muted-foreground/80 max-w-3xl">
        i would write a meaningful description but i severely lack creativity.
        below are all of my recreations thus far. that's about it. hope you
        enjoy.
      </p>
    </header>

    <main
      class="flex flex-wrap justify-center gap-6 mb-12"
      aria-label="Showcase components list"
    >
      <article
        v-for="item in registry"
        :key="item.slug"
        :aria-label="`Demo card for ${item.name}`"
        class="w-64 h-42 rounded-lg border border-border/60 bg-muted/10 flex items-center justify-center text-muted-foreground hover:bg-muted/20 transition-colors"
      >
        {{ item.name }}
      </article>
    </main>

    <footer class="text-center text-sm text-muted-foreground mb-12">
      also consider checking out the React version at

      <a href="https://github.com/r-studio" class="hover:text-foreground">
        r-studio<ArrowUpRight class="inline-block size-3 align-top" /></a
      >.
    </footer>
  </section>
</template>
