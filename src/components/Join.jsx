import React, {useState, useRef} from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function Login({handleSignUp}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);

    async function handleLogin(e) {
        e.preventDefault();
        try {
            setLoading(true);
            await login(email, password);
        } catch(error) {
            alert(error.message);
            console.error(error)
        };
        setLoading(false);
    };

    return (
        <div className="join">
            <div className="nav-bg"><h1>Login</h1></div>
            <div className="login form-container">
                <form className="login-form" onSubmit={e => handleLogin(e)}>
                    <div className="email">
                        <label htmlFor="email">Email address</label>
                        <input type="email" name="email" placeholder="Enter Email" onChange={e => setEmail(e.target.value)} />
                    </div>

                    <div className="pass">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" placeholder="Enter Password" onChange={e => setPassword(e.target.value)} minLength="6" maxLength="32" />
                    </div>

                    <button disabled={loading}>Login</button>
                </form>
                <p><Link to="/forgot">Forgot Password?</Link></p>
                <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
            </div>
        </div>
    );
};

export function Signup({handleLogin}) {
    const name = useRef();
    const email = useRef();
    const password = useRef();
    const { signup } = useAuth();
    const [loading, setLoading] = useState(false);

    async function handleSignup(e) {
        e.preventDefault();
        try {
            setLoading(true);
            await signup(name.current.value, email.current.value, password.current.value);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    return (
        <div className="join">
            <div className="nav-bg"><h1>Signup</h1></div>
            <div className="signup form-container">
                <form className="signup-form" onSubmit={e => handleSignup(e)}>
                    <div className="name">
                        <label htmlFor="name">Username</label>
                        <input type="text" name="name" placeholder="Enter username" required ref={name} />
                    </div>

                    <div className="email">
                        <label htmlFor="email">Email address</label>
                        <input type="email" name="email" placeholder="Enter Email" ref={email} required />
                    </div>

                    <div className="pass">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" placeholder="Enter Password" ref={password} required />
                    </div>

                    <button disabled={loading}>Signup</button>
                </form>
                <p>Already have an account? <Link to="/login">Login here</Link></p>
            </div>
        </div>
    );
};

export function ForgotPassword() {
    const { forgotPassword } = useAuth();
    const email = useRef();
    const [loading, setLoading] = useState(false);

    async function handleForgotPassword(e) {
        e.preventDefault();
        try {
            setLoading(true);
            await forgotPassword(email.current.value);
        } catch(err) {
            console.log(err);
        };
        setLoading(false);
    };

    return (
        <div className="join">
            <div className="nav-bg"><h1>Forgot Password</h1></div>
            <div className="fpass form-container">
                <form className="fpass-form" onSubmit={e => handleForgotPassword(e)}>
                    <div className="email">
                        <label htmlFor="email">Email address</label>
                        <input type="email" name="email" placeholder="Enter Email" ref={email} required />
                    </div>
                    <button disabled={loading}>Reset Password</button>
                </form>
            </div>
        </div>
    )
}