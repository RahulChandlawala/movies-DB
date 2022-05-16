import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { API_ENDPOINT } from "./context";
import Movies from "./Movies";

const SingleMovie = () => {
	const { id } = useParams();
	const [movie, setmovie] = useState({});
	const [loading, setLoading] = useState(true);
	const [error, seterror] = useState({ show: false, msg: "" });

	const fetchMovies = async (url) => {
		const resp = await fetch(url);
		const data = await resp.json();
		console.log(data);
		if (data.Response === "False") {
			seterror({ show: true, msg: data.Error });
			setLoading(false);
		} else {
			setLoading(false);
			setmovie(data);
		}
	};
	useEffect(() => {
		fetchMovies(`${API_ENDPOINT}&i=${id}`);
	}, [id]);

	if (loading) {
		return <div className="loading"></div>;
	}
	if (error.show) {
		return (
			<div className="page-error">
				<h1>{error.msg}</h1>
				<Link to="/" className="btn">
					Back to movies
				</Link>
			</div>
		);
	}

	return (
		<section className="single-movie">
			<img src={movie.Poster} alt={movie.Title} />
			<div className="sigle-movie-info">
				<h2>{movie.Title}</h2>
				<p>{movie.Plot}</p>
				<h4>Year : {movie.Year}</h4>
				<h4>Rated : {movie.Rated}</h4>
				<h4>Released : {movie.Released}</h4>
				<Link to="/" className="btn">
					Back to movies
				</Link>
			</div>
		</section>
	);
};

export default SingleMovie;
