import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Auth, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { setUser, clearUser } from '../store/authSlice';  // Import setUser
import "../style/main.css"

interface UserState {
    email: string;
    uid: string;
    blank?: string;
}

const Main = () => {
    const [user, setUserState] = useState<UserState | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const unsubscribeFromFirestore = useRef<() => void>(() => { });
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth as Auth, (userAuth) => {
            if (userAuth) {
                const unsubscribe = onSnapshot(doc(db, "users", userAuth.uid), (doc) => {
                    const userData = doc.data();
                    if (userData) {
                        setUserState({
                            email: userData.email,
                            uid: userData.uid,
                            blank: userData.blank,
                        });
                        dispatch(setUser({ email: userData.email, uid: userData.uid }));
                    }
                    setLoading(false);
                });
                unsubscribeFromFirestore.current = unsubscribe;
            } else {
                setUserState(null);
                dispatch(clearUser());  
                setLoading(false);
            }
        });

        return () => {
            unsubscribeAuth();
            unsubscribeFromFirestore.current();
        };
    }, [dispatch]);

    const handleSignOut = async () => {
        unsubscribeFromFirestore.current();

        try {
            await signOut(auth);
            dispatch(clearUser());
        } catch (error) {
            console.error("Sign Out Error:", error);
        }
    };

    return (
        <div className="main-container">
            {loading ? (
                <p className='loading-text'>Loading...</p>
            ) : (
                <>
                    <h1 className='user-text'>
                        {user ? `Hello ${user.email}! Welcome` : "Hello User"}
                    </h1>
                    {user ? (
                        <div className="user-info">
                            <p>Email: {user.email}</p>
                            <p>Uid: {user.uid}</p>
                            <p style={{ marginBottom: 10 }}>Blank: {user.blank}</p>
                            <button onClick={handleSignOut}>Sign Out</button>
                        </div>
                    ) : (
                        <nav>
                            <ul className='user-ul'>
                                <li className='user-li'><Link to="/signIn">Sign In</Link></li>
                                <li className='user-li'><Link to="/signUp">Sign Up</Link></li>
                            </ul>
                        </nav>
                    )}
                </>
            )}
        </div>
    );
};

export default Main;
