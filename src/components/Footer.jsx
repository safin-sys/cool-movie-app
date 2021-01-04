import React from 'react';
import {Link} from 'react-router-dom';
import {AiFillGithub, AiOutlineMail} from 'react-icons/ai';

function Footer() {
    return (
        <footer>
            <Link className="logo" to="/"><h1>COOL <br/> MOVIEAPP</h1></Link>
            <div className="text">
                <a href="https://safin.netlify.app" target="_blank" rel="noreferrer">Safin Ahmed</a>
                <p>|</p>
                <a href="mailto:mdsafinofficial@gmail.com" target="_blank" rel="noreferrer">mdsafinofficial@gmail.com</a>
            </div>
            <div className="social">
                <a href="mailto:mdsafinofficial@gmail.com"><AiOutlineMail /></a>
                <a href="https://github.com/safin-sys" target="_blank" rel="noreferrer"><AiFillGithub /></a>
            </div>
        </footer>
    )
}

export default Footer;