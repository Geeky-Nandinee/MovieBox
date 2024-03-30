import React from "react";
import Container from "./Container";
import HeroSlideshow from "./user/HeroSlideshow";
import NotVerified from "./user/NotVerified";
import TopRatedMovies from "./user/TopRatedMovies";
import TopRatedTVSeries from "./user/TopRatedTVSeries";
import TopRatedWebSeries from "./user/TopRatedWebSeries";

export default function Home({ isDarkMode }) {
  const gradientBgClass = isDarkMode ? "gradient-bg-dark" : "gradient-bg-light";

  return (
    <div className={`${gradientBgClass} min-h-screen`}>
      <Container className="px-2 xl:p-0">
        <NotVerified />
        {/* slider */}
        <HeroSlideshow />
        {/* Most rated movies */}
        <div className="space-y-3 py-8">
          <TopRatedMovies />
          <TopRatedWebSeries />
          <TopRatedTVSeries />
        </div>
      </Container>
    </div>
  );
}