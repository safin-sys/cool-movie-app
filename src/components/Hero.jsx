import React, { useState, useEffect } from 'react';
import play from '../img/icons/play.svg';

function Hero() {
    const [trend, setTrend] = useState();
    const [vid, setVid] = useState();

    const trending = `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_API_KEY}`;

    useEffect(() => {
        async function fetchTrending() {
            const res = await fetch(trending);
            const data = await res.json();

            const videos = `https://api.themoviedb.org/3/movie/${data.results[0].id}/videos?api_key=${process.env.REACT_APP_API_KEY}`;
            const vidRes = await fetch(videos);
            const vidData = await vidRes.json();
            setVid(vidData.results[0]);

            return data;
        };

        fetchTrending().then(data => setTrend(data.results));
    }, [trending])

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