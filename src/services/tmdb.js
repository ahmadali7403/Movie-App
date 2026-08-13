import axios from "axios";

const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
  },
});

export const getTrendingMovies = async () => {
  const response = await tmdb.get("/trending/movie/week");

  return response.data.results;
};

export default tmdb;
