import { defineStore } from "pinia";
const url = "http://www.omdbapi.com/?apikey=bab1d173&type=movie";

export const useSearchStore = defineStore("searchStore", {
  state: () => ({
    isLoading: false,
    movies: [],
  }),
  actions: {
    async fetchMovies(search) {
      try {
        this.isLoading = true;
        const response = await fetch(`${url}&s=${search}`);
        const body = await response.json();
        const isSuccess = body.Response.toLowerCase() === "true";
        this.movies = isSuccess ? body.Search : [];
      } catch (e) {
        console.log(e);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
