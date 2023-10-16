<template>
  <el-input
    v-model="searchMovie"
    class="w-50 mt-2 h-10"
    placeholder="Search movie"
    :prefix-icon="Search"
  />
  <Loader v-if="searchStore.isLoading" class="mt-10" />
  <el-empty v-else-if="isShowPlaceholder" description="Movies not found!">
  </el-empty>
  <el-carousel
    v-else
    height="500px"
    direction="vertical"
    type="card"
    class="mt-4"
    :autoplay="false"
  >
    <el-carousel-item v-for="movie of searchStore.movies" :key="movie.id">
      <NuxtLink :to="`movie/${movie.imdbID}`" @click="setMovieData(movie)">
        <MovieCard :movie="movie" />
      </NuxtLink>
    </el-carousel-item>
  </el-carousel>
</template>

<script setup>
import { ref } from "vue";
import { computed } from "vue";
import Loader from "@/components/TheLoader.vue";
import MovieCard from "@/components/MovieCard.vue";
import { Search } from "@element-plus/icons-vue";
import { useSearchStore } from "@/store/search";
import { useMovieStore } from "~/store/movies.js";
import debounce from "@/utils/debounce.js";

const searchMovie = ref("");
const searchStore = useSearchStore();
const moviesStore = useMovieStore();

const isShowPlaceholder = computed(() => {
  return !searchStore.movies.length && searchMovie.value;
});

watch(
  searchMovie,
  debounce(() => {
    searchStore.fetchMovies(searchMovie.value);
  }, 300),
);

const setMovieData = (movie) => {
  localStorage.setItem("movie", JSON.stringify(movie));
  moviesStore.setCurrentMovie(movie);
};
</script>
