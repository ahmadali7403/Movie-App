import { useEffect, useState } from "react";
import { Search as SearchIcon } from "lucide-react";

import { searchMovies } from "../services/tmdb";
import useDebounce from "../hooks/useDebounce";

import PosterCard from "../components/PosterCard";
import SkeletonLoader from "../components/SkeletonLoader";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    const search = async () => {
      if (!debouncedQuery.trim()) {
        setMovies([]);
        setLoading(false);
        setError("");
        return;
      }

      try {
        setLoading(true);
        setError("");

        const results = await searchMovies(debouncedQuery.trim());

        setMovies(results);
      } catch (error) {
        console.error("Search failed:", error);
        setError("Something went wrong while searching.");
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    search();
  }, [debouncedQuery]);

  return (
    <main className="min-h-screen bg-netflix-black px-4 py-8 mt-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Search input */}
        <div className="relative mx-auto max-w-2xl">
          <SearchIcon
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"
          />

          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies..."
            className="w-full rounded-lg border border-neutral-700 bg-neutral-900 py-3 pl-12 pr-4 text-white outline-none placeholder:text-neutral-500 focus:border-neutral-500"
          />
        </div>

        {/* Empty state */}
        {!query.trim() && !loading && (
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="text-center">
              <SearchIcon size={48} className="mx-auto text-neutral-700" />

              <h1 className="mt-4 text-xl font-semibold">Search for a movie</h1>

              <p className="mt-2 text-sm text-neutral-500">
                Start typing to discover movies.
              </p>
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="mt-8">
            <SkeletonLoader count={6} />
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="flex min-h-[300px] items-center justify-center">
            <div className="text-center">
              <h2 className="text-xl font-semibold">Search failed</h2>

              <p className="mt-2 text-neutral-500">{error}</p>
            </div>
          </div>
        )}

        {/* No results */}
        {!loading && !error && debouncedQuery.trim() && movies.length === 0 && (
          <div className="flex min-h-[300px] items-center justify-center">
            <div className="text-center">
              <h2 className="text-xl font-semibold">No movies found</h2>

              <p className="mt-2 text-neutral-500">
                Try searching for another movie.
              </p>
            </div>
          </div>
        )}

        {/* Results */}
        {!loading && !error && movies.length > 0 && (
          <section className="mt-8">
            <h1 className="mb-5 text-2xl font-bold">
              Search results for "{debouncedQuery}"
            </h1>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {movies.map((movie) => (
                <div key={movie.id} className="min-w-0">
                  <PosterCard movie={movie} />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default SearchPage;
