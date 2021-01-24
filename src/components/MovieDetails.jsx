import React, { useEffect, useState } from 'react';
import ratingIcon from '../img/icons/rating.svg';
import play from '../img/icons/play.svg';
import noimg from '../img/img404.webp';
import Carousel from 'react-elastic-carousel';
import Movie from './Movie'

function MovieDetails({ match }) {
    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState({});

    const url = `https://api.themoviedb.org/3/${match.params.type}/${match.params.id}?api_key=${process.env.REACT_APP_API_KEY}`;

    function widthCalc() {
        const vw = window.innerWidth;
        if(vw > 1366) {
            return 'original';
        } else if(vw <= 1366 && vw > 720) {
            return 'w1280';
        } else if(vw <= 720 && vw > 300) {
            return 'w780';
        } else if (vw <= 300) {
            return 'w300';
        } else {
            return 'original';
        };
    };

    const imgUrl = 'https://image.tmdb.org/t/p/' + widthCalc();

    useEffect(()=>{
        async function getMovieData() {
            setLoading(true);
            const res = await fetch(url);
            const data = await res.json();
            
            setMovie(data);
            setLoading(false);
        };
        
        getMovieData();
        window.scrollTo(0, 0)
    }, [url]);
    return (
        <React.Fragment>
            {loading ? <div className="loading">
                <div className="logo">
                    <h1>COOL <br/> MOVIEAPP</h1>
                </div>
            </div> : null}
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
                            {movie.runtime ? <p className="md-hero__info__overview__detail__run_time">{movie.runtime} min |</p> : null}
                            <p className="md-hero__info__overview__detail__genre">{
                                movie.genres ? movie.genres.map((genre, i) => {
                                    if(i < 1) {
                                        return genre.name + ' ';
                                    };
                                    return '';
                                }) : null
                            } |</p>
                            <p className="year">{movie.release_date || movie.first_air_date}</p>
                        </div>

                        {movie ? <div className="md-hero__info__overview__rating">
                            <img src={ratingIcon} alt="Rating Icon"/>
                            <p>{movie.vote_average} <span>({movie.vote_count} votes)</span></p>
                        </div> : null}
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
            <div className="carousel-container">
                <h3 className="section-header">Similar Movies</h3>
                <Recommendation id={match.params.id} type={match.params.type} />
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
    }, [url]);

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

function MovieCasts({id, type}) {
    const url = `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}`;

    const [casts, setCasts] = useState([]);

    useEffect(() => {
        async function getCasts() {
            const res = await fetch(url);
            const data = await res.json();

            setCasts(data.cast.slice(0, 10));
        };

        getCasts();
    }, [url]);

    return (
        <div className="casts">
            <h3>Casts</h3>
            <div className="md-casts">{casts.map(cast => {
                return (
                    <div className="md-cast" key={cast.id}>
                        <div className="md-cast__img-container">
                            <img src={cast.profile_path ? `https://image.tmdb.org/t/p/w92${cast.profile_path}` : noimg} alt={cast.original_name}/>
                        </div>
                        <div className="md-cast__name">
                            <p className="on">{cast.original_name}</p>
                            <p className="cn">{cast.character}</p>
                        </div>
                    </div>
                );
            })}</div>
        </div>
    );
};

function Recommendation({id, type}) {
    const url = `https://api.themoviedb.org/3/${type}/${id}/similar?api_key=${process.env.REACT_APP_API_KEY}`;

    const [recs, setRecs] = useState([]);

    useEffect(() => {
        async function getRecs() {
            const res = await fetch(url);
            const data = await res.json();

            setRecs(data.results);
        };

        getRecs();
    }, [url])

    const breakPoints = [
        {width: 290, itemsToShow: 1, itemsToScroll: 1, pagination: false},
        {width: 320, itemsToShow: 2, itemsToScroll: 2, pagination: false},
        {width: 700, itemsToShow: 3, itemsToScroll: 3, pagination: false},
        {width: 800, itemsToShow: 4, itemsToScroll: 4, pagination: false},
        {width: 1300, itemsToShow: 5, itemsToScroll: 5, pagination: false},
        {width: 1900, itemsToShow: 6, itemsToScroll: 6, pagination: false}
    ];

    return (
        <Carousel breakPoints={breakPoints}>
            {recs.map((rec, i) => {
                return <Movie movie={rec} key={i} />
            })}
        </Carousel>
    )
}