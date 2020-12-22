import React, { useState, useEffect } from 'react';
import play from '../img/icons/play.svg';
import Trailers from './Trailers';
import Carousel from 'react-elastic-carousel';

function Hero() {
    const [trend, setTrend] = useState();
    const [vid, setVid] = useState();

    
    useEffect(() => {
        async function fetchTrending() {
            const trending = `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_API_KEY}`;

            const res = await fetch(trending);
            const data = await res.json();            
            const trendData = data.results;

            const videos = `https://api.themoviedb.org/3/${trendData[0].media_type}/${trendData[0].id}/videos?api_key=${process.env.REACT_APP_API_KEY}`;

            const vidres = await fetch(videos);
            const viddata = await vidres.json();
            setVid(viddata.results[0]);

            return trendData;
        };

        fetchTrending().then(data => setTrend(data));
    }, [])

    const breakPoints = [
        {width: 600, itemsToShow: 1, itemsToScroll: 1, pagination: false},
        {width: 840, itemsToShow: 3, itemsToScroll: 3, pagination: false}
    ];

    return (
        <React.Fragment>
            <div className="hero">
                <img className="hero-img" src={trend ? 'https://image.tmdb.org/t/p/original' + trend[0].backdrop_path : null} alt=""/>
                
                <h1 className="title">{trend ? trend[0].original_title : null}</h1>
                <p className="des">{trend ? trend[0].overview : null }</p>
                {vid ? <a href={'https://youtu.be/' + vid.key} rel="noreferrer" target="_blank" className="watch-btn">Watch {vid.type} <img src={play} alt="Play Icon"/></a> : null}
            </div>
            <div className="hero-videos">
                <div className="vid-card-container">
                    <div className="vid-cards">
                        {trend ? <Carousel breakPoints={breakPoints}>
                            {trend.map((t, index) => {
                                if (index > 0) {
                                    return <Trailers key={index} trend={t} />
                                } else {
                                    return null;
                                };
                            })}
                        </Carousel> : null}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Hero;