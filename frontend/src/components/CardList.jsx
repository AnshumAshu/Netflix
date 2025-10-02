import React, { useEffect, useState } from "react";
//import cardimage from "../assets/cardimg.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router-dom";	

const CardList = ({ title, category }) => {
	const [data, setdata] = useState([]);
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
		`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`,
		options
	)
		.then((res) => res.json())
		.then((res) => setdata(res.results))
		.catch((err) => console.error(err));
	}, []);

	

	return (
		<div className="text-white md:px-4">
			<h2 className="pt-10 pb-5 text-lg font-medium">{title}</h2>

			<Swiper
				slidesPerView={"auto"} // ✅ fixed typo
				spaceBetween={10}
				className="mySwiper"
			>
				{data.map((item, index) => (
					<SwiperSlide key={index} className="max-w-72 flex flex-col items-center">
						<Link to={`/movie/${item.id}`}>
						<img
							src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`} 
							alt={item.title || "Movie poster"}
							className="h-44 w-full object-cover rounded-lg"
						/>
						<p className="text-center pt-2 text-sm">
							{item.original_title || "A very good movie"}
						</p>
						</Link>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default CardList;
