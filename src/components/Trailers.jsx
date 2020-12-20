import React from 'react';
import play from '../img/icons/play.svg';
function Trailers({ trend }) {
    return (
        <div className="vid-card">
            <div className="thumbnail"
            style={{
                backgroundImage: `linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(0,212,255,0) 60%),url(https://img.youtube.com/vi/eW7Twd85m2g/0.jpg)`
            }}></div>

            <button><img src={play} alt="Play Button"/></button>
            <h3 className="title">{trend.original_title || trend.name}</h3>
        </div>
    )
}

export default Trailers;