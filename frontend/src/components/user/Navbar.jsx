import React, { useEffect } from "react";
import { BsFillSunFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, useTheme } from "../../hooks";
import Container from "../Container";
import AppSearchForm from "../form/AppSearchForm";

export default function Navbar() {
  const { toggleTheme } = useTheme();
  const { authInfo, handleLogout } = useAuth();
  const { isLoggedIn } = authInfo;
  const navigate = useNavigate();

  const handleSearchSubmit = (query) => {
    navigate("/movie/search?title=" + query);
  };

  return (
    <div
      className="bg-secondary shadow-sm shadow-gray-500"
      style={{ backgroundColor: "rgba(70, 3, 99)" }}
    >
      <Container className="p-1">
        <div className="flex justify-between items-center">
          <Link to="/">
            <img
              src="./logo.png"
              alt=""
              className="sm:h-20 h-13 logo transform transition-all duration-200 hover:scale-110"
            />
          </Link>
          <Link
            to="/"
            className="text-white font-extrabold text-2xl tracking-wide uppercase hover:text-gray-300"
          >
            <span className="animate-movie">Movie</span>
            <span className="text-yellow-500 animate-box">Box</span>
          </Link>

          <ul className="flex items-center sm:space-x-4 space-x-2">
          <Link
              className="text-white font-semibold text-lg mr-4 hover:text-yellow-500"
              to="/all-movies"
            >All Movies/Series
            </Link>
            <li>
              <button
                onClick={toggleTheme}
                className="dark:bg-white bg-dark-subtle p-1 rounded sm:text-2xl text-lg"
              >
                <BsFillSunFill className="text-secondary" size={24} />
              </button>
            </li>
            <li>
              <AppSearchForm
                placeholder="search..."
                inputClassName="border-dark-subtle text-white focus:border-white sm:w-auto w-40 sm:text-lg"
                onSubmit={handleSearchSubmit}
              />
            </li>
            <li>
              {isLoggedIn ? (
                <>
                  <Link
                    to="/profile"
                    className="text-white font-semibold text-lg mr-2 flex items-center"
                  >
                    <CgProfile className="mr-1" size={20} /> Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-white font-semibold text-lg"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <Link
                  className="text-white font-semibold text-lg"
                  to="/auth/signin"
                >
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </Container>
    </div>
  );
}

export function Profile() {
  const { authInfo } = useAuth();
  const { isLoggedIn } = authInfo;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/auth/signin");
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) {
    return null; // or you can render a loading spinner
  }

  return (
    <div>
      {/* Render the profile content */}
      <h1>Profile Page</h1>
      {/* ... */}
    </div>
  );
}