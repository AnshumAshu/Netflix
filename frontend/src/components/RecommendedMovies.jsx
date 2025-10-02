import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const RecommendedMovies = ({movieTitles}) => {
    const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ODUyMmZlZWNmYjVhODAwNTdlNTQ4NTc2ZjlhYmQ4YyIsIm5iZiI6MTc1OTI0MTIwNy45MTIsInN1YiI6IjY4ZGJlM2Y3MTU1ZDA5ZmNkZDJkZjI1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kXp8UsCn_UwPCdW7BYWUedrjYZ_SmO-RESJ_vnCu44U'
  },
};

  const [movies,setMovies]=useState([]);
  const [loading,setLoading]=useState(true);

  const fetchMovie=async(title)=>{
    const encodedTitle=encodeURIComponent(title);
    const uri=`https://api.themoviedb.org/3/search/movie?query=${encodedTitle}&include_adult=false&language=en-US&page=1`;
    try{
        const res = await fetch(uri,options)
        const data=await res.json();
        return data.results?.[0] || null;
    }catch(error){
        console.log("error fetching movie",error);
        return null;
    }
  };
  useEffect(()=>{
    const lodeMovies=async()=>{
        setLoading(true);
        const result =await Promise.all(movieTitles.map((title)=>fetchMovie(title)));
        setMovies(result.filter(Boolean));
        setLoading(false);

    };
    if(movieTitles?.length){
        lodeMovies();
    }
  },[movieTitles]);
  if(loading){
    return <p>Loading...</p>
  }
  console.log(movies)
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {movies.map((movie) => (
        <Link
          to={`/movie/${movie.id}`}
          key={movie.id}
          className="bg-[#232323] rounded-lg overflow-hidden"
        >
          {movie.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              className="w-full h-48 object-cover"
            />
          ) : (
            <>No Image</>
          )}

          <div className="p-2">
            <h3 className="text-sm font-semibold text-white truncate">
              {movie.title}
            </h3>
            <p className="text-xs text-gray-400">
              {movie.release_date ? movie.release_date.slice(0, 4) : "N/A"}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RecommendedMovies