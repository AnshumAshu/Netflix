import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { Bookmark, Play } from "lucide-react";

const TVShows = () => {
  const [tvShows, setTvShows] = useState([]);
  const [TVshow, setTVshow] = useState(null);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ODUyMmZlZWNmYjVhODAwNTdlNTQ4NTc2ZjlhYmQ4YyIsIm5iZiI6MTc1OTI0MTIwNy45MTIsInN1YiI6IjY4ZGJlM2Y3MTU1ZDA5ZmNkZDJkZjI1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kXp8UsCn_UwPCdW7BYWUedrjYZ_SmO-RESJ_vnCu44U",
    },
  };

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1",
      options
    )
      .then((res) => res.json())
      .then((res) => {
        setTvShows(res.results);
        if (res.results.length > 0) {
          const randomIndex = Math.floor(Math.random() * res.results.length);
          setTVshow(res.results[randomIndex]);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="text-white md:px-4">
      {/* Hero Section */}
      {TVshow && (
        <div className="relative mb-10 mt-5">
          <img
            src={`https://image.tmdb.org/t/p/original/${TVshow.backdrop_path}`}
            alt={TVshow.name || "Hero Show"}
            className="w-full h-[480px] object-cover rounded-2xl"
          />
          <div className="flex space-x-2 md:space-x-4 absolute bottom-3 left-4 md:bottom-8 md:left-10">
            <button className="flex justify-center items-center bg-white hover:bg-gray-200 text-[#e50914] py-3 px-4 rounded-full cursor-pointer text-sm md:text-base">
              <Bookmark className="mr-2 w-4 h-5 md:w-5 md:h-5" /> Save for Later
            </button>
            <Link to={`/tv/${TVshow.id}`}>
              <button className="flex justify-center items-center bg-[#e50914] text-white py-3 px-4 rounded-full cursor-pointer text-sm md:text-base">
                <Play className="mr-2 w-4 h-5 md:w-5 md:h-5" /> Watch Now
              </button>
            </Link>
          </div>
        </div>
      )}

      {/* TV Shows Swiper */}
      <h2 className="pt-10 pb-5 text-lg font-medium">Popular TV Shows</h2>
      <Swiper slidesPerView={"auto"} spaceBetween={10} className="mySwiper">
        {tvShows.map((show) => (
          <SwiperSlide
            key={show.id}
            className="max-w-72 flex flex-col items-center"
          >
            <Link to={`/tv/${show.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${show.backdrop_path}`}
                alt={show.name || "TV Show poster"}
                className="h-44 w-full object-cover rounded-lg"
              />
              <p className="text-center pt-2 text-sm">
                {show.name || "Untitled"}
              </p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      <Footer />
    </div>
  );
};

export default TVShows;
