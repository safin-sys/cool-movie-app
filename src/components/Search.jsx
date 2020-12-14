import React, { useState } from 'react';
import Movie from './Movie';

function Search() {
    const [ queryResults, setQueryResults ] = useState([]);
    const queryAPI = `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_API_KEY}&query=`;

    
    function handleChange(e) {
        if (e.target.value) {
            async function fetchQuery() {
                const res = await fetch(queryAPI + e.target.value);
                const data = await res.json();
                return data.results;
            };
            fetchQuery().then(data => setQueryResults(data));
        };
    };
    return (
        <React.Fragment>
            <form className="search">
                <input type="text" onChange={handleChange} />
            </form>
            <div className="search-results">
                {queryResults.map((res, index) => {
                    let finalRes;
                    if (res.media_type === 'tv' || res.media_type === 'movie') {
                        finalRes = res;
                    };
                    return <Movie key={index} movie={finalRes} />
                })}
            </div>
        </React.Fragment>
    )
}

export default Search;