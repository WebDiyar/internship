import { signInWithEmailAndPassword, Auth } from "firebase/auth";
import { useState, FormEvent } from "react";
import { auth } from "../../firebase";
import AuthDetails from "../AuthDetails";

const SignIn = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [signInSuccess, setSignInSuccess] = useState<boolean>(false);

    const signIn = (e: FormEvent) => {
        e.preventDefault();
        console.log("Attempting to sign in with:", email, password);

        signInWithEmailAndPassword(auth as Auth, email, password)
            .then((result) => {
                console.log("SignIn Success:", result);
                setSignInSuccess(true);
            })
            .catch((error) => {
                console.error("SignIn Error:", error);
                if (error.code === "auth/wrong-password" || error.code === "auth/user-not-found") {
                    setError("You have entered the wrong email or password.");
                } else {
                    setError("An error occurred while signing in. Please try again later.");
                }
            });
    };

    return (
        <div className="sign-in-container">
            {!signInSuccess ? (
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
            ) : (<AuthDetails/>)}
        </div>
    );
};

export default SignIn;
