import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const TrendingGames = () => {
  const [games, setGames] = useState([]);
  const [treandingGame, settreandingGame] = useState(null);

  useEffect(() => {
    const fetchTrendingGames = async () => {
      const token = 'YOUR_ACCESS_TOKEN';
      const clientId = 'YOUR_CLIENT_ID';

      try {
        const response = await fetch('https://api.igdb.com/v4/games', {
          method: 'POST',
          headers: {
            'Client-ID': clientId,
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: `fields id,name,cover.url; limit 10; sort popularity desc;`,
        });

        const data = await response.json();
        const filteredGames = data.filter(game => game.cover?.url);
        setGames(filteredGames);
        if (filteredGames.length > 0) settreandingGame(filteredGames[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTrendingGames();
  }, []);

  return (
    <div className="text-white md:px-4">
      {/* Hero */}
      {treandingGame && (
        <div className="relative mb-10 mt-5">
          <img
            src={`https:${treandingGame.cover.url}`}
            alt={treandingGame.name}
            className="w-full h-[480px] object-cover rounded-2xl"
          />
          <div className="flex space-x-2 md:space-x-4 absolute bottom-3 left-4 md:bottom-8 md:left-10">
            <button className="bg-white hover:bg-gray-200 text-[#e50914] py-3 px-4 rounded-full">
              Save for Later
            </button>
            <Link to={`/game/${treandingGame.id}`}>
              <button className="bg-[#e50914] text-white py-3 px-4 rounded-full">
                Play Now
              </button>
            </Link>
          </div>
        </div>
      )}

      {/* Swiper */}
      <h2 className="pt-10 pb-5 text-lg font-medium">Trending Games</h2>
      {games.length > 0 && (
        <Swiper slidesPerView={'auto'} spaceBetween={10}>
          {games.map(game => (
            <SwiperSlide key={game.id} className="max-w-72 flex flex-col items-center">
              <Link to={`/game/${game.id}`}>
                <img
                  src={`https:${game.cover.url}`}
                  alt={game.name}
                  className="h-44 w-full object-cover rounded-lg"
                />
                <p className="text-center pt-2 text-sm">{game.name}</p>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <Footer />
    </div>
  );
};

export default TrendingGames;
