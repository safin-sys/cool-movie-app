import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../firebase';

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}


export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const user = auth.currentUser;

    function signup(email, password) {
        auth.createUserWithEmailAndPassword(email, password)
    }

    function logout() {
        if(user) {
            auth.signOut();
            alert('Successfully logged out')
        } else {
            alert('You have to be logged in to logout.')
        }
    }

    function deleteAccount() {
        if(user) {
            user.delete()
            .then(res => alert(res))
            .catch(err => alert(err))
        } else {
            alert('You have to be logged in to delete account.');
        }
    }

    useEffect(() => {
        const unsubscribe = user ? auth.onAuthStateChanged(u => {
            setCurrentUser(u);
        }) : setCurrentUser({ displayName: 'Guest', email: 'guest@email.co.uk' });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        signup,
        logout,
        deleteAccount
    }

    return (
        <AuthContext.Provider value={value} >
            {children}
        </AuthContext.Provider>
    )
}