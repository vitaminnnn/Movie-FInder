<template>
  <div>
    <Search />
  </div>
</template>

<script setup>
import Search from "../components/Search.vue";
import { useMovieStore } from "../store/movies.js";

const movieStore = useMovieStore();
</script>
