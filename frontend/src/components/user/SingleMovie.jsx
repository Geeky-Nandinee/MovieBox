import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { getSingleMovie } from "../../api/movie";
import { useAuth, useNotification } from "../../hooks";
import { convertReviewCount } from "../../utils/helper";
import Container from "../Container";
import CustomButtonLink from "../CustomButtonLink";
import AddRatingModal from "../models/AddRatingModal";
import ProfileModal from "../models/ProfileModal";
import RatingStar from "../RatingStar";
import RelatedMovies from "../RelatedMovies";

const convertDate = (date = "") => {
  return date.split("T")[0];
};

const addMovieToFavoriteList = async (userId, movieId) => {
  try {
    const response = await fetch(`/api/users/${userId}/favoritemovies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ movieId }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

const addMovieToWatchlist = async (userId, movieId) => {
  try {
    const response = await fetch(`/api/users/${userId}/watchlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ movieId }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export default function SingleMovie() {
  const [ready, setReady] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [movie, setMovie] = useState({});
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState({});

  const { movieId } = useParams();
  const { updateNotification } = useNotification();
  const { authInfo } = useAuth();
  const { isLoggedIn } = authInfo;

  const navigate = useNavigate();

  const fetchMovie = useCallback(async () => {
    const { error, movie } = await getSingleMovie(movieId);
    if (error) return updateNotification("error", error);
  
    setReady(true);
    setMovie(movie);
  }, [movieId, updateNotification]);

  const handleOnRateMovie = () => {
    if (!isLoggedIn) return navigate("/auth/signin");
    setShowRatingModal(true);
  };

  const hideRatingModal = () => {
    setShowRatingModal(false);
  };

  const handleProfileClick = (profile) => {
    setSelectedProfile(profile);
    setShowProfileModal(true);
  };

  const hideProfileModal = () => {
    setShowProfileModal(false);
  };

  const handleOnRatingSuccess = (reviews) => {
    setMovie({ ...movie, reviews: { ...reviews } });
  };

  const handleAddToFavoriteList = async () => {
    if (!isLoggedIn) return navigate("/auth/signin");
  
    try {
      const userId = authInfo.user ? authInfo.user.id : null; // Added null check
  
      if (!userId) {
        updateNotification("error", "User ID not found");
        return;
      }
  
      const response = await addMovieToFavoriteList(userId, movieId);
  
      if (response.success) {
        updateNotification("success", "Movie added to your favorite list");
      } else {
        updateNotification("error", response.error);
      }
    } catch (error) {
      updateNotification("error", error.message);
    }
  };
  
  const handleAddToWatchlist = async () => {
    if (!isLoggedIn) return navigate("/auth/signin");
  
    try {
      const userId = authInfo.user ? authInfo.user.id : null; // Added null check
  
      if (!userId) {
        updateNotification("error", "User ID not found");
        return;
      }
  
      const response = await addMovieToWatchlist(userId, movieId);
  
      if (response.success) {
        updateNotification("success", "Movie added to your watchlist");
      } else {
        updateNotification("error", response.error);
      }
    } catch (error) {
      updateNotification("error", error.message);
    }
  };

  useEffect(() => {
    if (movieId) fetchMovie();
  }, [movieId, fetchMovie]);

  if (!ready)
    return (
      <div className="h-screen flex justify-center items-center dark:bg-primary bg-white">
        <p className="text-light-subtle dark:text-dark-subtle animate-pulse">
          Please wait
        </p>
      </div>
    );

  const {
    id,
    trailer,
    poster,
    title,
    storyLine,
    language,
    releseDate,
    type,
    director = {},
    reviews = {},
    writers = [],
    cast = [],
    genres = [],
  } = movie;

  return (
    <div className="dark:bg-primary bg-white min-h-screen pb-10">
      <Container className="xl:px-0 px-2">
        <video poster={poster} controls src={trailer}></video>
        <div className="flex justify-between">
          <h1 className="xl:text-4xl lg:text-3xl text-2xl  text-highlight dark:text-highlight-dark font-semibold py-3">
            {title}
          </h1>
          <div className="flex flex-col items-end">
            <RatingStar rating={reviews.ratingAvg} />
            <CustomButtonLink
              label={convertReviewCount(reviews.reviewCount) + ' Reviews'}
              onClick={() => navigate('/movie/reviews/' + id)}
            />
            <CustomButtonLink
              label="Rate the movie"
              onClick={handleOnRateMovie}
            />
            <CustomButtonLink
              label="Add to Favorite List"
              onClick={handleAddToFavoriteList}
            />
            <CustomButtonLink
              label="Add to Watchlist"
              onClick={handleAddToWatchlist}
            />
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-light-subtle dark:text-dark-subtle">{storyLine}</p>
          <ListWithLabel label="Director:">
            <CustomButtonLink
              onClick={() => handleProfileClick(director)}
              label={director.name}
            />
          </ListWithLabel>

          <ListWithLabel label="Writers:">
            {writers.map((w) => (
              <CustomButtonLink
                onClick={() => handleProfileClick(w)}
                key={w.id}
                label={w.name}
              />
            ))}
          </ListWithLabel>

          <ListWithLabel label="Cast:">
            {cast.map(({ id, profile, leadActor }) => {
              return leadActor ? (
                <CustomButtonLink
                  onClick={() => handleProfileClick(profile)}
                  label={profile.name}
                  key={id}
                />
              ) : null;
            })}
          </ListWithLabel>

          <ListWithLabel label="Language:">
            <CustomButtonLink label={language} clickable={false} />
          </ListWithLabel>

          <ListWithLabel label="Release Date:">
            <CustomButtonLink
              label={convertDate(releseDate)}
              clickable={false}
            />
          </ListWithLabel>

          <ListWithLabel label="Cast:">
            {genres.map((g) => (
              <CustomButtonLink label={g} key={g} clickable={false} />
            ))}
          </ListWithLabel>

          <ListWithLabel label="Type:">
            <CustomButtonLink label={type} clickable={false} />
          </ListWithLabel>

          <CastProfiles cast={cast} />
          <RelatedMovies movieId={movieId} />
        </div>
      </Container>

      <ProfileModal
        visible={showProfileModal}
        onClose={hideProfileModal}
        profileId={selectedProfile.id}
      />

      <AddRatingModal
        visible={showRatingModal}
        onClose={hideRatingModal}
        onSuccess={handleOnRatingSuccess}
      />
    </div>
  );
}

const ListWithLabel = ({ children, label }) => {
  return (
    <div className="flex space-x-2">
      <p className="text-light-subtle dark:text-dark-subtle font-semibold">
        {label}
      </p>
      {children}
    </div>
  );
};

const CastProfiles = ({ cast, onProfileClick }) => {
  return (
    <div className="">
      <h1 className="text-light-subtle dark:text-dark-subtle font-semibold text-2xl mb-2">
        Cast:
      </h1>
      <div className="flex flex-wrap space-x-4">
        {cast.map(({ id, profile, roleAs }) => {
          return (
            <div
              key={id}
              className="basis-28 flex flex-col items-center text-center mb-4"
            >
              <img
                className="w-24 h-24 aspect-square object-cover rounded-full"
                src={profile.avatar}
                alt=""
              />

              <CustomButtonLink label={profile.name} />
              <span className="text-light-subtle dark:text-dark-subtle text-sm">
                as
              </span>
              <p className="text-light-subtle dark:text-dark-subtle">
                {roleAs}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
