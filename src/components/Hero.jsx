import React, { useState, useEffect } from 'react';
import play from '../img/icons/play.svg';

function Hero() {
    const [trend, setTrend] = useState();
    const [vid, setVid] = useState();

    const trending = `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_API_KEY}`;

    const videos = `https://api.themoviedb.org/3/movie/${trend ? trend[0].id : null}/videos?api_key=${process.env.REACT_APP_API_KEY}`;

    useEffect(() => {
        async function fetchTrending() {
            const res = await fetch(trending);
            const data = await res.json();
            return data;
        };

        fetchTrending().then(data => setTrend(data.results));

        if (trend) {
            async function fetchVideoUrl() {
                const res = await fetch(videos);
                const data = await res.json();
                return data;
            };
            fetchVideoUrl().then(data => setVid(data.results[0]));
        };
    }, [trending, trend, videos])

    return (
        <div className="hero">
            <img className="hero-img" src={trend ? 'https://image.tmdb.org/t/p/original' + trend[0].backdrop_path : null} alt=""/>
            
            <h1 className="title">{trend ? trend[0].original_title : null}</h1>
            <p className="des">{trend ? trend[0].overview : null }</p>
            {trend && vid ? <a href={'https://youtu.be/' + vid.key} rel="noreferrer" target="_blank" className="watch-btn">Watch {vid.type} <img src={play} alt="Play Icon"/></a> : null}
        </div>
    );
};

export default Hero;