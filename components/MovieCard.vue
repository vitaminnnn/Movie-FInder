<template>
  <NuxtLink
    :to="`movie/${movie.imdbID}`"
    @click="movieStore.setCurrentMovie(movie)"
  >
    <el-card
      :body-style="{ display: 'flex', background: 'black', color: 'white' }"
    >
      <img
        v-if="movie.Poster"
        :src="movie.Poster"
        class="image h-[450px] w-[300px]"
        alt="movie"
      />
      <el-image v-else class="h-[450px] w-[300px]">
        <template #error>
          <div class="image-slot">
            <el-icon><icon-picture /></el-icon>
          </div>
        </template>
      </el-image>
      <div class="flex-col flex gap-1 ml-8 text-[18px]">
        <div>
          <label class="font-bold">Title:</label>
          <span class="ml-2">{{ movie.Title }}</span>
        </div>
        <div v-if="movie.Director">
          <label class="font-bold">Director:</label>
          <span class="ml-2">{{ movie.Director }} </span>
        </div>
        <div>
          <label class="font-bold">Year:</label>
          <span class="ml-2">{{ movie.Year }}</span>
        </div>
      </div>
    </el-card>
  </NuxtLink>
</template>

<script setup>
import { useMovieStore } from "~/store/movies.js";
import { Picture as IconPicture } from "@element-plus/icons-vue";

const movieStore = useMovieStore();

defineProps({
  movie: {
    type: Object,
    required: true,
    default: () => {},
  },
});
</script>

<style scoped>
.el-image {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: dimgrey;
}
.image-slot :deep(.el-icon) {
  width: 125px;
  height: 125px;
  svg {
    width: 125px;
    height: 125px;
  }
}
</style>
