import React from 'react';
import Carousels from "./components/Carousels";
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Search from './components/Search';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Search />
      <Carousels />
    </div>
  );
}

export default App;
