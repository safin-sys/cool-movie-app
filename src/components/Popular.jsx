import React, { useState, useEffect } from 'react';
import Movie from './Movie';

function Popular() {
    const [movies, setMovies] = useState([]);
    const popularity = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${process.env.REACT_APP_API_KEY}`;

    useEffect(() => {
        fetch(popularity)
        .then(res => res.json())
        .then(data => {
        setMovies(data.results);
        console.log(data.results);
        });
    }, [popularity]);

    return (
        <div className="popular">
            {movies.map((movie, index) => {
                return <Movie key={index} movie={movie} />
            })}
        </div>
    )
}

export default Popular
