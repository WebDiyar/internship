// SignIn.tsx
import { Auth, signInWithEmailAndPassword } from "firebase/auth";
import { useState, FormEvent } from "react";
import { useNavigate } from 'react-router-dom';
import { auth, db} from "../../firebase";
import { FirebaseError } from "firebase/app";
import { doc, setDoc } from 'firebase/firestore';

const SignIn = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const signIn = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const userCredential = await signInWithEmailAndPassword(auth as Auth, email, password);
            console.log("SignIn Success: ", userCredential);
            
            if (userCredential.user) {
                await setDoc(doc(db, "users", userCredential.user.uid), {
                    lastSignIn: new Date().toISOString(),
                }, { merge: true });
            }

            navigate(`/`);
        } catch (error: unknown) {
            console.error("SignIn Error: ", error);

            if (error instanceof FirebaseError) {
                if (error.code === "auth/wrong-password" || error.code === "auth/user-not-found") {
                    setError("You have entered the wrong email or password.");
                } else {
                    setError("An error occurred while signing in. Please try again later.");
                }
            }
        }
    };


    return (
        <div className="sign-in-container">
            <form onSubmit={signIn}>
                <h1 style={{ marginBottom: 10 }}>Log In to your Account</h1>
                {error && <h1 style={{ color: "red" }}>{error}</h1>}
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Log In</button>
            </form>
        </div>
    );
};

export default SignIn;
