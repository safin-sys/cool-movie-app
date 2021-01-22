import React, {useState, useEffect} from 'react';
import Movie from './Movie';
import { useAuth } from '../context/AuthContext';

function Account() {
    const {currentUser, logout, deleteAccount, movieList} = useAuth();
    const [mviId, setMviId] = useState([]);

    useEffect(() => {
        if(currentUser && currentUser.displayName !== 'Guest' && movieList) {
            setMviId(movieList);
        } else {
            setMviId([
                {id: 278, type:'movie'}, 
                {id: 238, type:'movie'}, 
                {id: 240, type:'movie'}, 
                {id: 155, type:'movie'},
                {id: 389, type: 'movie'},
                {id: 424, type: 'movie'},
                {id: 122, type: 'movie'},
                {id: 680, type: 'movie'},
            ]);
        };
    }, [currentUser, movieList])

    function nameLetter() {
        if(currentUser) {
            const name = currentUser.displayName.charAt(0);
            return name;
        } else {
            return 'G'
        }
    }

    return (
        <div className="account">
            <div className="nav-bg"></div>
            <div className="account-container">
                <aside>
                <div className="user-info">
                        <div className="avatar">
                            <p>{nameLetter()}</p>
                        </div>
                        <p className="name">{currentUser && currentUser.displayName}</p>
                        <p className="mail">{currentUser && currentUser.email}</p>
                    </div>
                    <div className="user-control">
                        <h5 onClick={deleteAccount}>Delete Account</h5>
                        <h5 onClick={logout}>Logout Account</h5>
                    </div>
                </aside>
                <main>
                    <h3 className="section-header">Wishlist</h3>
                    <div className="wishlist">
                        {mviId.map((mvi, index) => {
                            return <Wishlist key={index} mvi={mvi} />
                        })}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Account;

function Wishlist({mvi}) {
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        setWishlist([]);
        async function getWishlist() {
            const url = `https://api.themoviedb.org/3/${mvi.type}/${mvi.id}?api_key=${process.env.REACT_APP_API_KEY}`;
            const res = await fetch(url);
            const data = await res.json();
            setWishlist(wishlist => [...wishlist, data]);
        };
        getWishlist();
    }, [mvi.id, mvi.type]);

    return (
        <React.Fragment>
            {wishlist.map((wish, index) => {
                return <Movie key={index} movie={wish} />
            })}
        </React.Fragment>
    );
};