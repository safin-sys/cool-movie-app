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

const firebaseSaflbConfig = {
    apiKey: "AIzaSyAnqVAiDuBzjQ79jyBWpJN1IR4paZAmzVs",
    authDomain: "studied-groove-235216.firebaseapp.com",
    databaseURL: "https://studied-groove-235216.firebaseio.com",
    projectId: "studied-groove-235216",
    storageBucket: "studied-groove-235216.appspot.com",
    messagingSenderId: "850328408738",
    appId: "1:850328408738:web:d2c3c116f00ccc04e03dfb",
    measurementId: "G-ENCHXT3VD1"
};

const app = firebase.initializeApp(firebaseConfig);
export const saflbapp = firebase.initializeApp(firebaseSaflbConfig, "saflb");
export const auth = app.auth();
export const db = app.firestore();
export const safdb = saflbapp.firestore();

export default app;