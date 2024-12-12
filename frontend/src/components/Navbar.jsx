import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="p-4 bg-slate-900 text-white px-8">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="w-auto text-xl font-black text-neutral-300">
          <Link to="/">PluggedIN</Link>
        </div>

        {/* Hamburger Menu Button */}
        <button
          className="lg:hidden block text-gray-400 focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop Menu */}
        <div className="hidden lg:flex flex-row gap-4 font-light text-gray-400">
          <Link to="/dashboard" className="hover:text-gray-100">
            Dashboard
          </Link>
          <Link to="/mock-interview" className="hover:text-gray-100">
            Mock-Interview
          </Link>
          {isAuthenticated() ? (
            ""
          ) : (
            <Link to="/login" className="hover:text-gray-100">
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden mt-4 space-y-4 text-gray-400">
          <Link
            to="/dashboard"
            className="block hover:text-gray-100"
            onClick={toggleMenu}
          >
            Dashboard
          </Link>
          <Link
            to="/mock-interview"
            className="block hover:text-gray-100"
            onClick={toggleMenu}
          >
            Mock-Interview
          </Link>
          {!isAuthenticated() && (
            <Link
              to="/login"
              className="block hover:text-gray-100"
              onClick={toggleMenu}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
