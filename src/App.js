import React from 'react';
import Carousels from "./components/Carousels";
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Search from './components/Search';
import MovieDetails from './components/MovieDetails';
import Account from './components/Account';
import Footer from './components/Footer';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Join from './components/Join';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/:type/:id" exact component={MovieDetails} />
          <Route path="/account" exact component={Account} />
          <Route path="/join" exact component={Join} />
        </Switch>
        <Footer />
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
