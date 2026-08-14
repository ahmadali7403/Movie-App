import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Play, Plus, Check } from "lucide-react";

import {
  getMovieDetails,
  getMovieCredits,
  getSimilarMovies,
} from "../services/tmdb";

import ContentRow from "../components/ContentRow";
import SkeletonLoader from "../components/SkeletonLoader";
import { useMyList } from "../context/MyListContext.jsx";

const TitleDetailPage = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { toggleMovie, isInList } = useMyList();

  useEffect(() => {
    const loadMovieData = async () => {
      try {
        setLoading(true);
        setError("");

        const [movieData, creditsData, similarData] = await Promise.all([
          getMovieDetails(id),
          getMovieCredits(id),
          getSimilarMovies(id),
        ]);

        setMovie(movieData);
        setCast(creditsData.cast || []);
        setSimilarMovies(similarData || []);
      } catch (error) {
        console.error("Failed to load movie details:", error);
        setError("Something went wrong while loading this movie.");
      } finally {
        setLoading(false);
      }
    };

    loadMovieData();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-netflix-black px-4 pb-12 pt-24 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="h-[520px] animate-pulse rounded-xl bg-neutral-900 sm:h-[500px]" />

          <div className="mt-10">
            <div className="mb-5 h-8 w-48 animate-pulse rounded bg-neutral-800" />
            <SkeletonLoader count={5} />
          </div>
        </div>
      </main>
    );
  }

  if (error || !movie) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-netflix-black px-4 pt-16 text-white">
        <div className="max-w-md text-center">
          <h1 className="text-xl font-bold sm:text-2xl">
            {error || "Movie not found"}
          </h1>

          <p className="mt-2 text-sm text-neutral-400 sm:text-base">
            Please try again later.
          </p>
        </div>
      </main>
    );
  }

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  const releaseYear = movie.release_date
    ? movie.release_date.slice(0, 4)
    : "N/A";

  const movieIsInList = isInList(movie.id);

  const handleToggleList = () => {
    toggleMovie(movie);
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-netflix-black text-white">
      {/* Hero / Movie information */}
      <section className="relative overflow-hidden">
        {/* Backdrop */}
        {backdropUrl ? (
          <img
            src={backdropUrl}
            alt={movie.title}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        ) : (
          <div className="absolute inset-0 bg-neutral-900" />
        )}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/65 sm:bg-black/60" />

        {/* Left gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/30" />

        {/* Mobile bottom gradient */}
        <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-netflix-black via-netflix-black/70 to-transparent" />

        {/* Movie content */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-12 pt-12 sm:px-6 sm:pb-16 sm:pt-12 lg:px-8 lg:pb-20">
          <div className="grid items-center gap-7 md:grid-cols-[220px_1fr] md:gap-8 lg:grid-cols-[280px_1fr] lg:gap-12">
            {/* Poster */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mx-auto w-40 overflow-hidden rounded-lg shadow-2xl sm:w-48 md:mx-0 md:w-full"
            >
              {posterUrl ? (
                <img
                  src={posterUrl}
                  alt={movie.title}
                  loading="lazy"
                  className="aspect-[2/3] w-full object-cover"
                />
              ) : (
                <div className="flex aspect-[2/3] items-center justify-center bg-neutral-800 text-sm text-neutral-500">
                  No Image
                </div>
              )}
            </motion.div>

            {/* Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="max-w-3xl"
            >
              {/* Title */}
              <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                {movie.title}
              </h1>

              {/* Metadata */}
              <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-neutral-300">
                <span>{releaseYear}</span>

                <span>•</span>

                <span>⭐ {movie.vote_average?.toFixed(1) || "N/A"}</span>

                {movie.runtime && (
                  <>
                    <span>•</span>
                    <span>{movie.runtime} min</span>
                  </>
                )}
              </div>

              {/* Genres */}
              {movie.genres?.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="rounded-full border border-neutral-600 bg-black/50 px-3 py-1 text-xs text-neutral-200 backdrop-blur-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Synopsis */}
              {movie.overview && (
                <p className="mt-5 max-w-2xl text-sm leading-6 text-neutral-300 sm:text-base sm:leading-7">
                  {movie.overview}
                </p>
              )}

              {/* Actions */}
              <div className="mt-7 flex flex-wrap gap-3">
                {/* Play */}
                <button
                  type="button"
                  className="flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-black transition-transform hover:scale-105 sm:text-base"
                >
                  <Play size={18} fill="currentColor" />
                  Play
                </button>

                {/* My List */}
                <button
                  type="button"
                  onClick={handleToggleList}
                  className="flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-md border border-neutral-500 bg-black/50 px-4 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-white sm:px-5 sm:text-base"
                >
                  {movieIsInList ? <Check size={18} /> : <Plus size={18} />}

                  {movieIsInList ? "In My List" : "Add to My List"}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Cast */}
      {cast.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <h2 className="mb-5 text-xl font-bold sm:text-2xl">Cast</h2>

          <div className="flex gap-3 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-4">
            {cast.slice(0, 12).map((person) => {
              const profileUrl = person.profile_path
                ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                : null;

              return (
                <div
                  key={person.cast_id || person.credit_id}
                  className="w-24 shrink-0 sm:w-32"
                >
                  <div className="aspect-[2/3] overflow-hidden rounded-md bg-neutral-900">
                    {profileUrl ? (
                      <img
                        src={profileUrl}
                        alt={person.name}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center px-2 text-center text-xs text-neutral-500">
                        No Image
                      </div>
                    )}
                  </div>

                  <h3 className="mt-2 line-clamp-1 text-sm font-semibold">
                    {person.name}
                  </h3>

                  <p className="mt-1 line-clamp-1 text-xs text-neutral-500">
                    {person.character || "Unknown role"}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Similar titles */}
      {similarMovies.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <ContentRow title="Similar Titles" movies={similarMovies} />
        </section>
      )}
    </main>
  );
};

export default TitleDetailPage;
