import { NavLink } from 'react-router-dom'
import { Search } from 'lucide-react'

const navLinkClass = ({ isActive }) =>
  `px-2 py-1 text-sm font-medium transition-colors ${
    isActive ? 'text-white' : 'text-neutral-400 hover:text-white'
  }`

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 bg-netflix-black/95 backdrop-blur-sm">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <NavLink to="/" className="text-xl font-bold tracking-tight text-netflix-red">
            MOVIE
          </NavLink>

          <ul className="hidden items-center gap-4 md:flex">
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
        </div>

        <NavLink
          to="/search"
          className="rounded p-2 text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white"
          aria-label="Search"
        >
          <Search size={20} />
        </NavLink>
      </nav>
    </header>
  )
}

export default Navbar
