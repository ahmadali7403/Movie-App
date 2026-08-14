import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import BrowsePage from "./pages/BrowsePage";
import TitleDetailPage from "./pages/TitleDetailPage";
import SearchPage from "./pages/SearchPage";
import ProfilesPage from "./pages/ProfilesPage";
import MyListPage from "./pages/MyListPage";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/browse/:genreId" element={<BrowsePage />} />
        <Route path="/title/:id" element={<TitleDetailPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/my-list" element={<MyListPage />} />
        <Route path="/profiles" element={<ProfilesPage />} />
      </Route>
    </Routes>
  );
};

export default App;
