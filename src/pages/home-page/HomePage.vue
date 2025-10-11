<script setup lang="ts">
import { ArrowDown } from "lucide-vue-next";
import { useDark } from "@/composables";
import { getShowcaseList } from "@/routes";
import TextLinkWithArrow from "./TextLinkWithArrow.vue";
import ShowcaseCard from "./ShowcaseCard.vue";

const { theme, toggleDark } = useDark();
</script>

<template>
  <main>
    <section
      role="banner"
      class="relative flex h-screen flex-col items-center justify-center text-center"
    >
      <header>
        <h1 class="text-3xl font-semibold">
          <span class="text-[#42b883]">V</span>-Lab
        </h1>
        <p class="text-muted-foreground mt-4">
          a showcase of interactive experiments built with vue.js
        </p>
      </header>

      <nav
        aria-label="External links"
        class="text-muted-foreground mt-4 flex flex-wrap justify-center gap-2 text-sm font-medium"
      >
        <TextLinkWithArrow
          href="https://github.com"
          text="r-studio"
          target="_blank"
          rel="noopener noreferrer"
          class="hover:text-foreground p-1 transition-colors"
        />
        <TextLinkWithArrow
          href="https://github.com"
          text="github"
          target="_blank"
          rel="noopener noreferrer"
          class="hover:text-foreground p-1 transition-colors"
        />
        <button
          type="button"
          aria-label="Toggle dark mode"
          class="hover:text-foreground w-14 cursor-pointer p-1 text-left transition-colors"
          @click="toggleDark"
        >
          {{ theme }}.
        </button>
      </nav>

      <a
        href="#showcase"
        aria-label="Scroll to showcase section"
        class="text-muted-foreground hover:text-foreground absolute bottom-10 left-1/2 size-12 -translate-x-1/2 cursor-pointer transition-colors"
      >
        <ArrowDown
          aria-hidden="true"
          class="absolute top-1/2 left-1/2 size-6 -translate-x-1/2 -translate-y-1/2 animate-bounce"
        />
      </a>
    </section>

    <section
      id="showcase"
      aria-labelledby="showcase-title"
      class="mx-auto flex min-h-screen max-w-7xl flex-col items-center pt-8"
    >
      <header class="mb-8 text-center">
        <h2 id="showcase-title" class="text-3xl font-semibold">Showcase</h2>
        <p class="text-muted-foreground mt-4 max-w-3xl">
          also consider checking out the React version at
          <TextLinkWithArrow
            href="'https://github.com/r-studio'"
            text="r-studio"
            class="hover:text-foreground p-1 transition-colors"
          />
        </p>
      </header>

      <div
        class="mb-24 flex max-w-5xl flex-wrap justify-center gap-8"
        aria-label="Showcase components list"
      >
        <ShowcaseCard
          v-for="(item, index) in getShowcaseList()"
          :key="index"
          v-bind="item"
        />
      </div>
    </section>
  </main>
</template>
