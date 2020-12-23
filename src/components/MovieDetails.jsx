import React, { useEffect } from 'react';

function MovieDetails({ match }) {
    useEffect(()=>{
        console.log(match);
    }, [match]);
    return (
        <div>
            <h1>heloooo</h1>
        </div>
    )
}

export default MovieDetails;