import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PosterCard from "./PosterCard";
import SkeletonLoader from "./SkeletonLoader";

const ContentRow = ({ title, movies = [], loading = false }) => {
  // Reference to the horizontal scrolling container.
  const rowRef = useRef(null);

  // Controls whether the navigation arrows are visible.
  const [isRowHovered, setIsRowHovered] = useState(false);

  // Scroll the movie row to the left.
  const scrollLeft = () => {
    rowRef.current?.scrollBy({
      left: -600,
      behavior: "smooth",
    });
  };

  // Scroll the movie row to the right.
  const scrollRight = () => {
    rowRef.current?.scrollBy({
      left: 600,
      behavior: "smooth",
    });
  };

  return (
    <section
      className="relative"
      onMouseEnter={() => setIsRowHovered(true)}
      onMouseLeave={() => setIsRowHovered(false)}
    >
      {/* Section title */}
      <h2 className="mb-4 text-xl font-bold tracking-tight text-white sm:text-2xl">
        {title}
      </h2>

      {/* Left navigation button */}
      {!loading && isRowHovered && (
        <button
          type="button"
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 z-20 hidden h-12 w-10 -translate-y-1/2 items-center justify-center rounded-r-md bg-black/70 text-white hover:bg-black md:flex cursor-pointer"
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
          className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {movies.map((movie) => (
            <div key={movie.id} className="snap-start">
              <PosterCard movie={movie} />
            </div>
          ))}
        </div>
      )}

      {/* Right navigation button */}
      {!loading && isRowHovered && (
        <button
          type="button"
          onClick={scrollRight}
          className="absolute right-0 top-1/2 z-20 hidden h-12 w-10 -translate-y-1/2 items-center justify-center rounded-l-md bg-black/70 text-white hover:bg-black md:flex cursor-pointer"
          aria-label={`Scroll ${title} right`}
        >
          <ChevronRight size={28} />
        </button>
      )}
    </section>
  );
};

export default ContentRow;
