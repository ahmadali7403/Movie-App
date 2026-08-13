import { motion } from "framer-motion";
import { Play, Info } from "lucide-react";

const HeroBanner = ({ movie }) => {
  if (!movie) return null;

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;

  const title = movie.title || movie.name || "Untitled";

  const releaseYear = movie.release_date
    ? movie.release_date.slice(0, 4)
    : movie.first_air_date
      ? movie.first_air_date.slice(0, 4)
      : null;

  return (
    <section className="relative min-h-[560px] w-full overflow-hidden sm:min-h-[600px]">
      {/* Backdrop */}
      {backdropUrl && (
        <img
          src={backdropUrl}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* Dark cinematic overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Left-side gradient for readable text */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />

      {/* Bottom gradient to blend hero into page */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-netflix-black to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex min-h-[560px] items-end">
        <div className="mx-auto w-full max-w-7xl px-4 pb-16 sm:min-h-[600px] sm:px-6 lg:px-8">
          <div className="flex min-h-[520px] max-w-2xl flex-col justify-end">
            {/* Movie title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
            >
              {title}
            </motion.h1>

            {/* Movie metadata */}
            <div className="mt-4 flex items-center gap-3 text-sm text-neutral-300">
              {releaseYear && <span>{releaseYear}</span>}

              {movie.vote_average > 0 && (
                <>
                  <span>•</span>
                  <span className="text-white">
                    ⭐ {movie.vote_average.toFixed(1)}
                  </span>
                </>
              )}
            </div>

            {/* Overview */}
            {movie.overview && (
              <p className="mt-4 max-w-xl text-sm leading-6 text-neutral-200 sm:text-base sm:leading-7">
                {movie.overview}
              </p>
            )}

            {/* Actions */}
            <div className="mt-6 flex items-center gap-3">
              {/* Play */}
              <button
                type="button"
                className="flex items-center gap-2 rounded-md bg-white px-5 py-3 font-semibold text-black transition-transform hover:scale-105"
              >
                <Play size={19} fill="currentColor" />
                Play
              </button>

              {/* More info */}
              <button
                type="button"
                className="flex items-center gap-2 rounded-md bg-neutral-700/80 px-5 py-3 font-semibold text-white backdrop-blur-sm transition-colors hover:bg-neutral-600"
              >
                <Info size={19} />
                More Info
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
