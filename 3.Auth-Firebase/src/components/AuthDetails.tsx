import { onAuthStateChanged, signOut, Auth, User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { auth } from "../firebase";
import { useLocation } from 'react-router-dom';

const AuthDetails: React.FC = () => {
    const [authUser, setAuthUser] = useState<null | User>(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const uid = location.state?.uid; // Get UID from the state
        if (uid) {
            // Use UID to fetch user details or perform other actions
        }

        const listen = onAuthStateChanged(auth as Auth, (user) => {
            if (user) {
                setAuthUser(user); // Only set the user, do not navigate away
            } else {
                setAuthUser(null);
            }
        });
        return () => {
            listen();
        };
    }, [location]);

    const userSignOut = () => {
        signOut(auth as Auth)
            .then(() => {
                console.log("sign out successful");
                navigate("/");
            })
            .catch((error) => console.log(error));
    };

    return (
        <div>
            {authUser ? (
                <>
                    <p style={{ marginTop: 10 }}>{`Success! Signed In -  ${authUser.email}`}</p>
                    <button onClick={userSignOut} style={{ marginTop: 10 }}>Sign Out</button>
                </>
            ) : (
                <button>Signed Out</button>
            )}
        </div>
    );
};

export default AuthDetails;
