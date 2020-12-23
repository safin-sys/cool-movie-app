import React from 'react';
import noimg from '../img/img404.webp';
import {Link} from 'react-router-dom';

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

  function renderImg() {
    if (movie.poster_path) {
      return `https://image.tmdb.org/t/p/${window.innerWidth > 768 ? 'w200' : 'w185'}` + movie.poster_path;
    } else {
      return noimg;
    };
  };

  return (
      <div className="card">
          <div className="img-container" 
          style={{
            backgroundImage: `linear-gradient(0deg, rgba(2,0,36,0.50) 0%, rgba(0,212,255,0) 40%),url(${renderImg()})`
          }}></div>
          
          <p className="rating">{movie ? movie.vote_average : 0}</p>
          <Link to={`${movie && movie.first_air_date ? 'tv' : 'movie'}/${movie.id}`}><h3 className="title">{movie ? movie.original_title || movie.original_name : null}</h3></Link>
          <p className="genre">
          {movie ? movie.genre_ids.map((id, index) => {
            let genreArr = '';
            for (let i = 0; i < genre.length; i++) {
              if (genre[i].id === id && index < 2) {
                genreArr += genre[i].name + ' ';
              };
            };
            return genreArr;
          }) : ''}
          </p>
      </div>
  );
};

export default Movie;