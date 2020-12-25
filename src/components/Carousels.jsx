import React, { useState, useEffect } from 'react';
import Movie from './Movie';
import Carousel from 'react-elastic-carousel';

function Carousels() {
    const [nowPlayingMvi, setNowPlayingMvi] = useState([]);
    const [popularMvi, setPopularMvi] = useState([]);
    const [popularTv, setPopularTv] = useState([]);
    
    const nowPlayingMviUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}`;

    const popularMviUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}`;

    const popularTvUrl = `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.REACT_APP_API_KEY}`;
    
    useEffect(() => {
        async function fetchNowPlayingMvi() {
            const res = await fetch(nowPlayingMviUrl);
            const data = await res.json();
            return data;
        };

        async function fetchPopularMvi() {
            const res = await fetch(popularMviUrl);
            const data = await res.json();
            return data;
        };

        async function fetchPopularTv() {
            const res = await fetch(popularTvUrl);
            const data = await res.json();
            return data;
        };

        fetchNowPlayingMvi().then(data => setNowPlayingMvi(data.results));
        fetchPopularMvi().then(data => setPopularMvi(data.results));
        fetchPopularTv().then(data => setPopularTv(data.results));
    }, [popularTvUrl, popularMviUrl, nowPlayingMviUrl]);

    const breakPoints = [
        {width: 290, itemsToShow: 1, itemsToScroll: 1, pagination: false},
        {width: 320, itemsToShow: 2, itemsToScroll: 2, pagination: false},
        {width: 700, itemsToShow: 3, itemsToScroll: 3, pagination: false},
        {width: 800, itemsToShow: 4, itemsToScroll: 4, pagination: false},
        {width: 1300, itemsToShow: 5, itemsToScroll: 5, pagination: false},
        {width: 1900, itemsToShow: 6, itemsToScroll: 6, pagination: false}
    ];

    return (
        <React.Fragment>
            <div className="carousel-container">
                <h3 className="section-header" id="now-playing">Now Playing</h3>
                <Carousel className="carousel" breakPoints={breakPoints}>
                    {nowPlayingMvi.map((movie, index) => {
                        return <Movie key={index} movie={movie} />
                    })}
                </Carousel>
            </div>

            <div className="carousel-container">
                <h3 className="section-header" id="movies">Popular Movies</h3>
                <Carousel className="carousel" breakPoints={breakPoints}>
                    {popularMvi.map((movie, index) => {
                        return <Movie key={index} movie={movie} />
                    })}
                </Carousel>
            </div>

            <div className="carousel-container">
                <h3 className="section-header" id="tv-shows">Popular TV Shows</h3>
                <Carousel className="carousel" breakPoints={breakPoints}>
                    {popularTv.map((movie, index) => {
                        return <Movie key={index} movie={movie} />
                    })}
                </Carousel>
            </div>
        </React.Fragment>
    )
}

export default Carousels;
