import React, {useState} from 'react';
import firebase from "../firebase";

function Join() {
    const [hasAcc, setHasAcc] = useState(true);

    function handleSignUp() {
        setHasAcc(false);
    };

    function handleLogin() {
        setHasAcc(true);
    };

    return (
        <div className="join">
            <div className="nav-bg"><h1>{hasAcc ? 'Login' : 'Sign up'}</h1></div>
            {hasAcc ? <Login handleSignUp={handleSignUp} /> : <Signup handleLogin={handleLogin} />}
        </div>
    );
};

export default Join;

function Login({handleSignUp}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function login(e) {
        e.preventDefault();
        try {
            await firebase.login(email, password);
        } catch(error) {
            alert(error.message);
            console.error(error)
        };
    };

    return (
        <div className="login form-container">
            <form className="login-form">
                <div className="email">
                    <label htmlFor="email">Email address</label>
                    <input type="email" name="email" placeholder="Enter Email" onChange={e => setEmail(e.target.value)} />
                </div>

                <div className="pass">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" placeholder="Enter Password" onChange={e => setPassword(e.target.value)} minLength="6" maxLength="32" />
                </div>

                <button onClick={e => login(e)}>Login</button>
            </form>
            <p><a href="/">Forgot Password?</a></p>
            <p>Don't have an account? <button onClick={handleSignUp}>Sign up here</button></p>
        </div>
    );
};

function Signup({handleLogin}) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function signup(e) {
        e.preventDefault();
        try {
            firebase.signup(name, email, password);
        } catch(error) {
            alert(error.message);
            console.error(error);
        };
    };

    return (
        <div className="signup form-container">
            <form className="signup-form">
                <div className="name">
                    <label htmlFor="name">Username</label>
                    <input type="text" name="name" placeholder="Enter username" onChange={e => setName(e.target.value)}/>
                </div>

                <div className="email">
                    <label htmlFor="email">Email address</label>
                    <input type="email" name="email" placeholder="Enter Email" onChange={e => setEmail(e.target.value)}/>
                </div>

                <div className="pass">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" placeholder="Enter Password" onChange={e => setPassword(e.target.value)} />
                </div>

                <button onClick={e => signup(e)}>Signup</button>
            </form>
            <p>Already have an account? <button onClick={handleLogin}>Login here</button></p>
        </div>
    );
};
