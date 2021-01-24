import React, { useContext, useEffect, useState } from 'react'
import { auth, db } from '../firebase';
import firebase from 'firebase/app';
import { useHistory } from 'react-router-dom';

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}


export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [movieList, setMovieList] = useState();
    const user = auth.currentUser;
    const history = useHistory();

    async function signup(name, email, password) {
        await auth.createUserWithEmailAndPassword(email, password)
                .then(res => {
                    alert('Account created successfully.');
                    db.collection("users").doc(res.user.uid).set({ movieList: [] });
                    console.log(res);
                    window.location.href = '/';
                })
                .catch(err => {
                    alert(err.message);
                    console.log(err);
                });
        auth.currentUser.updateProfile({ displayName: name });
    }

    async function login(email, password) {
        auth.signInWithEmailAndPassword(email, password)
            .then(res => {
                history.push('/account');
                alert('Login Successful');
                console.log(res);
            })
            .catch(err => {
                alert(err.message);
                console.log(err);
            })
    }

    function logout() {
        if(user) {
            auth.signOut();
            history.push('/');
            alert('Successfully logged out')
        } else {
            alert('You have to be logged in to logout.')
        }
    }

    function deleteAccount() {
        if(user) {
            user.delete()
            .then(res => {
                history.push('/');
                alert('Account deleted successfully.');
                console.log(res);
            })
            .catch(err => {
                alert(err.message);
                console.log(err);
            })
            db.collection('users').doc(user.uid).delete();
        } else {
            alert('You have to be logged in to delete account.');
        }
    }

    async function forgotPassword(email) {
        await auth.sendPasswordResetEmail(email)
        .then(res => {
            history.push('/login');
            alert('Password reset details successfully sent to your email.')
            console.log(res);
        })
        .catch(err => {
            alert(err.message);
            console.log(err);
        });
    };

    function addMovie(id, type) {
        db.collection("users").doc(user.uid).update({
            movieList: firebase.firestore.FieldValue.arrayUnion({id, type})
        });
    };

    function removeMovie(id, type) {
        db.collection("users").doc(user.uid).update({
            movieList: firebase.firestore.FieldValue.arrayRemove({id, type})
        });
    };

    useEffect(() => {
        (async function getUser() {
            auth.onAuthStateChanged(u => {
                if(u) {
                    setCurrentUser(u);
                } else {
                    setCurrentUser({ displayName: 'Guest', email: 'guest@email.com' });
                }
            });
        } ());
    }, [user]);

    useEffect(() => {
        if(user) {
            db.collection("users").doc(user.uid).onSnapshot(doc => {
                setMovieList(doc.data().movieList);
            })
        }
    }, [user])

    const value = {
        currentUser,
        signup,
        login,
        logout,
        deleteAccount,
        forgotPassword,
        movieList,
        addMovie,
        removeMovie
    }

    return (
        <AuthContext.Provider value={value} >
            {children}
        </AuthContext.Provider>
    )
}