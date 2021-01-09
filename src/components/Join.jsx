import React, {useState} from 'react';

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
    return (
        <div className="login form-container">
            <form className="login-form">
                <div className="email">
                    <label htmlFor="email">Email address</label>
                    <input type="email" name="email" placeholder="Enter Email"/>
                </div>

                <div className="pass">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" placeholder="Enter Password"/>
                </div>

                <button type="submit">Login</button>
            </form>
            <p><a href="/">Forgot Password?</a></p>
            <p>Don't have an account? <button onClick={handleSignUp}>Sign up here</button></p>
        </div>
    );
};

function Signup({handleLogin}) {
    return (
        <div className="signup form-container">
            <form className="signup-form">
                <div className="name">
                    <label htmlFor="name">Username</label>
                    <input type="text" name="name" placeholder="Enter username"/>
                </div>

                <div className="email">
                    <label htmlFor="email">Email address</label>
                    <input type="email" name="email" placeholder="Enter Email"/>
                </div>

                <div className="pass">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" placeholder="Enter Password"/>
                </div>

                <div className="pass">
                    <label htmlFor="password">Confirm password</label>
                    <input type="password" name="password" placeholder="Confirm Password"/>
                </div>

                <button type="submit">Signup</button>
            </form>
            <p>Already have an account? <button onClick={handleLogin}>Login here</button></p>
        </div>
    );
};
