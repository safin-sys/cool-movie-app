import React, { useState } from 'react';
import Movie from './Movie';
import Carousel from 'react-elastic-carousel';

function Search() {
    const [ query, setQuery ] = useState();
    const [ queryResults, setQueryResults ] = useState([]);
    const queryAPI = `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_API_KEY}&query=`;

    
    function handleChange(e) {
        setQuery(e.target.value);  
    };

    function handleSubmit(e) {
        e.preventDefault();
        if (query) {
            async function fetchQuery() {
                const res = await fetch(queryAPI + query);
                const data = await res.json();
                return data.results;
            };
            fetchQuery().then(data => setQueryResults(data));
        };
    };

    const breakPoints = [
        {width: 300, itemsToShow: 1, itemsToScroll: 1, pagination: false},
        {width: 400, itemsToShow: 2, itemsToScroll: 2, pagination: false},
        {width: 700, itemsToShow: 3, itemsToScroll: 3, pagination: false},
        {width: 800, itemsToShow: 4, itemsToScroll: 4, pagination: false},
        {width: 1300, itemsToShow: 5, itemsToScroll: 5, pagination: false},
        {width: 1900, itemsToShow: 6, itemsToScroll: 6, pagination: false}
    ];

    return (
        <div className="search-container">
            <form className="search" onSubmit={handleSubmit}>
                <input type="text" onChange={handleChange} placeholder="Search..." />
            </form>
            {queryResults[0] === undefined ? null : <h3 className="section-header">{'Search results for "' + query + '"'}</h3>}
            <div className="search-results">
                <Carousel className="carousel" breakPoints={breakPoints}>
                    {queryResults.map((res, index) => {
                        let finalRes;
                        if (res.media_type === 'tv' || res.media_type === 'movie') {
                            finalRes = res;
                        } else {
                            return '';
                        };
                        return <Movie key={index} movie={finalRes} />
                    })}
                </Carousel>
            </div>
        </div>
    )
}

export default Search;