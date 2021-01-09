import React, {useState, useEffect} from 'react';
import john from "../img/john.jpg";
import Movie from './Movie';

function Account() {
    const [mviId] = useState([
        {id: 238, type:'movie'}, 
        {id: 464052, type:'movie'}, 
        {id: 508442, type:'movie'}, 
        {id: 577922, type:'movie'},
        {id: 44217, type: 'tv'}
    ]);

    return (
        <div className="account">
            <div className="nav-bg"></div>
            <div className="account-container">
                <aside>
                <div className="user-info">
                        <div className="avatar">
                            <img src={john} alt="avatar"/>
                        </div>
                        <p className="name">John Doe</p>
                        <p className="mail">john@doe.com</p>
                    </div>
                    <div className="user-control">
                        <h5>Delete Account</h5>
                        <h5>Logout Account</h5>
                    </div>
                </aside>
                <main>
                    <h3 className="section-header">Wishlist</h3>
                    <div className="wishlist">
                        {mviId.map((mvi, index) => {
                            return <Wishlist key={index} mvi={mvi} />
                        })};
                    </div>
                </main>
            </div>
            <h3 className="udev">This part of the website is Under Development</h3>
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