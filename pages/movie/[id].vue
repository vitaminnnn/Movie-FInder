<template>
  <client-only>
    <MovieCard :movie="getMovie" />
  </client-only>
</template>

<script setup>
import { useMovieStore } from "/store/movies.js";
import { computed } from "vue";

const movieStore = useMovieStore();

const getMovie = computed(() => {
  return movieStore.getCurrentMovie?.length
    ? movieStore.getCurrentMovie
    : JSON.parse(localStorage.movie);
});
</script>
