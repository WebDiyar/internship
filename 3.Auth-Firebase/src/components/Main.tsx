import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Auth, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { clearUser } from '../store/authSlice';

interface UserState {
    email: string;
    uid: string;
    blank?: string;
}

const Main = () => {
    const [user, setUser] = useState<UserState | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const unsubscribeFromFirestore = useRef<() => void>(() => { });
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth as Auth, (userAuth) => {
            if (userAuth) {
                const unsubscribe = onSnapshot(doc(db, "users", userAuth.uid), (doc) => {
                    const userData = doc.data();
                    if (userData) {
                        setUser({
                            email: userData.email,
                            uid: userData.uid,
                            blank: userData.blank,
                        });
                    }
                    setLoading(false);
                });
                unsubscribeFromFirestore.current = unsubscribe;
            } else {
                setUser(null);
                setLoading(false);
            }
        });

        return () => {
            unsubscribeAuth();
            unsubscribeFromFirestore.current();
        };
    }, []);

    const handleSignOut = async () => {
        // Call the ref's current function to ensure listener is unsubscribed
        // отписки от Firestore, чтобы убедиться, что слушатель деактивирован
        unsubscribeFromFirestore.current();
    
        try {
            await signOut(auth);
            dispatch(clearUser());
        } catch (error) {
            console.error("Sign Out Error:", error);
        }
    };

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <h1 style={{ marginBottom: 10 }}>
                        {user ? `Hello ${user.email}! Welcome` : "Hello User"}
                    </h1>
                    {user ? (
                        <div>
                            <p>Email: {user.email}</p>
                            <p>Uid: {user.uid}</p>
                            <p style={{ marginBottom: 10 }}>Blank: {user.blank}</p>
                            <button onClick={handleSignOut}>Sign Out</button>
                        </div>
                    ) : (
                        <nav>
                            <ul>
                                <li><Link to="/signIn">Sign In</Link></li>
                                <li><Link to="/signUp">Sign Up</Link></li>
                            </ul>
                        </nav>
                    )}
                </>
            )}
        </div>
    );
};

export default Main;
