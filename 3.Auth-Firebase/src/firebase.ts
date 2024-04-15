// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

interface IFirebaseconfig {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId: string;
}

const firebaseConfig: IFirebaseconfig = {
    apiKey: "AIzaSyBWPj0D6GlNXUOQmFjoY94D-LIl_ze3BRg",
    authDomain: "authentication-web-95e9c.firebaseapp.com",
    projectId: "authentication-web-95e9c",
    storageBucket: "authentication-web-95e9c.appspot.com",
    messagingSenderId: "635600982068",
    appId: "1:635600982068:web:bbd1d0da00c0f839f4ba61",
    measurementId: "G-PT5HPBRXWT"
};

// Initialize Firebase
export const app: FirebaseApp = initializeApp(firebaseConfig);
export const analytics: Analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);