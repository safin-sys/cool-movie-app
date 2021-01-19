import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDdNjtSwQh7mg3LScPraKPE0x08lxX2mss",
    authDomain: "coolmovieapp-ec975.firebaseapp.com",
    projectId: "coolmovieapp-ec975",
    storageBucket: "coolmovieapp-ec975.appspot.com",
    messagingSenderId: "557299551623",
    appId: "1:557299551623:web:679cb825fabbec868e9722"
};

const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
export const db = app.firestore();

export default app;