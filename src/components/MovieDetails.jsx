import React, { useEffect, useState } from 'react';
import ratingIcon from '../img/icons/rating.svg'

function MovieDetails({ match }) {
    const [movie, setMovie] = useState({});

    const url = `https://api.themoviedb.org/3/${match.params.type}/${match.params.id}?api_key=${process.env.REACT_APP_API_KEY}`;

    const imgUrl = 'https://image.tmdb.org/t/p/original';

    useEffect(()=>{
        async function getMovieData() {
            const res = await fetch(url);
            const data = await res.json();

            setMovie(data);
        };

        getMovieData();
    }, [url]);
    return (
        <React.Fragment>
            <div className="md-hero">
                <div className="md-hero__img">
                    {movie.backdrop_path ? <img className="hero-img" src={imgUrl + movie.backdrop_path} alt={movie.original_title + 'Backdrop'} /> : null}
                </div>

                <div className="md-hero__info">
                    {movie.poster_path ? <img className="md-hero__info__poster" src={imgUrl + movie.poster_path} alt={movie.original_title + 'Poster'} /> : null}

                    <div className="md-hero__info__overview">
                        <h1 className="md-hero__info__overview__title">{movie.original_title || movie.original_name}</h1>
                        
                        <div className="md-hero__info__overview__detail">
                            <p className="md-hero__info__overview__detail__run_time">{movie.runtime} min </p>
                            <p>|</p>
                            <p className="md-hero__info__overview__detail__genre">{
                                movie.genres ? movie.genres.map((genre, i) => {
                                    if(i < 1) {
                                        return genre.name + ' ';
                                    };
                                    return '';
                                }) : null
                            }</p>
                        </div>

                        <div className="md-hero__info__overview__rating">
                            <img src={ratingIcon} alt="Rating Icon"/>
                            <p>{movie.vote_average}</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="summary">
                <h3>Plot Summary</h3>
                <p>{movie.overview}</p>
            </div>
        </React.Fragment>
    )
}

export default MovieDetails;