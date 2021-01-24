import React, { useEffect, useState } from 'react';
import noimg from '../img/img404.webp';
import {Link} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const genre = [
    {
      "id": 10759,
      "name": "Action & Adventure"
    },
    {
      "id": 10762,
      "name": "Kids"
    },
    {
      "id": 10763,
      "name": "News"
    },
    {
      "id": 10764,
      "name": "Reality"
    },
    {
      "id": 10765,
      "name": "Sci-Fi & Fantasy"
    },
    {
      "id": 10766,
      "name": "Soap"
    },
    {
      "id": 10767,
      "name": "Talk"
    },
    {
      "id": 10768,
      "name": "War & Politics"
    },
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
  const [watchlist, setWatchlist] = useState(false);
  const { currentUser, addMovie, movieList, removeMovie } = useAuth();

  function renderImg() {
    if (movie.poster_path) {
      return `https://image.tmdb.org/t/p/${window.innerWidth > 768 ? 'w200' : 'w185'}` + movie.poster_path;
    } else {
      return noimg;
    };
  };

  useEffect(() => {
    if(movieList && movieList.some(el => el.id === movie.id)) {
      setWatchlist(true);
    } else {
      setWatchlist(false);
    };
  }, [movie.id, movieList]);

  return (
      <div className="card">
          <Link to={`../${movie && movie.first_air_date ? 'tv' : 'movie'}/${movie.id}`} className="img-container" 
          style={{
            backgroundImage: `linear-gradient(0deg, rgba(2,0,36,0.50) 0%, rgba(0,212,255,0) 40%),url(${renderImg()})`
          }}></Link>
          {currentUser && currentUser.displayName !== 'Guest' && <button className={`watchlist-btn ${watchlist ? 'active' : null}`}>

            <div className="watchlist-neutral">
              <svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                <path d="M19 10.132v-6c0-1.103-.897-2-2-2H7c-1.103 0-2 .897-2 2V22l7-4.666L19 22V10.132z"/>
              </svg>
            </div>

            <div className="watchlist-active">
              {watchlist ? 
                <svg onClick={() => removeMovie(movie.id, movie.first_air_date ? 'tv' : 'movie')} preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                  <path d="M17 2H7a2 2 0 0 0-2 2v18l7-4.848L19 22V4a2 2 0 0 0-2-2zm-1 9H8V9h8v2z"/>
                </svg> : 
                <svg onClick={() => addMovie(movie.id, movie.first_air_date ? 'tv' : 'movie')} preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                  <path d="M17 2H7a2 2 0 0 0-2 2v18l7-4.848L19 22V4a2 2 0 0 0-2-2zm-1 9h-3v3h-2v-3H8V9h3V6h2v3h3v2z" />
                </svg>}
            </div>

            </button>}
          
          <p className="rating">{movie ? movie.vote_average : 0}</p>
          <Link to={`../${movie && movie.first_air_date ? 'tv' : 'movie'}/${movie.id}`}><h3 className="title">{movie ? movie.original_title || movie.original_name : null}</h3></Link>
          <p className="genre">
          {movie && movie.genre_ids ? movie.genre_ids.map((id, index) => {
            let genreArr = '';
            for (let i = 0; i < genre.length; i++) {
              if (genre[i].id === id && index < 1) {
                genreArr += genre[i].name + ' ';
              };
            };
            return genreArr;
          }) : ''}
          {movie.genres && movie.genres[0].name}
          </p>
      </div>
  );
};

export default Movie;