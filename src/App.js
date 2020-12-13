import React, { useState, useEffect } from 'react';
import Movie from "./components/Movie";

function App() {
  const [movies, setMovies] = useState([]);
  const popularity = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${process.env.REACT_APP_API_KEY}`;

  useEffect(() => {
    fetch(popularity)
    .then(res => res.json())
    .then(data => {
      setMovies(data.results);
      console.log(data.results);
    });
  }, [popularity]);

  return (
    <div className="App">
      {movies.map(movie => {
        return <Movie key={movie.title} movie={movie} />
      })}
    </div>
  );
}

export default App;
