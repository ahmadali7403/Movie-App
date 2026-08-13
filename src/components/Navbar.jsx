import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";

const navLinkClass = ({ isActive }) =>
  `px-2 py-1 text-sm font-medium transition-colors ${
    isActive ? "text-white" : "text-neutral-400 hover:text-white"
  }`;

const mobileNavLinkClass = ({ isActive }) =>
  `block rounded-md px-4 py-3 text-sm font-medium transition-colors ${
    isActive
      ? "bg-neutral-800 text-white"
      : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
  }`;

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-netflix-black/95 shadow-lg backdrop-blur-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <NavLink
          to="/"
          className="text-xl font-bold tracking-tight text-netflix-red"
          onClick={closeMenu}
        >
          MOVIE
        </NavLink>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-6 md:flex">
          <li>
            <NavLink to="/" end className={navLinkClass}>
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/browse/28" className={navLinkClass}>
              Browse
            </NavLink>
          </li>

          <li>
            <NavLink to="/search" className={navLinkClass}>
              Search
            </NavLink>
          </li>

          <li>
            <NavLink to="/my-list" className={navLinkClass}>
              My List
            </NavLink>
          </li>

          <li>
            <NavLink to="/profiles" className={navLinkClass}>
              Profiles
            </NavLink>
          </li>
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          {/* Search - Desktop */}
          <NavLink
            to="/search"
            className="hidden rounded-md p-2 text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white md:block"
            aria-label="Search"
          >
            <Search size={20} />
          </NavLink>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="rounded-md p-2 text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white md:hidden"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-neutral-800 bg-netflix-black px-4 py-4 shadow-lg md:hidden">
          <ul className="flex flex-col gap-2">
            <li>
              <NavLink
                to="/"
                end
                className={mobileNavLinkClass}
                onClick={closeMenu}
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/browse/28"
                className={mobileNavLinkClass}
                onClick={closeMenu}
              >
                Browse
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/search"
                className={mobileNavLinkClass}
                onClick={closeMenu}
              >
                Search
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/my-list"
                className={mobileNavLinkClass}
                onClick={closeMenu}
              >
                My List
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/profiles"
                className={mobileNavLinkClass}
                onClick={closeMenu}
              >
                Profiles
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
