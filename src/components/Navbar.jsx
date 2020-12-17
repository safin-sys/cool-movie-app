import React, { useState } from 'react';
import ham from '../img/icons/hamburger.svg';
import x from '../img/icons/x.svg';

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
                <h1 className="logo">COOL <br/> MOVIEAPP</h1>
                <ul>
                    <li><a href="/" className="nav-active">HOME</a></li>
                    <li><a href="#upcoming">UPCOMING</a></li>
                    <li><a href="#popular">POPULAR</a></li>
                </ul>
                <button onClick={handleHam} className="ham"><img src={ham} alt="HAM"/></button>
            </nav>
            <div className="ham-nav-menu">
                <button onClick={handleHam} className="ham"><img src={x} alt="HAM"/></button>
                <ul>
                    <li><a href="/" className="nav-active">HOME</a></li>
                    <li><a href="#upcoming">UPCOMING</a></li>
                    <li><a href="#popular">POPULAR</a></li>
                </ul>
            </div>
        </React.Fragment>
    );
};

export default Navbar;