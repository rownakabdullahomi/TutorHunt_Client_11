import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";
import toast from "react-hot-toast";
import { AuthContext } from "../providers/AuthProvider";
import { FaCircleUser } from "react-icons/fa6";
import { motion } from "framer-motion";
import { FiLogIn, FiLogOut } from "react-icons/fi";

const Navbar = () => {
  const { user, userLogout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });
  const location = useLocation();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle Theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className="hover:border-2 hover:border-primary font-medium tracking-wide duration-200"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/find_tutors"
          className="hover:border-2 hover:border-primary font-medium tracking-wide duration-200 "
        >
          Find Tutors
        </NavLink>
      </li>
      {user ? (
        <>
          <li>
            <NavLink
              to="/add_tutorials"
              className="hover:border-2 hover:border-primary font-medium tracking-wide duration-200"
            >
              Add Tutorials
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my_tutorials"
              className="hover:border-2 hover:border-primary font-medium tracking-wide duration-200"
            >
              My Tutorials
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my_booked_tutors"
              className="hover:border-2 hover:border-primary font-medium tracking-wide duration-200"
            >
              My Booked Tutors
            </NavLink>
          </li>
        </>
      ) : (
        <></>
      )}
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
    <div
      id="navbar"
      className="bg-base-100 shadow-md transition-all duration-300"
    >
      <motion.div
        className="navbar px-4 lg:px-6 justify-between py-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Navbar Start */}
        <div className="flex items-center">
          {/* Mobile Menu Dropdown */}
          <div className="dropdown">
            <button
              tabIndex={0}
              role="button"
              className="btn btn-outline btn-primary btn-sm lg:hidden"
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
              <motion.ul
                className="menu dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow z-10"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <li className="font-bold italic text-2xl my-2 animate__animated animate__headShake animate__infinite animate__slower mx-auto">
                  <Link to="/">
                    <div>
                      Tutor<span className="text-primary">Hunt</span>
                    </div>
                  </Link>
                </li>
                {links}
              </motion.ul>
            )}
          </div>
          <Link
            to="/"
            className="hidden lg:block normal-case text-3xl pt-1 font-extrabold italic animate__animated animate__headShake animate__infinite animate__slower"
          >
            <div>
              Tutor<span className="text-primary">Hunt</span>
            </div>
          </Link>
        </div>

        {/* Navbar Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-4 font-semibold">{links}</ul>
        </div>

        {/* Navbar End */}
        <div className="flex items-center ">
          {/* Theme Toggle */}
          <button
            className="btn btn-ghost btn-sm text-2xl "
            onClick={toggleTheme}
            title="Toggle Theme"
          >
            {theme === "light" ? (
              <FaMoon className="text-primary transition-transform duration-300 hover:scale-110" />
            ) : (
              <FaSun className="text-yellow-500 transition-transform duration-300 hover:scale-110" />
            )}
          </button>

          {/* Profile Section */}
          <div className="relative mr-5 ml-2">
            {user && user.email ? (
              <motion.img
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full border-2 border-gray-600 cursor-pointer"
                src={user?.photoURL}
                alt="User Avatar"
                onClick={toggleProfileDropdown}
                title={user.displayName || "User"}
                whileHover={{ scale: 1.1 }}
              />
            ) : (
              <div
                onClick={toggleProfileDropdown}
                className="cursor-pointer"
                title="Please log in"
              >
                <FaCircleUser className="text-4xl text-gray-600" />
              </div>
            )}

            {profileDropdownOpen && (
              <motion.div
                className="absolute right-0 mt-2 bg-base-100 shadow-lg rounded-box w-52 border-2 border-base-300 z-20"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {user && user.email ? (
                  <p className="font-semibold text-center py-2">
                    {user.displayName}
                  </p>
                ) : (
                  <p className="font-semibold text-center py-2">
                    Please log in
                  </p>
                )}
              </motion.div>
            )}
          </div>

          {/* Login/Logout Button */}
          {user && user?.email ? (
            <Link
              onClick={handleLogout}
              className="btn btn-sm btn-outline btn-primary flex items-center gap-2"
            >
              <FiLogOut className="text-red-600" /> Logout
            </Link>
          ) : (
            location.pathname !== "/register" &&
            location.pathname !== "/login" && (
              <Link
                to="/login"
                className="btn btn-sm btn-outline btn-primary md:px-6 flex items-center gap-2"
              >
                <FiLogIn className="text-green-600" /> Login
              </Link>
            )
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Navbar;
