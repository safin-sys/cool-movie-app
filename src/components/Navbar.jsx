import React, { useState } from 'react';
import ham from '../img/icons/hamburger.svg';
import x from '../img/icons/x.svg';
import avatar from '../img/john.jpg';
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

    function handleAvatar() {
        document.querySelector('nav > .user').classList.toggle('user-active');
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
                <div className="user">
                    <div className="user__info">
                        <div className="avatar">
                            <img src={avatar} alt="avatar" onClick={handleAvatar} /> 
                        </div>
                        <Link to="/account"><p className="name">John Doe</p></Link>
                    </div>
                    <ul>
                        <li><a href="/">Wishlist</a></li>
                        <li><a href="/">Account</a></li>
                        <li><a href="/">Logout</a></li>
                    </ul>
                </div>
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
                <div className="user">
                    <div className="user__info">
                        <div className="avatar">
                            <img src={avatar} alt="avatar"/>
                        </div>
                        <Link to="/account"><p className="name">John Doe</p></Link>
                    </div>
                    <p>L</p>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Navbar;