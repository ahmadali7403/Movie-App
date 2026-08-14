import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Play, Info } from "lucide-react";

const HeroBanner = ({ movies = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const heroMovies = movies.filter((movie) => movie?.backdrop_path).slice(0, 8);

  useEffect(() => {
    if (heroMovies.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex(
        (previousIndex) => (previousIndex + 1) % heroMovies.length,
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [heroMovies.length]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [movies]);

  const movie = heroMovies[currentIndex];

  if (!movie) {
    return (
      <section className="relative h-[520px] w-full overflow-hidden bg-neutral-900 sm:h-[580px] lg:h-[620px]">
        <div className="absolute inset-0 animate-pulse bg-neutral-800" />
      </section>
    );
  }

  const backdropUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

  const title = movie.title || movie.name || "Untitled";

  const releaseYear = movie.release_date
    ? movie.release_date.slice(0, 4)
    : movie.first_air_date
      ? movie.first_air_date.slice(0, 4)
      : null;

  return (
    <section className="relative h-[520px] w-full overflow-hidden sm:h-[580px] lg:h-[620px]">
      {/* Backdrop */}
      <motion.img
        key={movie.id}
        src={backdropUrl}
        alt={title}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 sm:bg-black/30" />

      {/* Left gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

      {/* Bottom gradient */}
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-netflix-black to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-end">
        <div className="mx-auto w-full max-w-7xl -translate-y-12 px-4 sm:-translate-y-14 sm:px-6 lg:-translate-y-16 lg:px-8">
          <div className="max-w-xl md:max-w-2xl">
            {/* Title */}
            <motion.h1
              key={`title-${movie.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-heading text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
            >
              {title}
            </motion.h1>

            {/* Metadata */}
            <motion.div
              key={`meta-${movie.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mt-3 flex flex-wrap items-center gap-2 text-sm text-neutral-300 sm:mt-4 sm:gap-3"
            >
              {releaseYear && <span>{releaseYear}</span>}

              {movie.vote_average > 0 && (
                <>
                  <span>•</span>

                  <span className="text-white">
                    ⭐ {movie.vote_average.toFixed(1)}
                  </span>
                </>
              )}
            </motion.div>

            {/* Overview */}
            {movie.overview && (
              <motion.p
                key={`overview-${movie.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-3 line-clamp-3 max-w-xl text-sm leading-6 text-neutral-200 sm:mt-4 sm:text-base sm:leading-7 md:line-clamp-4"
              >
                {movie.overview}
              </motion.p>
            )}

            {/* Actions */}
            <div className="mt-5 flex flex-wrap items-center gap-2 sm:mt-6 sm:gap-3">
              <button
                type="button"
                className="flex min-h-11 cursor-pointer items-center gap-2 rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-black transition-transform hover:scale-105 sm:px-5 sm:py-3 sm:text-base"
              >
                <Play size={18} fill="currentColor" />
                Play
              </button>

              <button
                type="button"
                className="flex min-h-11 cursor-pointer items-center gap-2 rounded-md bg-neutral-700/80 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-neutral-600 sm:px-5 sm:py-3 sm:text-base"
              >
                <Info size={18} />
                More Info
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero indicators */}
      {heroMovies.length > 1 && (
        <div className="absolute bottom-5 right-4 z-20 flex max-w-[40%] items-center gap-1.5 overflow-hidden sm:bottom-8 sm:right-6 sm:gap-2">
          {heroMovies.map((heroMovie, index) => (
            <span
              key={heroMovie.id}
              className={`h-1.5 shrink-0 rounded-full transition-all duration-1000 ease-in-out ${
                index === currentIndex
                  ? "w-5 bg-white sm:w-6"
                  : "w-1.5 bg-white/40"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default HeroBanner;
