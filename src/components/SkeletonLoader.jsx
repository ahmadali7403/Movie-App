const SkeletonLoader = ({ count = 6 }) => {
  return (
    <div className="flex gap-3 overflow-hidden sm:gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="w-36 shrink-0 overflow-hidden rounded-md bg-neutral-900 sm:w-44 md:w-48"
        >
          {/* Poster skeleton */}
          <div className="aspect-[2/3] w-full animate-pulse bg-neutral-800" />
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
