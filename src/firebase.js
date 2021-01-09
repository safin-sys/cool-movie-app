import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore';

var firebaseConfig = {
    apiKey: "AIzaSyDdNjtSwQh7mg3LScPraKPE0x08lxX2mss",
    authDomain: "coolmovieapp-ec975.firebaseapp.com",
    projectId: "coolmovieapp-ec975",
    storageBucket: "coolmovieapp-ec975.appspot.com",
    messagingSenderId: "557299551623",
    appId: "1:557299551623:web:679cb825fabbec868e9722"
};

class Firebase {
    constructor() {
        firebase.initializeApp(firebaseConfig);
        this.auth = firebase.auth();
        this.db = firebase.firestore();
    };
    
    login(email, password) {
        return this.auth.signInWithEmailAndPassword(email, password);
    };

    logout() {
        return this.auth.signOut();
    };

    async signup(name, email, password) {
        await this.auth.createUserWithEmailAndPassword(email, password);
        return this.auth.currentUser.updateProfile({
            displayName: name
        });
    };

};

export default new Firebase();