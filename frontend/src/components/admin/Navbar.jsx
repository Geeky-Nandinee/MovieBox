import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { BiMoviePlay } from "react-icons/bi";
import { FaUserNinja } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "../../hooks";

export default function Navbar() {
  const { handleLogout } = useAuth();
  const [logoHover, setLogoHover] = useState(false);
  const [logoClick, setLogoClick] = useState(false);

  const handleLogoHover = () => {
    setLogoHover(true);
  };

  const handleLogoHoverEnd = () => {
    setLogoHover(false);
  };

  const handleLogoClick = () => {
    setLogoClick(true);
    setTimeout(() => {
      setLogoClick(false);
    }, 200);
  };

  return (
    <nav className="w-48 min-h-screen bg-secondary border-r border-gray-300" style={{ backgroundColor: 'rgba(61, 30, 142, 0.91)' }}>
      <div className="flex flex-col justify-between pl-5 h-screen sticky top-0">
        <ul>
          <li className="mb-8">
            <Link to="/" onClick={handleLogoClick}>
              <div
                className={`flex justify-center items-center mb-8 logo-container ${
                  logoClick ? "animate-scale-click" : ""
                }`}
              >
                <img
                  src="./logo.png"
                  alt="logo"
                  className={`h-30 p-5 logo-img ${
                    logoHover ? "animate-zoom-in" : ""
                  }`}
                  onMouseEnter={handleLogoHover}
                  onMouseLeave={handleLogoHoverEnd}
                />
              </div>
            </Link>
          </li>
          <li>
            <NavItem to="/">
              <AiOutlineHome />
              <span>Home</span>
            </NavItem>
          </li>
          <li>
            <NavItem to="/movies">
              <BiMoviePlay />
              <span>Movies</span>
            </NavItem>
          </li>
          <li>
            <NavItem to="/actors">
              <FaUserNinja />
              <span>Actors</span>
            </NavItem>
          </li>
        </ul>
        <div className="flex flex-col items-start pb-5">
          <span className="font-semibold text-white text-xl">Admin</span>
          <button
            onClick={handleLogout}
            className="flex items-center text-dark-subtle text-sm hover:text-white transition space-x-1"
          >
            <FiLogOut />
            <span>Log out</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

const NavItem = ({ children, to }) => {
  const commonClasses =
    " flex items-center text-lg space-x-2 p-2 hover:opacity-80";
  return (
    <NavLink
      className={({ isActive }) =>
        (isActive ? "text-white" : "text-gray-400") + commonClasses
      }
      to={to}
    >
      {children}
    </NavLink>
  );
};
