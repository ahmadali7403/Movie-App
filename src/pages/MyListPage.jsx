import { useMyList } from "../context/MyListContext.jsx";
import ContentRow from "../components/ContentRow";

const MyListPage = () => {
  const { movies } = useMyList();

  return (
    <main className="min-h-[calc(100vh-12rem)] bg-netflix-black">
      <div className="mx-auto w-full max-w-7xl px-4 pt-0 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">My List</h1>

          <p className="mt-2 text-sm text-neutral-400">
            Movies and shows you've added to your list.
          </p>
        </div>

        {movies.length === 0 ? (
          <div className="flex min-h-[250px] items-center justify-center rounded-lg bg-neutral-900/50">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-white">
                Your list is empty
              </h2>

              <p className="mt-2 text-sm text-neutral-400">
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
