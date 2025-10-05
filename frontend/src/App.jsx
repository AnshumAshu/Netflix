import React, { useEffect } from "react";
import Navbar from "./components/navbar";
import Homepage from "./pages/Homepage";
import { Routes, Route } from "react-router-dom";  
import Moviepage from "./pages/Moviepage";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";
import useAuthStore from "./store/authStore";
import AIRecommendations from "./pages/AIRecommendations";
import Upcoming from "./pages/Upcoming";
import NewAndPopular from "./pages/NewAndPopular";
import TVShows  from "./pages/TVShows";
import TrendingMovies2  from "./pages/TrendingMovies2";
import TrendingAnime  from "./pages/TrendingAnime";
import TrendingGames  from "./pages/TrendingGames";
import SearchResults from "./pages/SearchResults";

const App = () => {
  const {fetchUser,fetchingUser}= useAuthStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  if (fetchingUser) {
    return <p>Loading...</p>; // or a spinner
  } 

  return (
    <div>
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/movie/:id" element={<Moviepage />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/ai-recommendations" element={<AIRecommendations />} />
        <Route path="/Upcoming" element={<Upcoming />}/>
        <Route path="/NewAndPopular" element={<NewAndPopular />}/>
        <Route path="/TVShows" element={<TVShows  />}/>
        <Route path="/TrendingMovies2" element={<TrendingMovies2  />}/>
        <Route path="/anime/:id" element={<TrendingAnime  />}/>
        <Route path="/TrendingGames" element={<TrendingGames  />}/>
        <Route path="/search" element={<SearchResults />} />
      </Routes>
    </div>
  );
};

export default App;
