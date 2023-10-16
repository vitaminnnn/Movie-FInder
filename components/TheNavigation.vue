<template>
  <div class="flex items-center gap-4 sm:gap-10 p-4 bg-black text-white mb-5">
    <NuxtLink :class="isActiveHomePage" to="/">Home</NuxtLink>
    <NuxtLink :class="isActiveAddPage" to="/add">Add Movie</NuxtLink>
    <NuxtLink :class="isActiveUploadMovies" to="/uploaded"
      >Uploaded Movies</NuxtLink
    >
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();

const isActiveHomePage = computed(() => {
  return route.name === "index"
    ? "text-[12px] sm:text-[18px] underline underline-offset-4 hover:text-red-900 text-red-700"
    : "text-[12px] sm:text-[18px]  hover:text-red-900";
});

const isActiveAddPage = computed(() => {
  return route.name === "add"
    ? "text-[12px] sm:text-[18px]  underline underline-offset-4 hover:text-red-900 text-red-700"
    : "text-[12px] sm:text-[18px]  hover:text-red-900";
});

const isActiveUploadMovies = computed(() => {
  return route.name === "uploaded"
    ? "text-[12px] sm:text-[18px]  underline underline-offset-4 hover:text-red-900 text-red-700"
    : "text-[12px] sm:text-[18px]  hover:text-red-900";
});
</script>
