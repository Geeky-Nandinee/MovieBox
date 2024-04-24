import React from 'react';
import { Link } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';

const trimTitle = (text = "") => {
  if (text.length <= 20) return text;
  return text.substring(0, 20) + "..";
};

const MovieGrid = ({ movies, isDarkMode }) => {
  const gradientBgClass = isDarkMode ? 'gradient-bg-dark' : 'gradient-bg-light';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-6">
      {movies.map((movie) => (
        <Link
          key={movie.id}
          to={`/movie/${movie.id}`}
          className="hover:opacity-80"
        >
          <div
            className={`${gradientBgClass} shadow-lg rounded-lg overflow-hidden relative`}
          >
            <div className="gradient-overlay absolute inset-0 rounded-lg"></div>
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-32 sm:h-40 object-cover rounded-t-lg"
            />
            <div className="p-3 sm:p-4">
              <h3 className="text-base sm:text-lg font-semibold text-yellow-500">
                {trimTitle(movie.title)}
              </h3>
              <p className="text-xs text-yellow-500">{movie.genres.join(', ')}</p>
              {movie.reviews && movie.reviews.ratingAvg ? (
                <p className="text-highlight dark:text-highlight-dark flex items-center space-x-1">
                  <span>{movie.reviews.ratingAvg}</span>
                  <AiFillStar />
                </p>
              ) : (
                <p className="text-highlight dark:text-highlight-dark">No Ratings</p>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MovieGrid;