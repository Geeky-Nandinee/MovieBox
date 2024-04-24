import React, { useState, useEffect } from 'react';
import { getAllMovies } from '../../api/movie';
import Container from '../Container';
import MovieGrid from './MovieGrid';

const AllMovies = ({ isDarkMode }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('');
  const [filterBy, setFilterBy] = useState('');

  const handleFilterChange = (e) => {
    const genre = e.target.value;
    if (genre) {
      setFilterBy({ genres: genre });
    } else {
      setFilterBy('');
    }
  };

  useEffect(() => {
    const fetchMoviesData = async () => {
      try {
        const moviesData = await getAllMovies(sortBy, filterBy);
        setMovies(moviesData);
        setLoading(false);
      } catch (error) {
        setError('Error fetching movies. Please try again later.');
        setLoading(false);
      }
    };

    fetchMoviesData();
  }, [sortBy, filterBy]);

  const handleSortChange = (e) => {
    const sortField = e.target.value;
    const fieldMapping = {
      'title': 'title',
      'releaseDate': 'releaseDate',
      'rating': 'rating'
    };
    setSortBy(fieldMapping[sortField] || '');
  };

  const gradientBgClass = isDarkMode ? 'gradient-bg-dark' : 'gradient-bg-light';

  return (
    <div className={`${gradientBgClass} min-h-screen`}>
      <Container className="px-4 py-8">
        <h2 className="text-3xl font-bold text-center text-yellow-500 mb-8">Discover Movies</h2>
        <div className="flex justify-center items-center mb-8">
          <label htmlFor="sort" className="mr-4 font-semibold text-yellow-500">Sort By:</label>
          <select id="sort" value={sortBy} onChange={handleSortChange} className="border rounded-md py-2 px-4 bg-purple-800 shadow-md text-white">
            <option value="">-- Sort By --</option>
            <option value="title">Title</option>
            <option value="releaseDate">Release Date</option>
            <option value="rating">Rating</option>
          </select>

          <select id="filter" value={filterBy} onChange={handleFilterChange} className="border rounded-md py-2 px-4 bg-purple-800 shadow-md text-white">
            <option value="">-- Filter By Genre --</option>
            <option value="Action">Action</option>
            <option value="Adventure">Adventure</option>
            <option value="Animation">Animation</option>
            <option value="Biography">Biography</option>
            <option value="Comedy">Comedy</option>
            <option value="Crime">Crime</option>
            <option value="Documentary">Documentary</option>
            <option value="Drama">Drama</option>
            <option value="Family">Family</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Fiction">Fiction</option>
            <option value="Film-Noir">Film-Noir</option>
            <option value="Game Show">Game Show</option>
            <option value="History">History</option>
            <option value="Horror">Horror</option>
            <option value="Music">Music</option>
            <option value="Musical">Musical</option>
            <option value="Mystery">Mystery</option>
            <option value="News">News</option>
            <option value="Reality TV">Reality TV</option>
            <option value="Romance">Romance</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Superhero">Superhero</option>
            <option value="Sport">Sport</option>
            <option value="Talk Show">Talk Show</option>
            <option value="Thriller">Thriller</option>
            <option value="War">War</option>
            <option value="Western">Western</option>
          </select>

        </div>
        {error && <div className="text-red-600 text-center mb-8">{error}</div>}
        {loading ? (
          <div className="flex justify-center items-center h-64">Loading...</div>
        ) : movies.length > 0 ? (
          <MovieGrid movies={movies} isDarkMode={isDarkMode} />
        ) : (
          <div className="text-center text-gray-700">No movies found</div>
        )}
      </Container>
    </div>
  );
};

export default AllMovies;
