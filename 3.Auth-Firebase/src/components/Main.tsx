import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Auth, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';

interface UserState {
    email: string;
    uid: string;
    blank?: string;
}

const Main = () => {
    const [user, setUser] = useState<UserState | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth as Auth, async (userAuth) => {
            if (userAuth) {
                const unsubFromFirestore = onSnapshot(doc(db, "users", userAuth.uid), (doc) => {
                    const userData = doc.data();
                    if (userData) {
                        setUser({
                            email: userData.email,
                            uid: userData.uid,
                            blank: userData.blank,
                        });
                        setLoading(false);
                    }
                });

                return () => {
                    unsubFromFirestore();
                    unsubscribe();
                };
            } else {
                setUser(null);
                setLoading(false);
                unsubscribe();
            }
        });
    }, []);

    const handleSignOut = async () => {
        if (auth.currentUser) {
            const unsubFromFirestore = onSnapshot(doc(db, "users", auth.currentUser.uid), () => { });
            await unsubFromFirestore();
        }
        await signOut(auth);
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
                            <p style={{ marginBottom: 10 }}>Blank: {user?.blank}</p>
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
}

export default Main;
