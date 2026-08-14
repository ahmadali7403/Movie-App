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

const BrowsePage = () => {
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
    <main className="min-h-screen overflow-x-hidden bg-netflix-black px-4 pb-12 pt-4 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Page heading */}
        <div className="mb-7 sm:mb-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Browse Movies
          </h1>

          <p className="mt-2 text-sm text-neutral-400 sm:text-base">
            Discover movies by genre, year and rating.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="rounded-2xl border border-neutral-800/80 bg-neutral-900/50 p-3 backdrop-blur-sm sm:p-4">
            <div className="mb-3 px-1 sm:mb-4">
              <h2 className="text-sm font-semibold text-white sm:text-base">
                Filters
              </h2>
            </div>

            {/* Mobile: horizontal scroll / Desktop: 3 columns */}
            <div className="flex gap-2 overflow-x-auto overscroll-x-contain pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-2 sm:gap-3 lg:grid-cols-3">
              {/* Genre */}
              <div className="group min-w-[145px] flex-1 sm:min-w-0">
                <label
                  htmlFor="genre"
                  className="mb-1.5 block px-1 text-xs font-medium text-neutral-500"
                >
                  Genre
                </label>

                <div className="relative">
                  <select
                    id="genre"
                    value={selectedGenre}
                    onChange={handleGenreChange}
                    className="w-full appearance-none rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-3 pr-9 text-sm font-medium text-white outline-none transition-all hover:border-neutral-600 focus:border-neutral-500 focus:ring-2 focus:ring-white/10"
                  >
                    {genres.map((genre) => (
                      <option key={genre.id} value={genre.id}>
                        {genre.name}
                      </option>
                    ))}
                  </select>

                  <svg
                    className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 1.06l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              {/* Year */}
              <div className="group min-w-[125px] flex-1 sm:min-w-0">
                <label
                  htmlFor="year"
                  className="mb-1.5 block px-1 text-xs font-medium text-neutral-500"
                >
                  Year
                </label>

                <div className="relative">
                  <select
                    id="year"
                    value={selectedYear}
                    onChange={(event) => setSelectedYear(event.target.value)}
                    className="w-full appearance-none rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-3 pr-9 text-sm font-medium text-white outline-none transition-all hover:border-neutral-600 focus:border-neutral-500 focus:ring-2 focus:ring-white/10"
                  >
                    <option value="">All Years</option>

                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>

                  <svg
                    className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 1.06l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              {/* Rating */}
              <div className="group min-w-[140px] flex-1 sm:min-w-0">
                <label
                  htmlFor="rating"
                  className="mb-1.5 block px-1 text-xs font-medium text-neutral-500"
                >
                  Rating
                </label>

                <div className="relative">
                  <select
                    id="rating"
                    value={minRating}
                    onChange={(event) => setMinRating(event.target.value)}
                    className="w-full appearance-none rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-3 pr-9 text-sm font-medium text-white outline-none transition-all hover:border-neutral-600 focus:border-neutral-500 focus:ring-2 focus:ring-white/10"
                  >
                    <option value="">Any Rating</option>
                    <option value="5">5+ ⭐</option>
                    <option value="6">6+ ⭐</option>
                    <option value="7">7+ ⭐</option>
                    <option value="8">8+ ⭐</option>
                    <option value="9">9+ ⭐</option>
                  </select>

                  <svg
                    className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25-4.5a.75.75 0 01-1.08 1.06l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
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
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
            {Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="min-w-0">
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
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
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

export default BrowsePage;
