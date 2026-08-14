import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PosterCard from "./PosterCard";
import SkeletonLoader from "./SkeletonLoader";

const ContentRow = ({ title, movies = [], loading = false }) => {
  const rowRef = useRef(null);
  const [isRowHovered, setIsRowHovered] = useState(false);

  const scrollLeft = () => {
    rowRef.current?.scrollBy({
      left: -600,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    rowRef.current?.scrollBy({
      left: 600,
      behavior: "smooth",
    });
  };

  return (
    <section
      className="relative min-w-0"
      onMouseEnter={() => setIsRowHovered(true)}
      onMouseLeave={() => setIsRowHovered(false)}
    >
      {/* Section title */}
      <h2 className="mb-4 text-lg font-bold tracking-tight text-white sm:text-xl md:text-2xl">
        {title}
      </h2>

      {/* Left navigation button - Desktop only */}
      {!loading && isRowHovered && (
        <button
          type="button"
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 z-20 hidden h-12 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-r-md bg-black/70 text-white transition-colors hover:bg-black md:flex"
          aria-label={`Scroll ${title} left`}
        >
          <ChevronLeft size={28} />
        </button>
      )}

      {/* Movie row / Skeleton loading */}
      {loading ? (
        <SkeletonLoader count={6} />
      ) : (
        <div
          ref={rowRef}
          className="flex min-w-0 gap-3 overflow-x-auto overscroll-x-contain scroll-smooth snap-x snap-mandatory pb-4 touch-pan-x sm:gap-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {movies.map((movie) => (
            <div key={movie.id} className="shrink-0 snap-start">
              <PosterCard movie={movie} />
            </div>
          ))}
        </div>
      )}

      {/* Right navigation button - Desktop only */}
      {!loading && isRowHovered && (
        <button
          type="button"
          onClick={scrollRight}
          className="absolute right-0 top-1/2 z-20 hidden h-12 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-l-md bg-black/70 text-white transition-colors hover:bg-black md:flex"
          aria-label={`Scroll ${title} right`}
        >
          <ChevronRight size={28} />
        </button>
      )}
    </section>
  );
};

export default ContentRow;
