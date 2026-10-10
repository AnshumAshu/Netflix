
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router-dom";

const CardList = ({ title, category }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }

        const data = await response.json();
        setMovies(data.results || []);
      } catch (error) {
        console.error(`Error fetching ${title}:`, error);
      }
    };

    fetchMovies();
  }, [category, title]);

  return (
    <section className="text-white mt-8">
      <h2 className="text-lg font-medium pb-5">{title}</h2>

      <Swiper slidesPerView="auto" spaceBetween={10}>
        {movies.map((movie) => (
          <SwiperSlide key={movie.id} className="!w-48">
            <Link to={`/movie/${movie.id}`}>
              <img
                src={
                  movie.backdrop_path
                    ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
                    : "/fallback.jpg"
                }
                alt={movie.title || "Movie"}
                className="w-full h-44 object-cover rounded-lg"
              />
              <p className="text-sm text-center pt-2">
                {movie.title || "Untitled"}
              </p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default CardList;