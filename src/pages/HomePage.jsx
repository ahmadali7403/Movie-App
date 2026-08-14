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

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-netflix-black px-4 text-white">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">
            Failed to load movies
          </h1>

          <p className="mt-3 text-sm leading-6 text-neutral-400 sm:text-base">
            {error}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-netflix-black">
      {/* Hero */}
      {loading ? (
        <div className="h-[520px] w-full animate-pulse bg-neutral-900 sm:h-[560px] lg:h-[600px]" />
      ) : (
        <HeroBanner movies={trending} />
      )}

      {/* Movie Rows */}
      <div className="mx-auto w-full max-w-7xl px-4 py-7 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <div className="space-y-8 sm:space-y-10 lg:space-y-12">
          {/* Trending */}
          {loading ? (
            <section>
              <div className="mb-4 h-7 w-40 animate-pulse rounded bg-neutral-800 sm:w-48" />
              <SkeletonLoader count={6} />
            </section>
          ) : (
            <ContentRow title="Trending Movies" movies={trending} />
          )}

          {/* Top Rated */}
          {loading ? (
            <section>
              <div className="mb-4 h-7 w-36 animate-pulse rounded bg-neutral-800 sm:w-40" />
              <SkeletonLoader count={6} />
            </section>
          ) : (
            <ContentRow title="Top Rated" movies={topRated} />
          )}

          {/* Action */}
          {loading ? (
            <section>
              <div className="mb-4 h-7 w-28 animate-pulse rounded bg-neutral-800 sm:w-32" />
              <SkeletonLoader count={6} />
            </section>
          ) : (
            <ContentRow title="Action" movies={action} />
          )}

          {/* Comedy */}
          {loading ? (
            <section>
              <div className="mb-4 h-7 w-28 animate-pulse rounded bg-neutral-800 sm:w-32" />
              <SkeletonLoader count={6} />
            </section>
          ) : (
            <ContentRow title="Comedy" movies={comedy} />
          )}

          {/* Horror */}
          {loading ? (
            <section>
              <div className="mb-4 h-7 w-28 animate-pulse rounded bg-neutral-800 sm:w-32" />
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
