import React, { useState } from 'react';
import Movie from './Movie';
import srcIco from "../img/icons/search.svg";
import xIco from "../img/icons/x.svg";

function Search() {
    const [ query, setQuery ] = useState('');
    const [ DOMQuery, setDOMQuery ] = useState();
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
            fetchQuery().then(data => setQueryResults(data.slice(0, 10)));
            setDOMQuery(query);
        };
    };

    return (
        <div className="search-container">
            <form className="search" onSubmit={handleSubmit}>
                <input type="text" onChange={handleChange} placeholder="Search..." value={query} />
                {!queryResults[0] ? <button type="submit"><img src={srcIco} alt="search icon"/></button> : <button type="reset" onClick={() => setQueryResults([]) & setQuery('')}><img src={xIco} alt="close icon"/></button>}
            </form>
            {queryResults[0] === undefined ? null : <h3 className="section-header">{'Search results for "' + DOMQuery + '"'}</h3>}
            <div className="search-results">
                {queryResults.map((res, index) => {
                    let finalRes;
                    if (res.media_type === 'tv' || res.media_type === 'movie') {
                        finalRes = res;
                    } else {
                        return '';
                    };
                    return <Movie key={index} movie={finalRes} />
                })}
            </div>
        </div>
    )
}

export default Search;