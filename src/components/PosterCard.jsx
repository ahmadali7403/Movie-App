import { motion } from "framer-motion";
import { Play, Plus, Info, Check } from "lucide-react";

const PosterCard = ({ movie, onAddToList, isInList }) => {
  // TMDB provides only the image path, so we combine it
  // with TMDB's image base URL to create the complete poster URL.
  const imageUrl = movie?.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  return (
    <motion.article
      // Each PosterCard has its own "group", so the hover
      // effect belongs only to this specific movie card.
      className="group relative w-40 shrink-0 overflow-hidden rounded-md bg-neutral-900 sm:w-44 md:w-48"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      {/* Movie poster */}
      <div className="aspect-[2/3] w-full">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={movie?.title || "Movie poster"}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          // Fallback when TMDB does not provide a poster image.
          <div className="flex h-full items-center justify-center bg-neutral-800 text-sm text-neutral-500">
            No Image
          </div>
        )}
      </div>

      {/*
        The overlay is hidden by default.
        It appears only when the mouse is over THIS specific PosterCard
        on desktop screens.
      */}
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 transition-opacity duration-300 md:group-hover:opacity-100">
        <div className="p-3">
          {/* Quick action buttons */}
          <div className="flex items-center gap-2">
            {/* Play button */}
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black transition-transform hover:scale-105 cursor-pointer"
              aria-label={`Play ${movie?.title || "movie"}`}
            >
              <Play size={16} fill="currentColor" />
            </button>

            {/* Add or remove movie from My List */}
            <button
              type="button"
              onClick={() => onAddToList?.(movie)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-400 bg-black/60 text-white transition-colors hover:border-white cursor-pointer"
              aria-label={
                isInList
                  ? `Remove ${movie?.title || "movie"} from My List`
                  : `Add ${movie?.title || "movie"} to My List`
              }
            >
              {isInList ? <Check size={17} /> : <Plus size={17} />}
            </button>

            {/* More information button */}
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-400 bg-black/60 text-white transition-colors hover:border-white cursor-pointer"
              aria-label={`More information about ${movie?.title || "movie"}`}
            >
              <Info size={17} />
            </button>
          </div>

          {/* Movie title */}
          <h3 className="mt-3 line-clamp-1 text-sm font-semibold text-white cursor-pointer">
            {movie?.title}
          </h3>

          {/* Release year and rating */}
          <div className="mt-1 flex items-center gap-2 text-xs text-neutral-300">
            <span>{movie?.release_date?.slice(0, 4) || "N/A"}</span>

            <span>•</span>

            <span>⭐ {movie?.vote_average?.toFixed(1) || "N/A"}</span>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default PosterCard;
