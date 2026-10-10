
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router-dom";

const CardList = ({ title, category }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const token = import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN;

        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`TMDB error: ${response.status}`);
        }

        const data = await response.json();
        setMovies(data.results || []);
      } catch (error) {
        console.error(`Error fetching ${title}:`, error);
      }
    };

    fetchMovies();
  }, [title, category]);

  return (
    <section className="my-8 text-white">
      <h2 className="mb-4 text-xl font-semibold">{title}</h2>

      <Swiper slidesPerView="auto" spaceBetween={12}>
        {movies.map((movie) => (
          <SwiperSlide
            key={movie.id}
            className="!w-36 sm:!w-44 md:!w-52"
          >
            <Link to={`/movie/${movie.id}`}>
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "/cardimg.jpg"
                }
                alt={movie.title || "Movie poster"}
                className="h-52 w-full rounded-lg object-cover sm:h-64"
              />

              <p className="mt-2 text-sm">
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
