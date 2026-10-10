import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  // Get ?query=something from URL
  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    if (query) fetchSearchResults(query);
  }, [query]);

  const fetchSearchResults = async (query) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${query}`
      );
      const data = await res.json();
      setResults(data.results || []);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  // 👇 When user clicks a movie
  const handleMovieClick = (item) => {
    if (item.media_type === "movie") {
      navigate(`/movie/${item.id}`);
    } else if (item.media_type === "tv") {
      navigate(`/movie/${item.id}`);
    } else {
      // Optional: handle person or unknown type
      console.log("Unsupported media type:", item.media_type);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">
        Search results for "{query}"
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {results.map((item) => (
          <div
            key={item.id}
            onClick={() => handleMovieClick(item)}
            className="bg-[#181818] rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
          >
            <img
              src={
                item.poster_path
                  ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                  : "https://via.placeholder.com/500x750?text=No+Image"
              }
              alt={item.title || item.name}
              className="w-full h-72 object-cover"
            />
            <div className="p-2">
              <p className="text-sm font-semibold truncate">
                {item.title || item.name}
              </p>
              <p className="text-xs text-gray-400 uppercase">
                {item.media_type}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
