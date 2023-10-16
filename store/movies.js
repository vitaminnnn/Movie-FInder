import { defineStore } from "pinia";

export const useMovieStore = defineStore("movieStore", {
  state: () => ({
    currentMovie: null,
    uploadedMovies: [],
  }),
  getters: {
    getCurrentMovie() {
      return this.currentMovie;
    },
    getUploadedMovies() {
      return this.uploadedMovies;
    },
  },
  actions: {
    setCurrentMovie(movie) {
      this.currentMovie = movie;
    },
    setUploadedMovies(movie) {
      this.uploadedMovies.push(movie);
    },
  },
});
