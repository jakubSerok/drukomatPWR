import React, { useState, useContext } from "react";
import { Link } from "react-scroll"; // Link do scrollowania
import { useNavigate } from "react-router-dom"; // useNavigate z react-router-dom
import { Context } from "../Context/Context"; // Kontekst z tokenem
import { FaUserCircle } from "react-icons/fa"; // Importing a user icon from react-icons

const Navbar = ({ setShowLogin }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown
  const { token, setToken } = useContext(Context); // Pobieranie tokenu z kontekstu
  const navigate = useNavigate(); // Hook nawigacji

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown visibility
  };

  const goToUserPanel = () => {
    navigate("/userpanel"); // Nawigacja do panelu użytkownika
    setIsDropdownOpen(false); // Close dropdown when navigating
  };

  const logout = () => {
    localStorage.removeItem("token"); // Usuwanie tokenu z localStorage
    setToken("");
    navigate("/"); // Nawigacja do strony głównej po wylogowaniu
  };

  return (
    <div>
      <nav className="bg-[#011627] fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600 text-[#ffd7df]">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-[#55d6be]">
              Drukmat
            </span>
          </a>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              type="button"
              className="text-white bg-[#24947f] hover:bg-[#55d6be] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              DrukApp
            </button>
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden border-2 hover:bg-[#55d6be] hover:text-white hover:border-[#55d6be]"
              aria-controls="navbar-sticky"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
              isMenuOpen ? "block" : "hidden"
            }`}
            id="navbar-sticky"
          >
            <ul className="flex flex-col gap-2 p-4 md:p-0 mt-4 font-medium border rounded-lg bg-[#011627] md:space-x-8 rtl:space-x-reverse md:flex-row md :mt-0 md:border-0 text-center items-center">
              <li>
                <Link
                  to="onas"
                  smooth={true}
                  duration={500}
                  className="block py-2 px-3 text-[#ffd7df] rounded hover:text-[#55d6be] border-2 md:border-none w-[150px] md:w-full cursor-pointer"
                >
                  O nas
                </Link>
              </li>
              <li>
                <Link
                  to="mapa"
                  smooth={true}
                  duration={500}
                  className="block py-2 px-3 text-[#ffd7df] rounded hover:text-[#55d6be] border-2 md:border-none w-[150px] md:w-full cursor-pointer"
                >
                  Mapa
                </Link>
              </li>
              <li>
                <Link
                  to="oferta"
                  smooth={true}
                  duration={500}
                  className="block py-2 px-3 text-[#ffd7df] rounded hover:text-[#55d6be] border-2 md:border-none w-[150px] md:w-full cursor-pointer"
                >
                  Oferta
                </Link>
              </li>
              <li>
                <Link
                  to="kontakt"
                  smooth={true}
                  duration={500}
                  className="block py-2 px-3 text-[#ffd7df] rounded hover:text-[#55d6be] border-2 md:border-none w-[150px] md:w-full cursor-pointer"
                >
                  Kontakt
                </Link>
              </li>
              <li>
                <div className="navbar-right relative">
                  {!token ? (
                    <button onClick={() => navigate("/login")}>Sign In</button>
                  ) : (
                    <div className="navbar-profile">
                      <FaUserCircle
                        className="text-[#ffd7df] w-8 h-8 cursor-pointer"
                        onClick={toggleDropdown} // Toggle dropdown on click
                      />
                      {isDropdownOpen && ( // Conditional rendering for dropdown
                        <ul className="absolute right-0 mt-2 w-40 bg-[#011627] border border-gray-200 rounded-lg shadow-lg">
                          <li
                            onClick={goToUserPanel}
                            className="p-2 hover:bg-[#55d6be] cursor-pointer"
                          >
                            Profile
                          </li>
                          <hr />
                          <li
                            onClick={logout}
                            className="p-2 hover:bg-[#55d6be] cursor-pointer"
                          >
                            Logout
                          </li>
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
