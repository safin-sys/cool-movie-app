import React, { useEffect, useState } from 'react';
import ratingIcon from '../img/icons/rating.svg';
import play from '../img/icons/play.svg';

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
                    {movie.poster_path ? <img className="md-hero__info__poster" src={'https://image.tmdb.org/t/p/w200' + movie.poster_path} alt={movie.original_title + 'Poster'} /> : null}

                    <div className="md-hero__info__overview">
                        <h1 className="md-hero__info__overview__title">{movie.original_title || movie.original_name}</h1>
                        <p className="md-hero__info__overview__tagline">{movie.tagline}</p>
                        
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
                            <p>{movie.vote_average} <span>({movie.vote_count} votes)</span></p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="summary">
                <h3>Plot Summary</h3>
                <p>{movie.overview}</p>
            </div>
            <div className="md-details">
                <MovieVideos id={match.params.id} type={match.params.type} />
                <MovieCasts id={match.params.id} type={match.params.type} />
            </div>
        </React.Fragment>
    )
}

export default MovieDetails;

function MovieVideos({id, type}) {
    const url = `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}`;

    const [vids, setVids] = useState([]);

    useEffect(() => {
        async function getVids() {
            const res = await fetch(url);
            const data = await res.json();

            setVids(data.results);
        };

        getVids();
    }, [url])
    return (
        <div className="videos">
            <h3>Videos</h3>
            <div className="md-vid">
                {vids.map((vid, i) => {
                    return (
                        <div className="vid-card" key={i}>
                            <div className="thumbnail"
                            style={{
                                backgroundImage: `linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(0,212,255,0) 60%),url(https://img.youtube.com/vi/${vid.key}/0.jpg)`
                            }}></div>
                
                            <a href={`https://youtu.be/${vid.key}`} target="_blank" rel="noreferrer"><img src={play} alt="Play Button"/></a>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

function MovieCasts(id, type) {
    return (
        <div className="casts">
            <h3>Casts</h3>
            <p>Coming Soon...</p>
        </div>
    )
}