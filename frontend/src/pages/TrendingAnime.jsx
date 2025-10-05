import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const TrendingAnime = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);

  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/anime/${id}`)
      .then(res => res.json())
      .then(data => setAnime(data.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!anime) return <p className="text-white">Loading...</p>;

  return (
    <div className="text-white p-4">
      <h1 className="text-3xl font-bold mb-4">{anime.title}</h1>
      <img
        src={anime.images.jpg.large_image_url}
        alt={anime.title}
        className="w-full max-w-lg rounded-xl mb-4"
      />
      <p>{anime.synopsis}</p>
    </div>
  );
};

export default TrendingAnime;
