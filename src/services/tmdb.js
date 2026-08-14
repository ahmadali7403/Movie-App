import axios from "axios";

const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
  },
});

// Trending movies
export const getTrendingMovies = async () => {
  const response = await tmdb.get("/trending/movie/week");

  return response.data.results;
};

// Top rated movies
export const getTopRatedMovies = async () => {
  const response = await tmdb.get("/movie/top_rated");

  return response.data.results;
};

// Movies by genre
export const getMoviesByGenre = async (genreId) => {
  const response = await tmdb.get("/discover/movie", {
    params: {
      with_genres: genreId,
    },
  });

  return response.data.results;
};

export default tmdb;
