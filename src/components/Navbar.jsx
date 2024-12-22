import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [theme, setTheme] = useState("light"); // Default theme

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const links = (
    <>
      <li>
        <NavLink to="/" className="hover:text-primary font-semibold">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/find_tutors" className="hover:text-primary font-semibold">
          Find Tutors
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/add_tutorials"
          className="hover:text-primary font-semibold"
        >
          Add Tutorials
        </NavLink>
      </li>
    </>
  );

  // Toggle Menu
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Toggle theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className="bg-base-100 shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="navbar w-11/12 mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <button
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden"
              onClick={toggleDropdown}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>
            {dropdownOpen && (
              <ul className="menu dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow z-10">
                <li className="font-bold text-xl my-2">
                  <Link to="/">TutorHunt</Link>
                </li>
                {links}
              </ul>
            )}
          </div>
          <Link to="/" className="btn btn-ghost normal-case text-2xl font-bold">
            TutorHunt
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-4">{links}</ul>
        </div>

        <div className="navbar-end space-x-4">
          {/* Theme Toggle */}
          <button
            className="btn btn-ghost text-lg"
            onClick={toggleTheme}
            title="Toggle Theme"
          >
            {theme === "light" ? (
              <FaMoon className="text-primary" />
            ) : (
              <FaSun className="text-yellow-500" />
            )}
          </button>

          <Link
            to="/login"
            className="btn btn-outline btn-primary md:px-6"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
