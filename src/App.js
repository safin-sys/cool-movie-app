import React from 'react';
import Carousels from "./components/Carousels";
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Search from './components/Search';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import MovieDetails from './components/MovieDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/:type/:id" component={MovieDetails} />
        </Switch>
      </div>
    </Router>
  );
};

function Home() {
  return (
    <React.Fragment>
      <Hero />
      <Search />
      <Carousels />
    </React.Fragment>
  );
};

export default App;
