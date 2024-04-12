import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { signOut, Auth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

interface UserState {
    userID?: string;
    email?: string | null;
}

const UserDashboard: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();
    const navigate = useNavigate();
    const [user, setUser] = useState<UserState>({ userID: userId, email: "" });

    useEffect(() => {
        const fetchUserData = async () => {
            const unsubscribe = await onAuthStateChanged(auth as Auth, (user) => {
                if (user) {
                    setUser({ userID: user.uid, email: user.email });
                } else {
                    navigate("/signIn");
                }
            });
            return unsubscribe;
        };

        const unsubscribe = fetchUserData();

        return () => {
            unsubscribe.then(unsub => unsub());
        };
    }, [navigate]);

    const handleSignOut = async () => {
        try {
            await signOut(auth as Auth);
            console.log("Signed out successfully");
            navigate("/");
        } catch (error) {
            console.error("Sign out error:", error);
        }
    }

    return (
        <div>
            <h1>Welcome to your Dashboard</h1>
            <p style={{ marginBottom: 10 }}>Your UID is: {user.userID}</p>
            <p style={{ marginBottom: 10 }}>Your Email is: {user.email}</p>
            <button onClick={handleSignOut}>Sign Out</button>
        </div>
    );
};

export default UserDashboard;
