import { motion } from "framer-motion";
import { Play, Plus, Info, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMyList } from "../context/MyListContext.jsx";

const PosterCard = ({ movie }) => {
  const navigate = useNavigate();

  const { toggleMovie, isInList } = useMyList();

  const imageUrl = movie?.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  // Open movie detail page
  const openDetails = () => {
    navigate(`/title/${movie.id}`);
  };

  // Add / Remove movie from My List
  const handleToggleList = (e) => {
    e.stopPropagation();
    toggleMovie(movie);
  };

  return (
    <motion.article
      className="group relative w-40 shrink-0 cursor-pointer overflow-hidden rounded-md bg-neutral-900 sm:w-44 md:w-48"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
      onClick={openDetails}
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
          <div className="flex h-full items-center justify-center bg-neutral-800 text-sm text-neutral-500">
            No Image
          </div>
        )}
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 transition-opacity duration-300 md:group-hover:opacity-100">
        <div className="p-3">
          {/* Quick action buttons */}
          <div className="flex items-center gap-2">
            {/* Play */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white text-black transition-transform hover:scale-105"
              aria-label={`Play ${movie?.title || "movie"}`}
            >
              <Play size={16} fill="currentColor" />
            </button>

            {/* Add / Remove from My List */}
            <button
              type="button"
              onClick={handleToggleList}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-neutral-400 bg-black/60 text-white transition-colors hover:border-white"
              aria-label={
                isInList(movie?.id)
                  ? `Remove ${movie?.title || "movie"} from My List`
                  : `Add ${movie?.title || "movie"} to My List`
              }
            >
              {isInList(movie?.id) ? <Check size={17} /> : <Plus size={17} />}
            </button>

            {/* More information */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                openDetails();
              }}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-neutral-400 bg-black/60 text-white transition-colors hover:border-white"
              aria-label={`More information about ${movie?.title || "movie"}`}
            >
              <Info size={17} />
            </button>
          </div>

          {/* Movie title */}
          <h3 className="mt-3 line-clamp-1 cursor-pointer text-sm font-semibold text-white">
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
