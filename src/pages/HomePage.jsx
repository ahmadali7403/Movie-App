import { useEffect, useState } from "react";
import { getTrendingMovies } from "../services/tmdb";
import ContentRow from "../components/ContentRow";
import HeroBanner from "../components/HeroBanner";
import PageContainer from "../components/PageContainer";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const loadMovies = async () => {
      const movies = await getTrendingMovies();
      setMovies(movies);
    };

    loadMovies();
  }, []);

  return (
    <main>
      <HeroBanner movie={movies[0]} />

      <PageContainer>
        <ContentRow title="Trending Movies" movies={movies} />

        {/* Future rows */}
      </PageContainer>
    </main>
  );
};

export default HomePage;
