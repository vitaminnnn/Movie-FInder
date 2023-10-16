<template>
  <el-form
    ref="ruleFormRef"
    :model="form"
    :rules="rules"
    label-width="120px"
    label-position="top"
    status-icon
  >
    <div class="flex w-[100%] justify-center gap-6">
      <img
        v-if="form.image"
        :src="form.image"
        class="w-[142px] h-[186px] rounded-md"
      />
      <el-upload
        class="upload-demo w-[100%]"
        drag
        accept=".jpg, .jpeg, .png"
        action="http://localhost:3000"
        :show-file-list="false"
        :before-upload="beforeAvatarUpload"
        :on-success="handleAvatarSuccess"
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          Drop file here or <em>click to upload movie poster</em>
        </div>
      </el-upload>
    </div>
    <el-form-item label="Title" prop="title" class="mt-4">
      <el-input v-model="form.title" type="text" autocomplete="off" />
    </el-form-item>
    <el-form-item label="Director" prop="director">
      <el-input v-model="form.director" type="text" autocomplete="off" />
    </el-form-item>
    <el-form-item label="Year" prop="year">
      <div class="date-picker__wrapper w-full">
        <el-date-picker
          v-model="form.year"
          type="year"
          placeholder="Pick a year"
        />
      </div>
    </el-form-item>
    <el-button @click="addMovie(ruleFormRef)" type="success" class="mt-2 w-full"
      >Add Movie</el-button
    >
  </el-form>
</template>

<script setup>
import { ref } from "vue";
import { TYPE, VALIDATOR_MESSAGES } from "@/constants/index.js";
import { ElMessage } from "element-plus";
import { UploadFilled } from "@element-plus/icons-vue";
import { ElNotification } from "element-plus";
import { useMovieStore } from "@/store/movies.js";

const movieStore = useMovieStore();
const ruleFormRef = ref();
const form = reactive({
  title: "",
  year: null,
  director: "",
  image: "",
});
const rules = reactive({
  title: [
    { required: true, message: VALIDATOR_MESSAGES.required },
    { min: 3, max: 32, message: VALIDATOR_MESSAGES.length },
  ],
  year: [{ required: true, message: VALIDATOR_MESSAGES.required }],
  director: [
    { required: true, message: VALIDATOR_MESSAGES.required },
    { min: 3, max: 24, message: VALIDATOR_MESSAGES.length },
  ],
});

const beforeAvatarUpload = (rawFile) => {
  if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("Avatar picture size can not exceed 2MB!");
    return false;
  }
  return true;
};
const handleAvatarSuccess = (response, uploadFile) => {
  form.image = URL.createObjectURL(uploadFile.raw);
  openSuccessNotification({
    message: "This image has been uploaded!",
    type: TYPE.success,
  });
};

const openSuccessNotification = ({ title, message, type }) => {
  ElNotification({
    title,
    message,
    type,
  });
};

const resetForm = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
};

const submitForm = async (formEl) => {
  if (!formEl) return;

  await formEl.validate((valid) => {
    if (valid) {
      const year = new Date(form.year).getFullYear();
      const movieData = {
        imdbID: `${year}-${form.title}`,
        Title: form.title,
        Year: year,
        Director: form.director,
        Poster: form.image,
      };
      movieStore.setUploadedMovies(movieData);
      openSuccessNotification({
        message: "Your movie has been added!",
        type: TYPE.success,
      });
      resetForm(formEl);
    }
  });
};

const addMovie = (formEl) => {
  submitForm(formEl);
};
</script>

<style scoped>
.date-picker__wrapper :deep(.el-date-editor) {
  width: 100%;
}
</style>
