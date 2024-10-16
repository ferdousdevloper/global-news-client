/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { Link } from "react-router-dom";
import CustomizableNews from "./CustomizableNews";
import useAdmin from "../hooks/useAdmin";

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const { user, logOut } = useContext(AuthContext) || {}; // Assuming user and logout are provided
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const isAdmin = useAdmin(); // Check if user is an admin

  const toggleMenu = (): void => {
    setIsOpen(!isOpen);
  };
  const toggleMenubar = (): void => {
    setIsOpenMenu(!isOpenMenu);
  };

  const handleLogout = async () => {
    if (logOut) {
      try {
        await logOut();
        // Handle successful logout (e.g., redirect to homepage or show a message)
      } catch (error) {
        console.error("Failed to log out", error);
      }
    }
  };

  const handleFilter = () => {
    setOpenFilter(!openFilter);
  };
  console.log(openFilter);

  return (
    <>
      <nav className="bg-gray-800 glass text-white shadow-md fixed z-50 top-0 w-full">
        <div className="container mx-auto flex justify-between items-center p-4">
          <div className="flex justify-center items-center gap-4">
            {/* Hamburger Menu for exploring all news features */}
            <div className="hidden md:block">
              <button onClick={toggleMenubar}>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={
                      isOpenMenu
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16M4 18h16"
                    }
                  />
                </svg>
              </button>
            </div>
            {/* Left Side: Global News */}
            <div className="text-2xl font-bold">
              <NavLink to="/">
                <h1 className="text-center text-4xl font-bold tracking-widest">
                  <span className="text-[#02AA08]">Global</span> News
                </h1>
              </NavLink>
              <p className="text-xs hidden md:block ml-1 opacity-50">
                Connecting you to global stories
              </p>
            </div>
          </div>

          {/* Middle: Menu Links (Responsive) */}
          <div className="hidden md:flex space-x-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-2 py-1 rounded ${
                  isActive
                    ? "bg-[#02AA08] text-white"
                    : "hover:bg-[#02AA08] hover:text-white"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/latest"
              className={({ isActive }) =>
                `px-2 py-1 rounded ${
                  isActive
                    ? "bg-[#02AA08] text-white"
                    : "hover:bg-[#02AA08] hover:text-white"
                }`
              }
            >
              Latest
            </NavLink>
            <NavLink
              to="/all-news"
              className={({ isActive }) =>
                `px-2 py-1 rounded ${
                  isActive
                    ? "bg-[#02AA08] text-white"
                    : "hover:bg-[#02AA08] hover:text-white"
                }`
              }
            >
              All News
            </NavLink>
            <NavLink
              to="/category/politics"
              className={({ isActive }) =>
                `px-2 py-1 rounded ${
                  isActive
                    ? "bg-[#02AA08] text-white"
                    : "hover:bg-[#02AA08] hover:text-white"
                }`
              }
            >
              Politics
            </NavLink>
            <NavLink
              to="/category/sports"
              className={({ isActive }) =>
                `px-2 py-1 rounded ${
                  isActive
                    ? "bg-[#02AA08] text-white"
                    : "hover:bg-[#02AA08] hover:text-white"
                }`
              }
            >
              Sports
            </NavLink>
            <NavLink
              to="/category/technology"
              className={({ isActive }) =>
                `px-2 py-1 rounded ${
                  isActive
                    ? "bg-[#02AA08] text-white"
                    : "hover:bg-[#02AA08] hover:text-white"
                }`
              }
            >
              Technology
            </NavLink>
            <NavLink
              to="/category/entertainment"
              className={({ isActive }) =>
                `px-2 py-1 rounded ${
                  isActive
                    ? "bg-[#02AA08] text-white"
                    : "hover:bg-[#02AA08] hover:text-white"
                }`
              }
            >
              Entertainment
            </NavLink>
            <NavLink
              to="/category/about"
              className={({ isActive }) =>
                `px-2 py-1 rounded ${
                  isActive
                    ? "bg-[#02AA08] text-white"
                    : "hover:bg-[#02AA08] hover:text-white"
                }`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `px-2 py-1 rounded ${
                  isActive
                    ? "bg-[#02AA08] text-white"
                    : "hover:bg-[#02AA08] hover:text-white"
                }`
              }
            >
              Contact Us
            </NavLink>
            {/* <button
              onClick={handleFilter}
              className="hover:bg-[#02AA08] rounded p-2"
            >
              Filter
            </button> */}

            {/* Conditionally render DASHBOARD link based on isAdmin and user authentication */}
            {user && isAdmin && (
              <NavLink
                to="/dashboard/profile"
                className={({ isActive }) =>
                  `px-2 py-1 rounded ${
                    isActive
                      ? "bg-[#02AA08] text-white"
                      : "hover:bg-[#02AA08] hover:text-white"
                  }`
                }
              >
                DASHBOARD
              </NavLink>
            )}
          </div>

          {/* Right Side: Login/Logout Button */}
          <div className="hidden md:block">
            {user ? (
              <div
                className="dropdown dropdown-end tooltip tooltip-left"
                data-tip={user.displayName}
              >
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full ">
                    <img
                      src={
                        user?.photoURL ||
                        "https://i.ibb.co/vY5bFQR/2151033973-min.jpg"
                      }
                    />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="menu dropdown-content mt-3 z-[99] px-2 py-10 shadow-4xl shadow bg-black rounded-box w-64 border   "
                >
                  <img
                    src={
                      user?.photoURL ||
                      "https://i.ibb.co/vY5bFQR/2151033973-min.jpg"
                    }
                    alt=""
                    className="w-32 h-32 mx-auto rounded-full  aspect-square mb-6"
                  />
                  <li>
                    <p className=" btn mb-3">
                      <span>{user?.displayName || "user name not found"}</span>
                    </p>
                  </li>
                  <li>
                    <span className="btn mb-3">
                      {user?.email || "email not found"}
                    </span>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="btn btn-sm btn-error text-white"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/login">
                <button className=" px-4 py-2 rounded bg-[#02AA08] hover:bg-[#1b5c1d]">
                  Login
                </button>
              </Link>
            )}
            {/* {user ? (
            <button
              onClick={handleLogout}
              className="block px-4 py-2 rounded bg-[#02AA08] hover:bg-[#1b5c1d] text-white"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `block px-4 py-2 rounded ${
                  isActive ? "bg-[#02AA08]" : "bg-[#02AA08] hover:bg-[#1b5c1d]"
                } text-white px-8`
              }
            >
              Login
            </NavLink>
          )} */}
          </div>

          {/* Hamburger Menu Icon (for small screens) */}
          <div className="md:hidden">
            <button onClick={toggleMenu}>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Large screen Menu */}
        {isOpenMenu && (
          <div className="hidden md:block bg-gray-700 max-w-md text-white space-y-2 px-4 py-2 scroll-m-0">
            <div>
              <div className="text-2xl font-bold">
                <NavLink to="/">
                  <h1 className="text-center text-4xl font-bold tracking-widest">
                    <span className="text-[#02AA08]">Global</span> News
                  </h1>
                </NavLink>
              </div>
              <h2 className="text-center">Connecting you to global stories</h2>
              <hr className="border-2 my-2" />
            </div>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block px-2 py-1 rounded ${
                  isActive
                    ? "bg-[#02AA08] text-white"
                    : "hover:bg-[#02AA08] hover:text-white"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/latest"
              className={({ isActive }) =>
                `block px-2 py-1 rounded ${
                  isActive
                    ? "bg-[#02AA08] text-white"
                    : "hover:bg-[#02AA08] hover:text-white"
                }`
              }
            >
              Latest
            </NavLink>
            <NavLink
              to="/all-news"
              className={({ isActive }) =>
                `block px-2 py-1 rounded ${
                  isActive
                    ? "bg-[#02AA08] text-white"
                    : "hover:bg-[#02AA08] hover:text-white"
                }`
              }
            >
              All News
            </NavLink>
            <NavLink
              to="/category/business"
              className={({ isActive }) =>
                `block px-2 py-1 rounded ${
                  isActive
                    ? "bg-[#02AA08] text-white"
                    : "hover:bg-[#02AA08] hover:text-white"
                }`
              }
            >
              Business
            </NavLink>
            <NavLink
              to="/category/politics"
              className={({ isActive }) =>
                `block px-2 py-1 rounded ${
                  isActive
                    ? "bg-[#02AA08] text-white"
                    : "hover:bg-[#02AA08] hover:text-white"
                }`
              }
            >
              Politics
            </NavLink>
            <NavLink
              to="/category/sports"
              className={({ isActive }) =>
                `block px-2 py-1 rounded ${
                  isActive
                    ? "bg-[#02AA08] text-white"
                    : "hover:bg-[#02AA08] hover:text-white"
                }`
              }
            >
              Sports
            </NavLink>
            <NavLink
              to="/category/technology"
              className={({ isActive }) =>
                `block px-2 py-1 rounded ${
                  isActive
                    ? "bg-[#02AA08] text-white"
                    : "hover:bg-[#02AA08] hover:text-white"
                }`
              }
            >
              Technology
            </NavLink>
            <NavLink
              to="/category/lifestyle"
              className={({ isActive }) =>
                `block px-2 py-1 rounded ${
                  isActive
                    ? "bg-[#02AA08] text-white"
                    : "hover:bg-[#02AA08] hover:text-white"
                }`
              }
            >
              Lifestyle
            </NavLink>
            <NavLink
              to="/category/opinion"
              className={({ isActive }) =>
                `block px-2 py-1 rounded ${
                  isActive
                    ? "bg-[#02AA08] text-white"
                    : "hover:bg-[#02AA08] hover:text-white"
                }`
              }
            >
              Opinion
            </NavLink>
            <NavLink
              to="/category/feature"
              className={({ isActive }) =>
                `block px-2 py-1 rounded ${
                  isActive
                    ? "bg-[#02AA08] text-white"
                    : "hover:bg-[#02AA08] hover:text-white"
                }`
              }
            >
              Feature
            </NavLink>
            <NavLink
              to="/category/tech"
              className={({ isActive }) =>
                `block px-2 py-1 rounded ${
                  isActive
                    ? "bg-[#02AA08] text-white"
                    : "hover:bg-[#02AA08] hover:text-white"
                }`
              }
            >
              Tech & Startup
            </NavLink>
            <NavLink
              to="/category/gallery"
              className={({ isActive }) =>
                `block px-2 py-1 rounded ${
                  isActive
                    ? "bg-[#02AA08] text-white"
                    : "hover:bg-[#02AA08] hover:text-white"
                }`
              }
            >
              Photo Gallery
            </NavLink>
            <NavLink
              to="/category/sports"
              className={({ isActive }) =>
                `block px-2 py-1 rounded ${
                  isActive
                    ? "bg-[#02AA08] text-white"
                    : "hover:bg-[#02AA08] hover:text-white"
                }`
              }
            >
              Sports
            </NavLink>
            <NavLink
              to="/category/entertainment"
              className={({ isActive }) =>
                `block px-2 py-1 rounded ${
                  isActive
                    ? "bg-[#02AA08] text-white"
                    : "hover:bg-[#02AA08] hover:text-white"
                }`
              }
            >
              Entertainment
            </NavLink>
            <button
              onClick={handleFilter}
              className="hover:bg-[#02AA08] rounded p-2"
            >
              Filter News
            </button>
          </div>
        )}
        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-gray-700 max-h-screen overflow-y-auto text-white space-y-2 px-4 py-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block px-2 py-1 rounded ${
                  isActive
                    ? "bg-[#02AA08] text-white"
                    : "hover:bg-[#02AA08] hover:text-white"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/latest"
              className={({ isActive }) =>
                `block px-2 py-1 rounded ${
                  isActive
                    ? "bg-[#02AA08] text-white"
                    : "hover:bg-[#02AA08] hover:text-white"
                }`
              }
            >
              Latest
            </NavLink>
            <NavLink
              to="/all-news"
              className={({ isActive }) =>
                `block px-2 py-1 rounded ${
                  isActive
                    ? "bg-[#02AA08] text-white"
                    : "hover:bg-[#02AA08] hover:text-white"
                }`
              }
            >
              All News
            </NavLink>
            <NavLink
              to="/category/business"
              className={({ isActive }) =>
                `block px-2 py-1 rounded ${
                  isActive
                    ? "bg-[#02AA08] text-white"
                    : "hover:bg-[#02AA08] hover:text-white"
                }`
              }
            >
              Business
            </NavLink>
            <NavLink
              to="/category/politics"
              className={({ isActive }) =>
                `block px-2 py-1 rounded ${
                  isActive
                    ? "bg-[#02AA08] text-white"
                    : "hover:bg-[#02AA08] hover:text-white"
                }`
              }
            >
              Politics
            </NavLink>
            <NavLink
              to="/category/sports"
              className={({ isActive }) =>
                `block px-2 py-1 rounded ${
                  isActive
                    ? "bg-[#02AA08] text-white"
                    : "hover:bg-[#02AA08] hover:text-white"
                }`
              }
            >
              Sports
            </NavLink>
            <NavLink
              to="/category/technology"
              className={({ isActive }) =>
                `block px-2 py-1 rounded ${
                  isActive
                    ? "bg-[#02AA08] text-white"
                    : "hover:bg-[#02AA08] hover:text-white"
                }`
              }
            >
              Technology
            </NavLink>
            <NavLink
              to="/category/lifestyle"
              className={({ isActive }) =>
                `block px-2 py-1 rounded ${
                  isActive
                    ? "bg-[#02AA08] text-white"
                    : "hover:bg-[#02AA08] hover:text-white"
                }`
              }
            >
              Lifestyle
            </NavLink>
            <NavLink
              to="/category/opinion"
              className={({ isActive }) =>
                `block px-2 py-1 rounded ${
                  isActive
                    ? "bg-[#02AA08] text-white"
                    : "hover:bg-[#02AA08] hover:text-white"
                }`
              }
            >
              Opinion
            </NavLink>
            <NavLink
              to="/category/feature"
              className={({ isActive }) =>
                `block px-2 py-1 rounded ${
                  isActive
                    ? "bg-[#02AA08] text-white"
                    : "hover:bg-[#02AA08] hover:text-white"
                }`
              }
            >
              Feature
            </NavLink>
            <NavLink
              to="/category/tech"
              className={({ isActive }) =>
                `block px-2 py-1 rounded ${
                  isActive
                    ? "bg-[#02AA08] text-white"
                    : "hover:bg-[#02AA08] hover:text-white"
                }`
              }
            >
              Tech & Startup
            </NavLink>
            <NavLink
              to="/category/gallery"
              className={({ isActive }) =>
                `block px-2 py-1 rounded ${
                  isActive
                    ? "bg-[#02AA08] text-white"
                    : "hover:bg-[#02AA08] hover:text-white"
                }`
              }
            >
              Photo Gallery
            </NavLink>
            <NavLink
              to="/category/sports"
              className={({ isActive }) =>
                `block px-2 py-1 rounded ${
                  isActive
                    ? "bg-[#02AA08] text-white"
                    : "hover:bg-[#02AA08] hover:text-white"
                }`
              }
            >
              Sports
            </NavLink>
            <NavLink
              to="/category/about"
              className={({ isActive }) =>
                `block px-2 py-1 rounded ${
                  isActive
                    ? "bg-[#02AA08] text-white"
                    : "hover:bg-[#02AA08] hover:text-white"
                }`
              }
            >
              About
            </NavLink>

            <NavLink
              to="/dashboard/profile"
              className={({ isActive }) =>
                `px-2 py-1 rounded ${
                  isActive
                    ? "bg-[#02AA08] text-white"
                    : "hover:bg-[#02AA08] hover:text-white"
                }`
              }
            >
              DASHBOARD
            </NavLink>
            <br />

            <button
              onClick={handleFilter}
              className="hover:bg-[#02AA08] rounded p-2"
            >
              Filter News
            </button>

            {user ? (
              <div>
                <div>
                  <h1 className="text-lg py-2">User Profile</h1>
                  <hr />
                  <div className="flex items-center justify-center gap-4">
                    <img
                      src={
                        user?.photoURL ||
                        "https://i.ibb.co/vY5bFQR/2151033973-min.jpg"
                      }
                      alt=""
                      className="w-32 h-32 rounded-full  aspect-square mb-6"
                    />
                    <div>
                      <div>
                        <p className=" btn mb-3">
                          <span>
                            {user?.displayName || "user name not found"}
                          </span>
                        </p>
                      </div>
                      <div>
                        <span className="btn mb-3">
                          {user?.email || "email not found"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="block px-4 w-full py-2 rounded bg-[#02AA08] hover:bg-[#1b5c1d] text-white mt-2"
                >
                  Logout
                </button>
              </div>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded ${
                    isActive
                      ? "bg-[#02AA08]"
                      : "bg-[#02AA08] hover:bg-[#1b5c1d]"
                  } text-white mt-2`
                }
              >
                Login
              </NavLink>
            )}
          </div>
        )}
      </nav>
      <CustomizableNews openFilter={openFilter}></CustomizableNews>
    </>
  );
};

export default NavBar;
