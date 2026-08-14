import { useEffect, useState } from "react";
import {
  getTrendingMovies,
  getTopRatedMovies,
  getMoviesByGenre,
} from "../services/tmdb";

import HeroBanner from "../components/HeroBanner";
import ContentRow from "../components/ContentRow";
import SkeletonLoader from "../components/SkeletonLoader";

const HomePage = () => {
  const [trending, setTrending] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [action, setAction] = useState([]);
  const [comedy, setComedy] = useState([]);
  const [horror, setHorror] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        setLoading(true);
        setError("");

        const [
          trendingMovies,
          topRatedMovies,
          actionMovies,
          comedyMovies,
          horrorMovies,
        ] = await Promise.all([
          getTrendingMovies(),
          getTopRatedMovies(),
          getMoviesByGenre(28),
          getMoviesByGenre(35),
          getMoviesByGenre(27),
        ]);

        setTrending(trendingMovies);
        setTopRated(topRatedMovies);
        setAction(actionMovies);
        setComedy(comedyMovies);
        setHorror(horrorMovies);
      } catch (error) {
        console.error("Failed to load home data:", error);
        setError("Something went wrong while loading movies.");
      } finally {
        setLoading(false);
      }
    };

    loadHomeData();
  }, []);

  // Error state
  if (error) {
    return (
      <main className="min-h-screen bg-netflix-black px-4 py-24 text-white sm:px-6 lg:px-8">
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Failed to load Movie</h1>

            <p className="mt-2 text-neutral-400">{error}</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-netflix-black">
      {/* Hero */}
      {loading ? (
        <div className="h-[560px] w-full animate-pulse bg-neutral-900 sm:h-[600px]" />
      ) : (
        <HeroBanner movies={trending} />
      )}

      {/* Movie rows */}
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Trending */}
          {loading ? (
            <section>
              <div className="mb-4 h-7 w-48 animate-pulse rounded bg-neutral-800" />
              <SkeletonLoader count={6} />
            </section>
          ) : (
            <ContentRow title="Trending Movies" movies={trending} />
          )}

          {/* Top Rated */}
          {loading ? (
            <section>
              <div className="mb-4 h-7 w-40 animate-pulse rounded bg-neutral-800" />
              <SkeletonLoader count={6} />
            </section>
          ) : (
            <ContentRow title="Top Rated" movies={topRated} />
          )}

          {/* Action */}
          {loading ? (
            <section>
              <div className="mb-4 h-7 w-32 animate-pulse rounded bg-neutral-800" />
              <SkeletonLoader count={6} />
            </section>
          ) : (
            <ContentRow title="Action" movies={action} />
          )}

          {/* Comedy */}
          {loading ? (
            <section>
              <div className="mb-4 h-7 w-32 animate-pulse rounded bg-neutral-800" />
              <SkeletonLoader count={6} />
            </section>
          ) : (
            <ContentRow title="Comedy" movies={comedy} />
          )}

          {/* Horror */}
          {loading ? (
            <section>
              <div className="mb-4 h-7 w-32 animate-pulse rounded bg-neutral-800" />
              <SkeletonLoader count={6} />
            </section>
          ) : (
            <ContentRow title="Horror" movies={horror} />
          )}
        </div>
      </div>
    </main>
  );
};

export default HomePage;
