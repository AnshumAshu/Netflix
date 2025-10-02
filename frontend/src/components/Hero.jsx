import React, { useState, useEffect } from "react";
//import herobg from "../assets/herobg.jpg";
import { Bookmark } from "lucide-react";
import { Play } from "lucide-react";
import { Link } from "react-router";

const Hero = () => {
	const [MoveIcon,setmovie]=useState(null);
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
		"https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
		options
	)
		.then((res) => res.json())
		.then((res) => {
		if (res.results.length > 0) {
			const randomIndex = Math.floor(Math.random() * res.results.length);
			setmovie(res.results[randomIndex]);
		}
		})
		.catch((err) => console.error(err));
	}, []);


	// if(!movie){
	// 	return <div>Loading...</div>
	// }
	return (
		<div className="text-white relative">
			<img
				src={`https://image.tmdb.org/t/p/original${MoveIcon?.backdrop_path}`}
				alt="bg-img"
				className="w-full rounded-2xl h-[480px]"
			/>
			<div className="flex space-x-2 md:space-x-4 absolute bottom-3 left-4 md:bottom-8 md:left-10">
				<button className="flex justify-center items-center bg-white  hover:bg-gray-200 text-[#e50914] py-3 px-4 rounded-full cursor-pointer text-sm md:text-base">
					<Bookmark className="mr-2 w-4 h-5 md:w-5 md:h-5" /> Save for
					Later
				</button>
				<Link to={`/movie/${MoveIcon?.id}`}>
				<button className="flex justify-center items-center bg-[#e50914]  text-white py-3 px-4 rounded-full cursor-pointer text-sm md:text-base">
					<Play className="mr-2 w-4 h-5 md:w-5 md:h-5" /> Watch Now
				</button>
				</Link>
			</div>
		</div>
	);
};

export default Hero;
