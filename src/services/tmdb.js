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

// Movies with genre, year and minimum rating filters
export const getMoviesByGenre = async (genreId, year = "", minRating = "") => {
  const response = await tmdb.get("/discover/movie", {
    params: {
      with_genres: genreId,
      ...(year && { primary_release_year: year }),
      ...(minRating && { "vote_average.gte": minRating }),
    },
  });

  return response.data.results;
};

// Single movie details
export const getMovieDetails = async (id) => {
  const response = await tmdb.get(`/movie/${id}`);

  return response.data;
};

// Movie cast and crew
export const getMovieCredits = async (id) => {
  const response = await tmdb.get(`/movie/${id}/credits`);

  return response.data;
};

// Similar movies
export const getSimilarMovies = async (id) => {
  const response = await tmdb.get(`/movie/${id}/similar`);

  return response.data.results;
};

export default tmdb;
