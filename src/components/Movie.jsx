import React from 'react';

const imgdb = 'http://image.tmdb.org/t/p/original';
const genre = [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
];
function Movie({ movie }) {
    return (
        <div className="card">
            <div className="img-container" style={{backgroundImage: `linear-gradient(0deg, rgba(2,0,36,0.50) 0%, rgba(0,212,255,0) 40%), url(${imgdb + movie.poster_path})`}}></div>
            <p className="rating">{movie.vote_average}</p>
            <h3 className="title">{movie.original_title}</h3>
            <p className="genre">{movie.genre_ids.map(id => {
                let genreVar = '';
                for (let i = 0; i < genre.length; i++) {
                    if (genre[i].id === id) {
                        genreVar += genre[i].name + ' ';
                    };
                };
                return genreVar;
            })}</p>
        </div>
    )
};

export default Movie;