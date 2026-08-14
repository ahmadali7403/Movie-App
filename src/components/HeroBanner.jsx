import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Play, Info } from "lucide-react";

const HeroBanner = ({ movies = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Sirf un movies ko Hero ke liye use karein
  // jin ke paas backdrop image available hai.
  const heroMovies = movies.filter((movie) => movie?.backdrop_path).slice(0, 8);

  // Har 7 seconds baad next movie
  useEffect(() => {
    if (heroMovies.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex(
        (previousIndex) => (previousIndex + 1) % heroMovies.length,
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [heroMovies.length]);

  // Jab trending movies ka data dobara aaye
  // to Hero first movie se start ho.
  useEffect(() => {
    setCurrentIndex(0);
  }, [movies]);

  const movie = heroMovies[currentIndex];

  // Jab API se Hero data abhi nahi aaya
  if (!movie) {
    return (
      <section className="relative h-[560px] w-full overflow-hidden bg-neutral-900 sm:h-[600px]">
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
    <section className="relative h-[560px] w-full overflow-hidden sm:h-[600px]">
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
      <div className="absolute inset-0 bg-black/30" />

      {/* Left gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />

      {/* Bottom gradient */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-netflix-black to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-end">
        <div className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            {/* Title */}
            <motion.h1
              key={`title-${movie.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-heading text-4xl font-bold leading-none tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
            >
              {title}
            </motion.h1>

            {/* Metadata */}
            <motion.div
              key={`meta-${movie.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mt-4 flex items-center gap-3 text-sm text-neutral-300"
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
                className="mt-4 max-w-xl text-sm leading-6 text-neutral-200 sm:text-base sm:leading-7"
              >
                {movie.overview}
              </motion.p>
            )}

            {/* Actions */}
            <div className="mt-6 flex items-center gap-3">
              <button
                type="button"
                className="flex cursor-pointer items-center gap-2 rounded-md bg-white px-5 py-3 font-semibold text-black transition-transform hover:scale-105"
              >
                <Play size={19} fill="currentColor" />
                Play
              </button>

              <button
                type="button"
                className="flex cursor-pointer items-center gap-2 rounded-md bg-neutral-700/80 px-5 py-3 font-semibold text-white backdrop-blur-sm transition-colors hover:bg-neutral-600"
              >
                <Info size={19} />
                More Info
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero indicators */}
      {heroMovies.length > 1 && (
        <div className="absolute bottom-8 right-6 z-20 flex items-center gap-2">
          {heroMovies.map((heroMovie, index) => (
            <span
              key={heroMovie.id}
              className={`h-1.5 rounded-full transition-all duration-1000 ease-in-out ${
                index === currentIndex ? "w-6 bg-white" : "w-1.5 bg-white/40"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default HeroBanner;
