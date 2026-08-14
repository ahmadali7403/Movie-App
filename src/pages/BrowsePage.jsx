import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getMoviesByGenre } from "../services/tmdb";
import PosterCard from "../components/PosterCard";
import SkeletonLoader from "../components/SkeletonLoader";

const genres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 18, name: "Drama" },
  { id: 27, name: "Horror" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 53, name: "Thriller" },
];

const years = Array.from(
  { length: 30 },
  (_, index) => new Date().getFullYear() - index,
);

const Browse = () => {
  const { genreId } = useParams();
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedGenre, setSelectedGenre] = useState(
    genreId ? Number(genreId) : 28,
  );

  const [selectedYear, setSelectedYear] = useState("");
  const [minRating, setMinRating] = useState("");

  useEffect(() => {
    setSelectedGenre(genreId ? Number(genreId) : 28);
  }, [genreId]);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        setError("");

        const results = await getMoviesByGenre(
          selectedGenre,
          selectedYear,
          minRating,
        );

        setMovies(results);
      } catch (error) {
        console.error("Failed to load browse movies:", error);
        setError("Something went wrong while loading movies.");
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [selectedGenre, selectedYear, minRating]);

  const handleGenreChange = (event) => {
    const newGenreId = Number(event.target.value);

    setSelectedGenre(newGenreId);

    navigate(`/browse/${newGenreId}`);
  };

  return (
    <main className="min-h-screen bg-netflix-black px-4 py-8 pt-18 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Page heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold sm:text-4xl">Browse Movies</h1>

          <p className="mt-2 text-sm text-neutral-400">
            Discover movies by genre, year and rating.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Genre */}
          <div>
            <label
              htmlFor="genre"
              className="mb-2 block text-sm font-medium text-neutral-300"
            >
              Genre
            </label>

            <select
              id="genre"
              value={selectedGenre}
              onChange={handleGenreChange}
              className="w-full rounded-md border border-neutral-700 bg-neutral-900 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-white"
            >
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>

          {/* Year */}
          <div>
            <label
              htmlFor="year"
              className="mb-2 block text-sm font-medium text-neutral-300"
            >
              Year
            </label>

            <select
              id="year"
              value={selectedYear}
              onChange={(event) => setSelectedYear(event.target.value)}
              className="w-full rounded-md border border-neutral-700 bg-neutral-900 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-white"
            >
              <option value="">All Years</option>

              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Minimum rating */}
          <div>
            <label
              htmlFor="rating"
              className="mb-2 block text-sm font-medium text-neutral-300"
            >
              Minimum Rating
            </label>

            <select
              id="rating"
              value={minRating}
              onChange={(event) => setMinRating(event.target.value)}
              className="w-full rounded-md border border-neutral-700 bg-neutral-900 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-white"
            >
              <option value="">Any Rating</option>
              <option value="5">5+</option>
              <option value="6">6+</option>
              <option value="7">7+</option>
              <option value="8">8+</option>
              <option value="9">9+</option>
            </select>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="flex min-h-[300px] items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold">Failed to load movies</h2>

              <p className="mt-2 text-neutral-400">{error}</p>
            </div>
          </div>
        )}

        {/* Loading */}
        {!error && loading && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {Array.from({ length: 10 }).map((_, index) => (
              <div key={index}>
                <SkeletonLoader count={1} />
              </div>
            ))}
          </div>
        )}

        {/* No results */}
        {!error && !loading && movies.length === 0 && (
          <div className="flex min-h-[300px] items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold">No movies found</h2>

              <p className="mt-2 text-neutral-400">
                Try changing your filters.
              </p>
            </div>
          </div>
        )}

        {/* Movie grid */}
        {!error && !loading && movies.length > 0 && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {movies.map((movie) => (
              <div key={movie.id} className="min-w-0">
                <PosterCard movie={movie} />
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Browse;
