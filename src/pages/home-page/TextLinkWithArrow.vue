<script setup lang="ts">
import { ArrowUpRight } from "lucide-vue-next";

defineProps<{
  href: string;
  text: string;
}>();
</script>

<template>
  <a :href="href" v-bind="$attrs">
    {{ text }}<ArrowUpRight class="inline-block size-3 align-top" />
  </a>
</template>
