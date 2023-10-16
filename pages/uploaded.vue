<template>
  <el-carousel
    v-if="moviesStore.getUploadedMovies.length"
    height="500px"
    direction="vertical"
    type="card"
    class="mt-4"
    :autoplay="false"
  >
    <el-carousel-item
      v-for="movie of moviesStore.getUploadedMovies"
      :key="movie.id"
    >
      <NuxtLink :to="`movie/${movie.imdbID}`" @click="setMovieData(movie)">
        <MovieCard :movie="movie" />
      </NuxtLink>
    </el-carousel-item>
  </el-carousel>
  <el-empty v-else>
    <el-button type="success" @click="goToAddMoviePage">Add Movie</el-button>
  </el-empty>
</template>

<script setup>
import MovieCard from "@/components/MovieCard.vue";
import { useMovieStore } from "@/store/movies";
import { useRouter } from "vue-router";

const moviesStore = useMovieStore();
const router = useRouter();

const goToAddMoviePage = () => {
  router.push({ path: "/add" });
};

const setMovieData = (movie) => {
  localStorage.setItem("movie", JSON.stringify(movie));
  moviesStore.setCurrentMovie(movie);
};
</script>
