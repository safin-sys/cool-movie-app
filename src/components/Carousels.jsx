import React, { useState, useEffect } from 'react';
import Movie from './Movie';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

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

    const settings = {
        dots: false,
        infinite: true,
        speed: 200,
        slidesToShow: 8,
        slidesToScroll: 1,
        arrows: false,
        responsive: [
            {
                breakpoint: 1920,
                settings: {
                    slidesToShow: 8
                }
            },
            {
                breakpoint: 1366,
                settings: {
                    slidesToShow: 5
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2
                }
            }
        ]
    };

    return (
        <React.Fragment>
            <div className="carousel-container">
                <h3 className="section-header">Upcoming Movies</h3>
                <Slider className="carousel" {...settings}>
                    {upcomingMvi.map((movie, index) => {
                        return <Movie key={index} movie={movie} />
                    })}
                </Slider>
            </div>

            <div className="carousel-container">
                <h3 className="section-header">Popular Movies</h3>
                <Slider className="carousel" {...settings}>
                    {popularMvi.map((movie, index) => {
                        return <Movie key={index} movie={movie} />
                    })}
                </Slider>
            </div>
        </React.Fragment>
    )
}

export default Carousels;
