import React from 'react';
import Carousels from "./components/Carousels";
import Navbar from './components/Navbar';
import Search from './components/Search';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Search />
      <Carousels />
    </div>
  );
}

export default App;
