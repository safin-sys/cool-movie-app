import React, { useState, useEffect } from 'react';
import play from '../img/icons/play.svg';
import Trailers from './Trailers';
import Carousel from 'react-elastic-carousel';

function Hero() {
    const [trend, setTrend] = useState();
    const [vid, setVid] = useState([]);

    const trending = `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_API_KEY}`;

    useEffect(() => {
        async function fetchTrending() {
            const res = await fetch(trending);
            const data = await res.json();            
            const trendData = data.results.slice(0, 4);

            trendData.forEach(async trend => {
                const videos = `https://api.themoviedb.org/3/${trend.media_type}/${trend.id}/videos?api_key=${process.env.REACT_APP_API_KEY}`;

                const res = await fetch(videos);
                const data = await res.json();  
                setVid(vid => [...vid, data.results]);
            });

            return trendData;
        };

        fetchTrending().then(data => setTrend(data));
    }, [trending])

    const breakPoints = [
        {width: 600, itemsToShow: 1, itemsToScroll: 1, pagination: false},
        {width: 840, itemsToShow: 3, itemsToScroll: 1, pagination: false}
    ];

    return (
        <React.Fragment>
            <div className="hero">
                <img className="hero-img" src={trend ? 'https://image.tmdb.org/t/p/original' + trend[0].backdrop_path : null} alt=""/>
                
                <h1 className="title">{trend ? trend[0].original_title : null}</h1>
                <p className="des">{trend ? trend[0].overview : null }</p>
                {vid[0] !== undefined ? <a href={'https://youtu.be/' + vid[0][0].key} rel="noreferrer" target="_blank" className="watch-btn">Watch {vid[0][0].type} <img src={play} alt="Play Icon"/></a> : null}
            </div>
            <div className="hero-videos">
                <div className="vid-card-container">
                    <div className="vid-cards">
                        {trend ? <Carousel breakPoints={breakPoints}>
                            {trend.map((t, index) => {
                                if (index > 0) {
                                    return <Trailers key={index} trend={t} vid={vid[index]} />
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