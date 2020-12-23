import React, { useState } from 'react';
import ham from '../img/icons/hamburger.svg';
import x from '../img/icons/x.svg';
import {Link} from 'react-router-dom';

function Navbar() {
    const [hamNavStatus, setHamNavStatus] = useState(false);

    function handleHam() {
        document.querySelector('.ham-nav-menu').classList.toggle("ham-menu-nav-active");
        if (hamNavStatus) {
            setHamNavStatus(false);
        } else {
            setHamNavStatus(true);
        };
    };

    return (
        <React.Fragment>
            <nav>
                <Link className="logo" to="/"><h1>COOL <br/> MOVIEAPP</h1></Link>
                <ul>
                    <li><Link to="/" className="nav-active">HOME</Link></li>
                    <li><a href="/#now-playing">NOW PLAYING</a></li>
                    <li><a href="/#movies">MOVIES</a></li>
                    <li><a href="/#tv-shows">TV SHOWS</a></li>
                </ul>
                <button onClick={handleHam} className="ham"><img src={ham} alt="HAM"/></button>
            </nav>
            <div className="ham-nav-menu">
                <button onClick={handleHam} className="ham"><img src={x} alt="HAM"/></button>
                <ul>
                    <li><Link to="/" className="nav-active">HOME</Link></li>
                    <li><a href="/#now-playing">NOW PLAYING</a></li>
                    <li><a href="/#movies">MOVIES</a></li>
                    <li><a href="/#tv-shows">TV SHOWS</a></li>
                </ul>
            </div>
        </React.Fragment>
    );
};

export default Navbar;