import React from 'react';
import play from '../img/icons/play.svg';
function Trailers({ trend, vid }) {
    function renderImg() {
        if(vid) {
            return `https://img.youtube.com/vi/${vid[0].key}/0.jpg`;
        };
    };

    function getLink() {
        if(vid) {
            return `https://youtu.be/${vid[0].key}`;
        };
    };
    return (
        <div className="vid-card">
            <div className="thumbnail"
            style={{
                backgroundImage: `linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(0,212,255,0) 60%),url(${renderImg()})`
            }}></div>

            <a href={getLink()} target="_blank" rel="noreferrer"><img src={play} alt="Play Button"/></a>
            <h3 className="title">{trend.original_title || trend.name}</h3>
        </div>
    )
}

export default Trailers;