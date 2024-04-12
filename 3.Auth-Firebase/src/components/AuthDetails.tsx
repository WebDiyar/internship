import { onAuthStateChanged, signOut, Auth, User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { auth } from "../firebase";

const AuthDetails: React.FC = () => {
    const [authUser, setAuthUser] = useState<null | User>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const listen = onAuthStateChanged(auth as Auth, (user) => {
            if (user) {
                setAuthUser(user);
            } else {
                setAuthUser(null);
            }
        });
        return () => {
            listen();
        };
    }, [authUser]);

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
                    <p style={{marginTop: 10}}>{`Success! Signed In -  ${authUser.email}`}</p>
                    <button onClick={userSignOut} style={{ marginTop: 10 }}>Sign Out</button>
                </>
            ) : (
                <button>Signed Out</button>
            )}
        </div>
    );
};

export default AuthDetails;
