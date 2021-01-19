import React, { useState } from 'react';
import ham from '../img/icons/hamburger.svg';
import x from '../img/icons/x.svg';
import {Link} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
    const [hamNavStatus, setHamNavStatus] = useState(false);
    const {currentUser, logout} = useAuth();

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

    function nameLetter() {
        if(currentUser) {
            return currentUser.displayName.charAt(0);
        } else {
            return 'G'
        }
    }

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
                            <p onClick={handleAvatar}>{nameLetter()}</p> 
                        </div>
                        <Link to="/account"><p className="name">{currentUser && currentUser.displayName}</p></Link>
                    </div>
                    <hr/>
                    <ul>
                        <li><Link to="/account">Wishlist</Link></li>
                        {currentUser && currentUser.displayName !== 'Guest' ? <li><p onClick={logout}>Logout</p></li> : <li><Link to="/join">Join</Link></li>}
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
                            <p>{nameLetter()}</p>
                        </div>
                        <Link to="/account"><p className="name">{currentUser && currentUser.displayName}</p></Link>
                    </div>
                    {currentUser && currentUser.displayName !== 'Guest' ? <li><p onClick={logout}>Logout</p></li> : <li><Link to="/join">Join</Link></li>}
                </div>
            </div>
        </React.Fragment>
    );
};

export default Navbar;