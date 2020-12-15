import React, { useState, useEffect } from 'react';
import Movie from './Movie';
import Carousel from 'react-elastic-carousel';

function Carousels() {
    const [upcomingMvi, setUpcomingMvi] = useState([]);
    const [popularMvi, setPopularMvi] = useState([]);
    
    const upcoming = `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}`;
    const popular = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}`;

    useEffect(() => {
        async function fetchUpcoming() {
            const res = await fetch(upcoming);
            const data = await res.json();
            return data;
        };

        async function fetchPopular() {
            const res = await fetch(popular);
            const data = await res.json();
            return data;
        };

        fetchUpcoming().then(data => setUpcomingMvi(data.results));
        fetchPopular().then(data => setPopularMvi(data.results));
    }, [upcoming, popular]);

    const breakPoints = [
        {width: 300, itemsToShow: 1, itemsToScroll: 1, pagination: false},
        {width: 400, itemsToShow: 2, itemsToScroll: 2, pagination: false},
        {width: 700, itemsToShow: 3, itemsToScroll: 3, pagination: false},
        {width: 800, itemsToShow: 4, itemsToScroll: 4, pagination: false},
        {width: 1300, itemsToShow: 5, itemsToScroll: 5, pagination: false},
        {width: 1900, itemsToShow: 6, itemsToScroll: 6, pagination: false}
    ];

    return (
        <React.Fragment>
            <div className="carousel-container">
                <h3 className="section-header">Upcoming Movies</h3>
                <Carousel className="carousel" breakPoints={breakPoints}>
                    {upcomingMvi.map((movie, index) => {
                        return <Movie key={index} movie={movie} />
                    })}
                </Carousel>
            </div>

            <div className="carousel-container">
                <h3 className="section-header">Popular Movies</h3>
                <Carousel className="carousel" breakPoints={breakPoints}>
                    {popularMvi.map((movie, index) => {
                        return <Movie key={index} movie={movie} />
                    })}
                </Carousel>
            </div>
        </React.Fragment>
    )
}

export default Carousels;
