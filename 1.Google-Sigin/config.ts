import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth, GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyD3RVddsN8gYYKdf_79w3jaUoQIzJRQHCc',
    authDomain: 'sigin-reactnative.firebaseapp.com',
    projectId: 'sigin-reactnative',
    storageBucket: 'sigin-reactnative.appspot.com',
    messagingSenderId: '931762791324',
    appId: '1:931762791324:web:87fbdd9cbfb6caabb71e59',
    measurementId: 'G-GRV47GX7LP',
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const provider: GoogleAuthProvider = new GoogleAuthProvider();

export { auth, provider };