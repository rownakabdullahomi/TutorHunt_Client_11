import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";
import toast from "react-hot-toast";
import { AuthContext } from "../providers/AuthProvider";
import { FaCircleUser } from "react-icons/fa6";

const Navbar = () => {
  const { user, userLogout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [theme, setTheme] = useState("light"); // Default theme
  const location = useLocation();

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

  // Toggle Profile Dropdown
  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  // Toggle theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const handleLogout = () => {
    userLogout()
      .then(() => {
        toast.success("Logout Successful!");
      })
      .catch((error) => {
        toast.error("Error logging out! " + error.message);
      });
  };

  return (
    <div className="bg-base-100 shadow-md">
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

          <div className="relative">
            {user && user.email ? (
              <img
                className="w-10 h-10 rounded-full border-2 border-gray-600 cursor-pointer"
                src={user?.photoURL}
                alt="User Avatar"
                onClick={toggleProfileDropdown}
              />
            ) : (
              <div onClick={toggleProfileDropdown} className="cursor-pointer">
                <FaCircleUser className="text-4xl" />
              </div>
            )}

            {profileDropdownOpen && (
              <div className="absolute -right-20 mt-2 bg-base-100 shadow-lg rounded-box w-52 border-2 border-base-300 z-20">
                {user && user.email ? (
                  <p className="font-semibold text-center p-2">
                    {user.displayName}
                  </p>
                ) : (
                  <p className="font-semibold text-center p-2 ">
                    Please log in
                  </p>
                )}
              </div>
            )}
          </div>

          {user && user?.email ? (
            <Link
              onClick={handleLogout}
              className="btn btn-sm btn-outline btn-primary"
            >
              Logout
            </Link>
          ) : (
            location.pathname !== "/register" &&
            location.pathname !== "/login" && (
              <Link
                to="/login"
                className="btn btn-sm btn-outline btn-primary md:px-6"
              >
                Login
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
