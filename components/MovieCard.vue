<template>
  <el-card
    v-if="movie"
    :body-style="{
      display: 'flex',
      background: 'black',
      color: 'white',
    }"
  >
    <img
      v-if="movie.Poster"
      :src="movie.Poster"
      class="image h-[200px] w-[135px]"
      alt="movie"
    />
    <el-image v-else class="h-[200px] w-[135px]">
      <template #error>
        <div class="image-slot">
          <el-icon><icon-picture /></el-icon>
        </div>
      </template>
    </el-image>
    <div class="flex-col flex gap-1 ml-4 text-[16px]">
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
</template>

<script setup>
import { Picture as IconPicture } from "@element-plus/icons-vue";

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
