import { useMyList } from "../context/MyListContext.jsx";
import ContentRow from "../components/ContentRow";

const MyListPage = () => {
  const { movies } = useMyList();

  return (
    <main className="min-h-screen overflow-x-hidden bg-netflix-black text-white">
      <div className="mx-auto w-full max-w-7xl px-4 pb-12 pt-24 sm:px-6 sm:pt-28 lg:px-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
            My List
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-neutral-400 sm:text-base">
            Movies and shows you've added to your list.
          </p>
        </div>

        {/* Empty state */}
        {movies.length === 0 ? (
          <div className="flex min-h-[calc(100vh-15rem)] items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900/40 px-5">
            <div className="max-w-md text-center">
              <h2 className="text-xl font-semibold sm:text-2xl">
                Your list is empty
              </h2>

              <p className="mt-2 text-sm leading-6 text-neutral-400 sm:text-base">
                Add movies to your list and they'll appear here.
              </p>
            </div>
          </div>
        ) : (
          <ContentRow title="My List" movies={movies} />
        )}
      </div>
    </main>
  );
};

export default MyListPage;
