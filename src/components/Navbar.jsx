import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";

const navLinkClass = ({ isActive }) =>
  `px-2 py-1 text-sm font-medium transition-colors ${
    isActive ? "text-white" : "text-neutral-400 hover:text-white"
  }`;

const mobileNavLinkClass = ({ isActive }) =>
  `block rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
    isActive
      ? "bg-neutral-800 text-white"
      : "text-neutral-300 hover:bg-neutral-800 hover:text-white"
  }`;

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
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
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled || isMenuOpen
          ? "bg-netflix-black/95 shadow-lg backdrop-blur-md"
          : "bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <NavLink
          to="/"
          onClick={closeMenu}
          className="shrink-0 text-xl font-bold tracking-tight text-netflix-red sm:text-2xl"
        >
          MOVIE
        </NavLink>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-5 md:flex lg:gap-7">
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
        <div className="flex items-center gap-1">
          {/* Desktop Search */}
          <NavLink
            to="/search"
            className="hidden rounded-full p-2 text-neutral-300 transition-colors hover:bg-white/10 hover:text-white md:block"
            aria-label="Search"
          >
            <Search size={20} />
          </NavLink>

          {/* Mobile Menu */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="rounded-full p-2 text-neutral-300 transition-colors hover:bg-white/10 hover:text-white md:hidden"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="border-t border-white/10 bg-netflix-black/98 px-4 py-4 shadow-2xl backdrop-blur-md md:hidden">
          <ul className="mx-auto flex w-full max-w-7xl flex-col gap-1">
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
